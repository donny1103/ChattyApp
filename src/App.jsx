import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import Data from "./Data.json";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages:[]
    };
    this.sendToServer = this.sendToServer.bind(this);
  }

  //send message to server
  sendToServer(message){
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = this.handleServerMessage.bind(this);
  }

  //handle message from server
  handleServerMessage = (e) => {
    const newMessages = this.state.messages.concat(JSON.parse(e.data));
    //const oldMessage = this.state.messages;
    this.setState({messages: newMessages});

  }

  render() {
    const messages = this.state.messages.map(message=>(
      <MessageList key = {message.id}username = {message.username} content = {message.content}/>))
    return(
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        {messages}
        <ChatBar sendToServer = {this.sendToServer}/>
      </div>
    )  
  }
}
export default App;
