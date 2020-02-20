import React from 'react'
import MessageList from './components/messagelList'
import Loader from './components/loader'
import ChatList from './components/chatList'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import CreateChat from './components/createChat'
import LoginForm from './components/loginForm'
import TextField from './components/textField.js'
import{tokenURL, instanceLocator}from './config'
var roomId='a73200ff-8d1a-40fd-a637-b41143761a8b'
function scrollToBottom() {
  var objDiv = document.getElementsByClassName('messageList');
  objDiv.scrollTop = objDiv.scrollHeight;
}

class App extends React.Component{
 constructor(){
   super()
   this.state={
     messages:[],
     user:{},
     roomAndUser:{
       roomId: roomId,
       user: 'Gagan'
     },
     loggedIn: false
   }

   this.sendMessage = this.sendMessage.bind(this)
   this.login = this.login.bind(this)
   this.changeRoom = this.changeRoom.bind(this)
 }
 componentDidMount(){
   this.state.loggedIn&&this.login(this.state.roomAndUser.user)
 }
  login(x){
    this.setState(()=>({loggedIn:true}))
    this.setState(()=>({roomAndUser:{roomId:this.state.roomAndUser.roomId,
    user:x}}))
  const chatManager = new ChatManager({
    instanceLocator: instanceLocator,
    userId: x,
    tokenProvider: new TokenProvider({ url: tokenURL })
  })
  chatManager.connect()
  .then(currentUser => {
    this.setState(()=>({user: currentUser}))

    this.currentUser = currentUser
    currentUser.joinRoom({ 
    roomId: this.state.roomAndUser.roomId })
  .then(room => {
  })
   currentUser.subscribeToRoomMultipart({
    roomId: this.state.roomAndUser.roomId,
    
    hooks: {
      onMessage: message => {
        this.setState({
          messages: [...this.state.messages, message]
      })
      }
    },
    messageLimit: 10
  })
  })
  console.log(this.state)
  }
 sendMessage(text) {
  this.currentUser.sendMessage({
      text,
      roomId: this.state.roomAndUser.roomId
  })
}
changeRoom(id){
  this.setState(()=>({roomAndUser:
    {user: this.state.roomAndUser.user,
      roomId: id
  }}))
  this.setState({
    messages: []
})
  

    this.state.user.joinRoom({ 
    roomId: this.state.roomAndUser.roomId })
  .then(room => {
    
   this.state.user.subscribeToRoomMultipart({
    roomId: this.state.roomAndUser.roomId,
    
    hooks: {
      onMessage: message => {
        this.setState({
          messages: [...this.state.messages, message]
      })
      }
    },
    messageLimit: 10
  })
  })
  setTimeout(scrollToBottom,3000)
}
  render(){//console.log(this.state.user.id)
   
  var objDiv = document.getElementsByClassName("messageList");
  objDiv.scrollTop = 1000;
    return(
    <div className='app'>
      <ChatList changeRoom={this.changeRoom} loggedIn={this.state.loggedIn} current={this.state.roomAndUser.roomId} user={this.state.user}/>
      {this.state.loggedIn?<MessageList  userId={this.state.user.id} messages={this.state.messages}/>:<LoginForm login={this.login} user={this.state.roomAndUser.user}/>}
      <CreateChat/>
      <TextField sendMessage={this.sendMessage}/>
    </div>)
       
 
  }
  
}
export default App