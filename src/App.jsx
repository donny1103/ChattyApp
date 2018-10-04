import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages:[],
      count: 0
    };
  }
 
  handleChatBarChange = (chatBarState,key) => {
    let message;
    switch (key){
      case "username":
        message = {
          type: "postNotification",
          username: chatBarState[key], 
          content: `${this.state.currentUser.name} has changed their name to ${chatBarState[key]}`
        }
      break;
      case "content":
        message = {
          type: "postMessage",
          username: chatBarState.username, 
          content: chatBarState[key]
        };
        this.setState({currentUser: {name: chatBarState.username}})      
      break;
      default:throw new Error("Unknown event type " + key);
    }
    this.socket.send(JSON.stringify(message));
  }
  
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    // this.socket.onmessage = e => {
    //   console.log(e)
    // }
    this.socket.onmessage = this.handleServerMessage;
  }

  //handle message from server
  handleServerMessage = (e) => {
    const data = JSON.parse(e.data);
    console.log(data)
    const newMessages = this.state.messages.concat(data);

    switch (data.type){
      case "incomingMessage":
        this.setState({messages: newMessages}); 
      break;
      case "incomingNotification":
        this.setState({
          currentUser: {name: data.username},
          messages: newMessages
        });
      break;
      case "counter":
       this.setState({count: data.content}); 
      break;
      default:
      // show an error in the console if the message type is unknown
      throw new Error("Unknown event type " + data.type);
    }

  }

  render() {
    return(
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="usercount">{this.state.count} users online</div>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar handleChatBarChange={this.handleChatBarChange}/>
      </div>
    )  
  }
}
export default App;
