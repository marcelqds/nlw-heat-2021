import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import * as AuthSessions from 'expo-auth-session';
import { api } from '../services/api';

const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type User = {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}
type AuthContextData ={
    user: User | null;
    isSigningIng : boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: React.ReactNode
}

type AuthResponse = {
    token : string;
    user : User;
}

type AuthorizationResponse = {
    params: {
        code?: string;
        error?: string;
    },
    type?: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}:AuthProviderProps){
    
    const [isSigningIng, setIsSigningIng] = useState(true);    
    const [user, setUser] = useState<User | null>(null);
    //const GITHUB_SECRET=2617468be525bc196210c33968ca789297124294
    const GITHUB_CLIENT="c8a53af7a006f98e5268";
    const SCOPE='read:user';    

    async function signIn(){
        setIsSigningIng(true);
        try{           
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT}&scope=${SCOPE}`
            const AuthSessionResponse  = await AuthSessions.startAsync({authUrl}) as AuthorizationResponse;
            
            if(!(AuthSessionResponse.type === 'success' && AuthSessionResponse.params.error !== 'access_denied'))return setIsSigningIng(false);

            const authResponse = await api.post('/authenticate',{
                code : AuthSessionResponse.params.code
            });

            const { user , token } = authResponse.data as AuthResponse;            
        
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await AsyncStorage.setItem(USER_STORAGE,JSON.stringify(user));
            await AsyncStorage.setItem(TOKEN_STORAGE,JSON.stringify(token));
            setUser(user);
                         
        }catch(e){
            console.log(e);
        }finally{
            setIsSigningIng(false);
        }

        
    }
    async function signOps(){}

    async function signOut(){
        try{
            setUser(null);
            await AsyncStorage.removeItem(USER_STORAGE);
            await AsyncStorage.removeItem(TOKEN_STORAGE);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        async function loadUserStorageData(){
            const userStorage = await AsyncStorage.getItem(USER_STORAGE);
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);
            if(userStorage && tokenStorage){
                setUser(JSON.parse(userStorage));
                api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(tokenStorage)}`;
            }
            setIsSigningIng(false);
        }
        loadUserStorageData();
    },[]);

    return(
        <AuthContext.Provider value={{
            isSigningIng,
            signIn,
            signOut,
            user            
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }

// type AuthorizationResponse = {

//   params: {

//     code?: string;

//   };

// };


// async function signOut() {}
