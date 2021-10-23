import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { api } from '../../services/api';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import styles from './index.module.scss';

export function SendMessageForm(){
    const { user, signOut } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    async function handleSendMessage(e:FormEvent){
        e.preventDefault();
        
        if(!message.trim()) return;
        const token = localStorage.getItem('@dowhile:token');

        const result = await api.post('messages',
            { text : message},
            { headers:{ authorization: `Bearer ${token}`}}
        );
        setMessage('');
    }

    return(
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size={32} />
            </button >

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size={16} />
                    {user?.login}
                </span>
            </header>

            <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                    onChange={event => setMessage(event.target.value)}
                    value={message}
                    name="message"
                    id="message"
                    placeholder="Qual sua expectativa para o evento?"
                />
                <button type="submit">Envie sua mensagem</button>
            </form>
        </div>
    )
}