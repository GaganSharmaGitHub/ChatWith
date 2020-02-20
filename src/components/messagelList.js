import React from 'react'
import Message from './message'
import Loader from './loader'
function MessageList(props){
        return(
            <div className='messageList' >
            
            {(props.messages.length==0)?<Loader/>:props.messages.map(item=><Message user={props.userId}  key={item.id} mData={item}></Message>)}
            </div>
        )
}
export default MessageList