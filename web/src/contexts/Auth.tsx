import React, {createContext, useState, ReactNode, useEffect } from 'react';
import { api } from '../services/api';

type IUser = {
    avatar_url : string;
    gihub_id : number,
    id: string,
    login: string;
    name: string;
}

type AuthResponse = {
    token : string,
    user:IUser
}

type AuthContextData = {
    user: IUser | null;
    signInUrl: string;
    signOut : () => void;
}

type IAuthProvider = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}:IAuthProvider){
    
    const CLIENT_ID = "f00de4f05ba071b94fec";
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}`;
    
    const [user, setUser] = useState<IUser|null>(null);

    useEffect(()=>{
        const token = localStorage.getItem("@dowhile:token");
        if(token && !user){            
            // api.defaults.headers.common.authoriztion = `Bearer ${token}`;
            api.get<IUser>('profile',{
                headers:{
                    authorization : `Bearer ${token}`
                }
            }).then(res => {
                setUser(res.data);
                console.log(res.data);
            }).catch(e =>{
                console.log(e);
            });
        }
    },[]);

    useEffect(() =>{
        const url= window.location.href;
        const hasGithubCode = url.includes('?code=');
        if(hasGithubCode){
            const [urlWithoutCode, githubCode ] = url.split("?code=");            
            window.history.pushState({}, '',urlWithoutCode);
            signIn(githubCode);
        }

    },[]);

    async function signIn(githubCode:string){
        const { data } = await api.post<AuthResponse>('authenticate',{
            code: githubCode,
        });

        const { token, user:infoUser} = data;
        localStorage.setItem('@dowhile:token',token);
        setUser(infoUser);
    }
    
    function signOut() {
        setUser(null);
        localStorage.removeItem('@dowhile:token');
    }

    return(
        <AuthContext.Provider value={{signInUrl,user, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}


///#BuildTheFuture