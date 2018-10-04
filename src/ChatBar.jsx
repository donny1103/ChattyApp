import React from 'react';

class ChatBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      content:""
    };
  }
  render(){
 
    const onChange = key => e =>{
        this.setState({[key]:e.target.value})
    }

    const onKeyPress = key => e => {
      if(e.key === 'Enter'){
        this.setState({key:e.target.value})
        this.props.handleChatBar(this.state[key],key)  
        if(key === "content"){
          e.target.value = "";
        }   
      }
    }
  
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onChange = {onChange('username')} onKeyPress={onKeyPress('username')} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange = {onChange('content')} onKeyPress={onKeyPress('content')}/>
      </footer>
    )
  }
}

export default ChatBar