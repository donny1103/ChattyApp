import React from 'react';
import generateRandomId from "./ranId.js";
class ChatBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {username:"Anonymous"};
  }
  render(){

    const _handleUserName = (e) =>{
      if(!e.target.value){
        this.state.username = e.target.value;
      }
    }

    const _handleNewMessage = (e) => {
      if(e.key == 'Enter'){
        const newMessage = {
          id: generateRandomId(), 
          username: this.state.username, 
          content: e.target.value
        };
        this.props.addNewMessage(newMessage);

        e.target.value = "";
      }
    }
  
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onChange = {_handleUserName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={_handleNewMessage}/>
      </footer>
    )

  }
}

export default ChatBar