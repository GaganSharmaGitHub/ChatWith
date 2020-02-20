import React from 'react'
function Message(mData){
    //console.log(mData)
    
   return(
    <div className={!(mData.mData.senderId==mData.user)?"message":"byMe"}>
    <div>
    <span className='mSender'>{(mData.mData.senderId==mData.user)?'You':mData.mData.sender.name}</span>
    <div className='mText'>{mData.mData.parts[0].payload.content}</div>
    </div>
    </div>
    
)
}
export default Message