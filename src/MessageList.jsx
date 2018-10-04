import React from 'react';
import Message from './Message.jsx'
const MessageList = props => {

  return(
    <main className="messages">
      {
        props.messages.map((message) => (
        <Message key={message.id} username={message.username} content={message.content} messageType={message.type} usernameColor = {props.usernameColor}/>))
      }
    </main>    
  );
}

export default MessageList;