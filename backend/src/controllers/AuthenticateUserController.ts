import { json, Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController{
    async handle(request: Request, response: Response){
        const { code } = request.body;
        
        console.log(code);

        const service = new AuthenticateUserService();
        try{
            const result = await service.execute(code );
            return response.json(result);
        }catch(e){
            return response.json({error: true, message: e.message});
        }
        

        
    }
}

export { AuthenticateUserController}