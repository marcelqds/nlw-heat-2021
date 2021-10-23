import { json, Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

class CreateMessageController{
    async handle(request: Request, response: Response){
        const { text, user_id } = request.body;

        const service = new CreateMessageService();
        const result = await service.execute(text,user_id);

        
        return response.json(result);
    }
}

export { CreateMessageController}