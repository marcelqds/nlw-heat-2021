import React, {useEffect, useState} from 'react';
import { ScrollView, View, Text} from 'react-native';
import { Message, MessageProps } from '../Message';
import { styles } from './styles';
import { io } from 'socket.io-client';

// import { MESSAGES_EXAMPLE } from '../../utils/messages';
import { api } from '../../services/api';
import { set } from 'react-native-reanimated';

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage) =>{
    messagesQueue.push(newMessage);    
});

export function MessageList(){
    const [currentMessage, setCurrentMessage] = useState<MessageProps[]>([]);
    
    useEffect(()=>{
        async function fetchMessages(){
            const {data:messagesResponse} = await api.get<MessageProps[]>('/last-messages?amount=3');
            setCurrentMessage(messagesResponse);
        }
        fetchMessages();
    },[]);

    useEffect(() => {
        let timer = setInterval(()=>{
            if(!(messagesQueue.length > 0))return;
            setCurrentMessage(prevState => {
                const firstMessage = messagesQueue.shift() as MessageProps;
                prevState.pop();
                return [firstMessage,...prevState]
            });            
        },3000);
        return () => clearInterval(timer);
    },[])
    
    return(
        <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="never"
        >
            {currentMessage.map( (message, index) =>
                <Message key={index} data={message}/>
             )}
            
        </ScrollView>
    )
}
