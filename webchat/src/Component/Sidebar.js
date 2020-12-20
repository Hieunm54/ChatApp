import React from 'react'
import '../public/Sidebar.css'
//import icon
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import { SearchOutlined } from '@material-ui/icons'
import { Avatar, IconButton } from '@material-ui/core'
//import another component: sidebarChat
import SidebarChat from './SidebarChat'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src="https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-9/66836740_2516214978607777_3677707305027108864_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=pffpCSk22cMAX9U9Viv&_nc_oc=AQnRU0C_HUGPcoK_JAbM2MVtXghJW89AJpiyKZR62QV0R0Q63Rx2mHdCykN5m69LFvo&_nc_ht=scontent.fhan2-2.fna&oh=b42b1e6400fe53880e31c8f01d80c6b2&oe=5FF3D01B" />
                <div className="header_right">
                    <IconButton>
                        <CachedOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <CommentOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlinedIcon />
                    </IconButton>
                </div>
            </div>
            <div className="search">
                <div className="search_bar">
                    <SearchOutlined />
                    <input placeholder="search for a friend" type="text" />
                </div>
            </div>
            <div>
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>


        </div>
    )
}

export default Sidebar;