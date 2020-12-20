import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Component/Chat';
import Sidebar from './Component/Sidebar';
import Pusher from 'pusher-js';
import axios from './axios'

function App() {
  const [messages,setMessages] = useState([]);

  useEffect(()=>{
    axios
    .get('/messages/sync')
    .then(response =>{
      setMessages(response.data)
    })
  },[]);
 


  useEffect(()=>{
    const pusher = new Pusher('941c47133c2971888d1b', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      //console.log('ua ko chay ha????')
      //alert(JSON.stringify(data));
      //add new message to messages
      //const newMessages = messages;
      //setMessages([...messages,data]);
      setMessages(messages.concat(data));
    });
    //chu y
    return () =>{
      channel.unbind_all();
      channel.unsubscribe();
    }

  },[messages]);

  console.log('all messages are: ',messages);


  return (
    <div className="app">
     
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>

    </div>
  );
}

export default App;
