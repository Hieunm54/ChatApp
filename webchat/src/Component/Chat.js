import React, { useState } from 'react'
import '../public/Chat.css'
import { Avatar, IconButton } from '@material-ui/core';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../axios'

const Chat = ({messages}) => {

    const [newMessage,setNewMessage] = useState('');

    const newMessageOnChangeHandler = (event) =>{
        console.log('nd tin nhan: ',event.target.value);
        setNewMessage(event.target.value);
        
    }

    const sendMessageOnclick = (event) => {
        event.preventDefault();
        console.log('clicked!!!');
        //gui len server
        axios.post('/messages/new',{
            message : newMessage,
            name: 'NMH',
            timestamp :'just now :((',
            received : false
        });
        
        setNewMessage('')
    }

   

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src="https://www.iconspng.com/images/happy-penguin-avatar/happy-penguin-avatar.jpg" />
                <div className="chat_header_info">
                    <h2>Room name</h2>
                    <p>last active</p>
                </div>

                <div className="chat_header_icons">
                    <IconButton>
                        <SearchSharpIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileSharpIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertSharpIcon />
                    </IconButton>
                </div>
            </div>
            {/* chat body */}


             <div className="chat_body">
            
               {messages.map((message) => {

                    return <p className={`chat_message ${!message.received && "chat_receiver"}` }>
                                <span className="chat_name">{message.name}</span>
                                {message.message}
                                <span className="chat_time">{message.timestamp}</span>
                            </p>
                })}

                {/* <p className="chat_message">
                    <span className="chat_name">NMH</span>
                        i donno know how it work?
                    <span className="chat_time">{new Date().toUTCString()}</span>
                </p>

                <p className="chat_message chat_receiver">
                    <span className="chat_name">PTL</span>
                        try again
                    <span className="chat_time">{new Date().toUTCString()}</span>
                </p> */}
            </div>

            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form >
                    <input value={newMessage} onChange={newMessageOnChangeHandler} placeholder='Type a message' type="text" />
                    <button type="submit" onClick={sendMessageOnclick}>
                        <IconButton>
                            <SendIcon />
                        </IconButton>
                    </button>

                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>

            </div>
        </div>
    )
}

export default Chat;