/**
 * Receber code(string)
 * Recuperar o access_token no github
 * Verificar se o usuário existe no DB
 * ---- SIM = gera um token
 * ---- NÃO = criar no DB, gera um token
 * Return o token com as infos do user
 */

// import { prisma } from ".prisma/client";
import axios from "axios";
import prismaClient from '../prisma';
import { sign } from 'jsonwebtoken';
interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponser{
    avatar_url : string,
    login: string,
    id: number,
    name: string,
}

class AuthenticateUserService{
    async execute(code: string){
        const url="https://github.com/login/oauth/access_token";

        const {data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null,{
            params:{
                client_id: process.env.GITHUB_CLIENT,
                client_secret: process.env.GITHUB_SECRET,
                code,
            },
            headers:{
                "Accept": "application/json"
            }
        });

        console.log(accessTokenResponse);

        const {data: userData} = await axios.get<IUserResponser>('https://api.github.com/user',{
            headers:{
                authorization: `Bearer ${accessTokenResponse.access_token}`,
            }
        })
        
        const { login, id, avatar_url, name } = userData
        let user = await prismaClient.user.findFirst({
            where: {
                gihub_id: id
            }
        });

        if(!user){
           user = await prismaClient.user.create({
                data:{
                    gihub_id: id,
                    login,
                    name,
                    avatar_url
                }
            })
        }

        const token = sign(
        {
            user:{
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id
            } 
            },
            process.env.JWT_TOKEN,
            {subject: user.id, expiresIn: "5d"}
        )


        return {token, user: user};
    }
}

export { AuthenticateUserService }