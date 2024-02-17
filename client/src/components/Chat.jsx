
import { RiSendPlane2Fill } from "react-icons/ri";
import {useEffect, useState} from 'react'
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";
function Chat({username, room, socket}) {
  const [currentMessage,setCurrentMessage]= useState('');
  const [messageList, setMessageList] = useState([])

  const sendMessage =async ()=>{
    if(currentMessage !==''){
      const messageData={
        author:username,
        room:room,
        message: currentMessage,
        time: new Date().getHours() + ":" + new Date().getMinutes()
      };
      
      await socket.emit("send_message", messageData);
      setMessageList((list)=>[...list, messageData])
      setCurrentMessage("")
    }
  }
  useEffect(()=>{
    socket.on("receive-message",(messageData)=>{
      setMessageList((list)=>[...list, messageData])
    });
    return () => {
      socket.off("receive-message");
  }; 
  },[socket])
  
  return (
    <div className='chat-window'>
      <div className='chat-header'><p>{room}</p></div>
      <div className='chat-body'>
      <ScrollToBottom className="message-container">
        {messageList.map((msg)=><Message messageContent={msg} username={username}/>)}
      
      </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input type="text" placeholder='Type a message' onChange={(event)=>setCurrentMessage(event.target.value)} value={currentMessage} onKeyPress={(event)=>{event.key==="Enter" && sendMessage()}}/>
        <button onClick={sendMessage}><RiSendPlane2Fill /></button>
      </div>

    </div>
  )
}

export default Chat