import React from 'react'

const Message = props => {
  const chatMessage = (    
  <div className="message">
    <span className="message-username" style={{color:props.usernameColor}}>{props.username}</span>
    <span className="message-content">{props.content}</span>
  </div>);

  const notificationMessage = ( 
    <div className="message system">{props.content}.</div>
  );
  const imageURL = ( 
    <div><img src={props.content}/></div>
  );

  if (props.messageType === "incomingMessage"){

    return chatMessage

  }else if (props.messageType === "incomingNotification"){

    return notificationMessage

  }else if(props.messageType === "incomingImage"){

    return imageURL
    
  }
}

export default Message;