import React, {Component} from 'react';

const MessageList = props =>{
  return(
    <main className="messages">
      <div className="message">
        <span className="message-username">{props.username}</span>
        <span className="message-content">{props.content}</span>
      </div>
      <div className="message system">
        
      </div>
    </main>    
  );
}
export default MessageList;