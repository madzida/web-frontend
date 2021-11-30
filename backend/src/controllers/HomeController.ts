import Controller from "../Controller";
import { Methods } from "../Controller";
import { Request, Response, NextFunction} from "express"
import { User, UserType } from "../models/User";
import { getConnection } from "typeorm";
import { Station } from "../models/Station";
import { TrainRoute } from "../models/TrainRoute";
import { withAuth } from "../middleware/auth";

export class HomeController extends Controller {
    path = "/"
    routes = [{
            path: '/stations',
            method: Methods.POST,
            handler: this.handleGetStationRoutesHome,
            localMiddleware: [withAuth]
        },
        {
            path: '/',
            method: Methods.POST,
            handler: this.handleGetHome,
            localMiddleware: [withAuth]
        },
        {
            path: '/users',
            method: Methods.POST,
            handler: this.handleGetUsers,
            localMiddleware: [withAuth]
        },
        {
            path: '/checktoken',
            method: Methods.POST,
            handler: this.handleGetToken,
            localMiddleware: [withAuth]
        }
    ];

    constructor() {
        super();
    };

    handleGetToken(req: Request, res: Response, next: NextFunction){
        res.sendStatus(200);
    }

    async handleGetStationRoutesHome(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {token, station} = req.body;
        let trainRouteRep = getConnection().getRepository(TrainRoute)
        let dateNow = new Date();
        trainRouteRep.find().then((trainRoutes) => {
            trainRoutes.filter(route => station in route.stations && route.departureTime < dateNow);
            res.json({
                routes: trainRoutes
            })
        }).catch((err) => {
            res.status(401).send({
                err: "Neuspješan dohvat ruta"
            })
        })
    };

    async handleGetHome(req: Request, res: Response, next: NextFunction): Promise<void> {
        let stationRep = getConnection().getRepository(Station);
        let userRep = getConnection().getRepository(User);
        let role: UserType | undefined;
        await userRep.findOne({email: res.locals.email}).then(user => {
            role = user?.role
        }).catch(err => {
            role = undefined
        })
        if(role !== undefined){
            stationRep.find().then((stations) => {
                res.json({
                    stations: stations,
                    role: role
                });
            }).catch((err) => {
                res.status(401).send({
                    err: "Neuspješan dohvat iz baze."
                });
            })
        } else {
            res.status(401).send({
                err: "Neuspješan dohvat korisnika."
            });
        }
    };

    async handleGetUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    
        let userRep = await getConnection().getRepository(User)
        await userRep.findOne({email: res.locals.email}).then(user => {
            if(user?.role !== UserType.admin){
                res.status(401).send({
                    err: "Korisnik nije administrator"
                })
            } else {
                userRep.find().then((users) => {
                    users=users.filter(user => user.role == UserType.user);
                    users.map(user => user.password = "");
                    res.json({
                        users: users
                    })
                }).catch((err) => {
                    res.status(500).send({
                        err: "Neuspješan dohvat korisnika"
                    })
                })
            }
        }).catch((err)=>{
            res.status(401).send({
                err: "Korisnik ne postoji"
            })
        })
    
    };
}