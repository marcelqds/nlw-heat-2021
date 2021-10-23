import React, { useState } from 'react';
import { View, Text, TextInput,Alert } from 'react-native';
import { Button } from '../Button';
import { COLORS } from '../../theme';
import { styles } from './styles';

import { api } from '../../services/api';


export function SendMessageForm(){
    const [message, setMessage] = useState('');
    const [sendingMessege, setSendingMessage] = useState(false);
    
    async function handleMessageSubmit(){
        const messageFormatted = message.trim();

        if(!(messageFormatted.length > 0))return Alert.alert('Escreva a mensagem para enviar.');
        
        try{
            setSendingMessage(true);
            await api.post('messages',{text : messageFormatted});
            setMessage('');
            Alert.alert("Mensagem enviada com sucesso!");
        }catch(e){
            console.log(e);            
        }finally{
            setSendingMessage(false);
        }
        


    }

    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                keyboardAppearance="dark"
                placeholder="Qual a sua expectativa para o evento"
                placeholderTextColor={COLORS.GRAY_PRIMARY}
                maxLength={140}
                multiline
                editable={!sendingMessege}
                onChangeText={setMessage}
                value={message}
            />
            
            <Button 
                title="ENVIAR MENSAGEM"
                backgroundColor={COLORS.PINK}
                color={COLORS.WHITE}
                isLoading={sendingMessege}
                onPress={handleMessageSubmit}
            />

        </View>
    )
}