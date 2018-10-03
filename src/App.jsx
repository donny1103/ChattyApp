import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages:[]
    };

  }

  //send message to server
  sendToServer = (message) => {
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = this.handleServerMessage;
  }

  //handle message from server
  handleServerMessage = (e) => {
    
    const data = JSON.parse(e.data);
    switch(data.type){
      case "incomingMessage":
        const newMessages = this.state.messages.concat(data);
        this.setState({messages: newMessages});
      break;
    }

  }

  render() {
    return(
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar sendToServer={this.sendToServer}/>
      </div>
    )  
  }
}
export default App;
