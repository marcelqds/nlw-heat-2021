import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import io from 'socket.io-client';

interface IResultListMessage{
    any:String[];
}

type Message ={
    id: string;
    text: string;
    user:{
        name: string;
        avatar_url: string;
    }    
}

const messagesQueue: Message[] = [];

const socket = io('http://localhost:3001');
socket.on('new_message',(newMessage : Message) =>{
    messagesQueue.push(newMessage);
});

export function MessageList(){
    
    const [listMessages, setListMessages] = useState<Message[]>([]);    
    useEffect(() => {
        async function loadLastMessages() {
            const {data} = await api.get<Message[]>('/last-messages');
            setListMessages(data);            
        }
            loadLastMessages();
            
    },[]);

    useEffect(()=>{
        const timer = setInterval(() =>{             
            if(!(messagesQueue.length > 0))return;            
            // function newListValue(oldListMessage:Message[]|[]){
            //     let messageQueue = messagesQueue.shift() as Message;
            //     console.log(messageQueue);                
            //     oldListMessage.pop();
            //     return([
            //         messageQueue,
            //         ...oldListMessage
            //         ]
            //     );
            // }
            // setListMessages(newListValue);

            setListMessages(newListValue =>[
                messagesQueue[0],
                newListValue[0],
                newListValue[1]
            ].filter(Boolean));
            messagesQueue.shift();
                        
        },3000);
    },[]);

    
    return(
        <div className={styles.messageListWrapper}>
            <img src={logo} alt="DoWhile 2021" />
            <ul className={styles.messageList}>
                {listMessages.map(message =>(
                    <li key={message.id} className={styles.message}>
                        <p className={styles.messageContent}>
                            {message.text}
                        </p>
                        <div className={styles.messageUser}>
                            <div className={styles.userImage}>
                                <img src={message.user.avatar_url} alt={message.user.name} />
                            </div>
                            <span>{message.user.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}