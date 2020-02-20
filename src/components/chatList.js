import React from 'react'
import RoomListItem from './roomListItem'
class ChatList extends React.Component{
    handleClick(p){
console.log(p)
    }
   render()
    { 
        return(
            <div className='chatList'><h3>ChatWith</h3>
            Welcome Back! {this.props.user.id}<br></br>
            Your Chats:
            <ul>
            {(Array.isArray(this.props.user.rooms))?this.props.user.rooms.map(item=><RoomListItem key={item.id} changeRoom={this.props.changeRoom} current={this.props.current} item={item} />):" " }
            </ul>
            <div>
      {/*this.props.chatkit.isLoading? 'Connecting to Chatkit...': `Hello ${this.props.chatkit.currentUser.name}!`*/}
    </div>        
            </div>
        )}
    }
export default ChatList