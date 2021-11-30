import Controller from "../Controller";
import { Methods } from "../Controller";
import { Request, Response, NextFunction} from "express"
import { User, UserType } from "../models/User";
import { getConnection } from "typeorm";
import { Station } from "../models/Station";
import { TrainRoute } from "../models/TrainRoute";
import { withAuth } from "../middleware/auth";

export class AdminController extends Controller {
    path = "/admin"
    routes = [{
            path: '/delete',
            method: Methods.POST,
            handler: this.handleDeleteUser,
            localMiddleware: [withAuth]
        }
    ];

    constructor() {
        super();
    };

    handleGetToken(req: Request, res: Response, next: NextFunction){
        res.sendStatus(200);
    }

    async handleDeleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {token, email} = req.body;
        let userRep = getConnection().getRepository(User);
        let role: UserType | undefined;
        await userRep.findOne({email: res.locals.email}).then(user => {
            role = user?.role
        }).catch(err => {
            role = undefined
        })
        if(role == UserType.admin){
            await userRep.delete({email: email}).then(result => {
                if(result.affected!>0){
                    res.sendStatus(200);
                } else {
                    res.status(500).json({
                        err: "Brisanje neuspješno"
                    })
                }
            }).catch(err=>{
                res.status(500).json({
                    err: "Brisanje neuspješno"
                })
            });
        } else {
            res.status(401).json({
                err: "Korisnik nije administrator"
            })
        }
    }
}