import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import Data from "./Data.json";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true,...Data};
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(message){
    const newMessages = this.state.messages.concat(message);
    this.setState({messages: newMessages});
  }

  componentDidMount() {
    setTimeout(() => {
      
    }, 3000);
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
        <ChatBar addNewMessage = {this.addNewMessage}/>
      </div>
    )  
  }
}
export default App;
