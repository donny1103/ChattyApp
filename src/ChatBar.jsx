import React from 'react';

class ChatBar extends React.Component{
  constructor(props) {
    super(props);
    //set initial state
    this.state = {
      username:"Anonymous",
      content:""
    };
  }
  render(){
 
    const onUserNameChange = key => e =>{
      e.target.value ? (
        this.setState({[key]:e.target.value})
      ) : (
        this.setState({[key]:"Anonymous"})
      );
    }

    const onMessageChange = key => e  =>{
        this.setState({[key]:e.target.value})
    }

    const onKeyPress = key => e => {
      if(e.key === 'Enter'){
        this.props.handleChatBarChange(this.state,key)  

        if(key === "content"){
          e.target.value = "";
        }   
      }
    }

    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onChange = {onUserNameChange('username')} onKeyPress={onKeyPress('username')}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange = {onMessageChange('content')} onKeyPress={onKeyPress('content')}/>
      </footer>
    )
  }
}

export default ChatBar