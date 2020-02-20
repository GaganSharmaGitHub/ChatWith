import React from 'react'
import MessageList from './components/messagelList'
import Loader from './components/loader'
import ChatList from './components/chatList'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import CreateChat from './components/createChat'
import TextField from './components/textField.js'
import{tokenURL, instanceLocator}from './config'
var roomId='1044687d-e917-4c04-857b-dd89a67fa2eb'
class App extends React.Component{
 constructor(){
   super()
   this.state={
     messages:[],
     user:{},
     roomAndUser:{
       roomId: roomId,
       user: 'Gagan'
     }
   }

   this.sendMessage = this.sendMessage.bind(this)
   this.changeRoom = this.changeRoom.bind(this)
 }
 componentDidMount(){
  const chatManager = new ChatManager({
    instanceLocator: instanceLocator,
    userId: this.state.roomAndUser.user,
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
  
  
}
  render(){//console.log(this.state.user.id)
   
  var objDiv = document.getElementsByClassName("messageList");
  objDiv.scrollTop = 1000;
    return(
    <div className='app'>
      <ChatList changeRoom={this.changeRoom} current={this.state.roomAndUser.roomId} user={this.state.user}/>
      <MessageList  userId={this.state.user.id} messages={this.state.messages}/>
      <CreateChat/>
      <TextField sendMessage={this.sendMessage}/>
    </div>)
       
 
  }
  
}
export default App