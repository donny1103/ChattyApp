import React from 'react';
import Message from './Message.jsx'
const MessageList = props => {
  return(
    <main className="messages">
      {
        props.messages.map((message) => (
        <Message key={message.id} username={message.username} content={message.content}/>))
      }
    </main>    
  );
}

export default MessageList;