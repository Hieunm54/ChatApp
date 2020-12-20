import React from 'react'
import { Avatar } from '@material-ui/core';
import '../public/SidebarChat.css';

const SidebarChat = () => {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_room">
                <h2>Room</h2>
                <p>alooo</p>
            </div>

        </div>
    )

}

export default SidebarChat;