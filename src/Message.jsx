import React from 'react'
//test image url
// https://img.hi5messages.com/en/funny/47.jpg
const Message = props => {

  //generate xml for rendering url
  let renderImage;
  if(props.imgurls.length !== 0){
     renderImage = props.imgurls.map((url,i) => (
      <div className="image-content" key={i}>
        <img className="message-image" src={url}/>
      </div>
    ));
  }

  const chatMessage = (    
  <div className="message">
    <span className="message-username" style={{color:props.usernameColor}}>{props.username}</span>
    <span className="message-content">{props.content}{renderImage}</span>
    
  </div>);

  const notificationMessage = ( 
    <div className="message system">{props.content}</div>
  );

  if (props.messageType === "incomingMessage"){
    return chatMessage;
  }
  else if (props.messageType === "incomingNotification"){
    return notificationMessage;
  }
}

export default Message;