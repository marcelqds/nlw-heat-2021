import prismaClient from "../prisma";

class GetLastMessagesService{
    async execute(amount:number){
        //take limite que irá trazer de messagens
        const messages = await prismaClient.message.findMany({
            take: amount, //default = 3
            orderBy:{
                created_at: "desc",
            },
            include:{
                user: true,
            },
        });
        return messages;
    }
}

export { GetLastMessagesService };