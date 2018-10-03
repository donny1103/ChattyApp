import React from 'react';
import generateRandomId from "./ranId.js";
class ChatBar extends React.Component{
  constructor(props) {
    super(props);
    //set initial state
    this.state = {username:"Anonymous"};
  }
  render(){
    // listening to the event in username input box
    const _handleUserName = (e) =>{

      e.target.value ? (
        this.setState({username:e.target.value})
      ) : (
        this.setState({username:"Anonymous"})
      );
    }
    // listening to the event in message input box
    const _handleNewMessage = (e) => {
      if(e.key == 'Enter'){
        const newMessage = {
          username: this.state.username, 
          content: e.target.value
        };
        this.props.sendToServer(newMessage);

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