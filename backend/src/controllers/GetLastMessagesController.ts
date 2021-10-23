import { Request , Response } from 'express';
import { GetLastMessagesService } from '../services/GetLastMessagesService';

class GetLastMessagesController{
    async handle(request: Request, response: Response){        

        let tmpAmount:string = (request.query.amount) as string;
        let amount = parseInt(tmpAmount);

        if(amount > 0){
            let limitMessage = 15;        
            amount = amount < limitMessage ? amount : limitMessage; 
        }else{
            amount = 3;
        }

        const service = new GetLastMessagesService();
        const result = await service.execute(amount);        
        return response.json(result);
    }
}

export { GetLastMessagesController }