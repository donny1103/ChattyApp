import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous",color: ""},
      messages:[],
      count: 0
    };
  }
 
  handleChatBar = (data,key) => {
    let dataToServer;
    switch (key){
      case "username":
        dataToServer = {
          type: "postNotification",
          username: data, 
          content: `${this.state.currentUser.name} has changed their name to ${data}`,
        }
      break;
      case "content":
        dataToServer = {
          type: "postMessage",
          username: this.state.currentUser.name, 
          content: data,
          color: this.state.currentUser.color
        };
        //this.setState({currentUser: {name: chatBarState.username}})      
      break;
      default:throw new Error("Unknown event type " + key);
    }
    this.socket.send(JSON.stringify(dataToServer));
  }
  
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    // this.socket.onmessage = e => {
    //   console.log(e)
    // }
    this.socket.onmessage = this.handleServer;
  }

  
  //handle message from server
  handleServer = (e) => {
    const data = JSON.parse(e.data);
    const newMessages = this.state.messages.concat(data);
    const curUser = {...this.state.currentUser};
    switch (data.type){
      case "incomingMessage":
        this.setState({
          currentUser: curUser,
          messages: newMessages}); 
      break;

      case "incomingNotification":
        curUser.name = data.username;

        this.setState({
          currentUser: curUser,
          messages: newMessages
        });
      break;

      case "counter":
       this.setState({count: data.content}); 
      break;

      case "assignColor":
      curUser.color = data.color
        this.setState({currentUser: curUser});
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
          <a href="/" className="navbar-brand" >Chatty</a>
          <div className="usercount">{this.state.count} users online</div>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar handleChatBar={this.handleChatBar} />
      </div>
    )  
  }
}
export default App;
