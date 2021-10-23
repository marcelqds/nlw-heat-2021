import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

interface IPayload{
    sub : string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization;
        
    if(!authToken){
        return response.status(404).json({
            errorCode: "token.invalid",
        });        
    }

    try{
        const [, token] = authToken.split(" ");   
        const { sub } = verify(token, process.env.JWT_TOKEN) as IPayload;    
        // console.log(sub);
        
        request.body.user_id = sub;
        return next();
        
    }catch(e){
        return response.status(401).json({erroCode: "token.expired"});
    }
}