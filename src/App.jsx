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
  
  //complie data from chatbar and send to server
  handleChatBar = (data,key) => {
    let dataToServer;
    let [text,imgurls] = dataComplier(data);
    let oldState = {...this.state};
    switch (key){
      case "username":
        dataToServer = {
          type: "postNotification",
          username: data,
          imgurls: imgurls,
          content: `${this.state.currentUser.name} has changed their name to ${data}`,
        }
        if(this.state.currentUser.name !== data){
          this.socket.send(JSON.stringify(dataToServer));
        }
        this.setState({
          currentUser: {name: data,color: oldState.currentUser.color},
          messages:oldState.messages,
          count: oldState.count
        })
      break;
      case "content":
        dataToServer = {
          type: "postMessage",
          username: this.state.currentUser.name, 
          content: text,
          imgurls: imgurls,
          color: this.state.currentUser.color
        };
        this.socket.send(JSON.stringify(dataToServer));    
      break;
      default:throw new Error("Unknown event type " + key);
    }


    //seperate text content and image url content
    function dataComplier(data){
      let arr = data.split(" ");
      let imgURLs = arr.filter(index => checkURL(index));
      let textarr = arr.filter(index => !checkURL(index));
      let text = textarr.join(" ");
      return [text,imgURLs]
    }

    //check url
    function checkURL(url) {
      let myRegex = /(https?:\/\/.*\.(?:jpeg|jpg|gif|png))/i;
      return(myRegex.test(url));
    }
  }
  
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

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
  
      default: throw new Error("Unknown event type " + data.type);
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
