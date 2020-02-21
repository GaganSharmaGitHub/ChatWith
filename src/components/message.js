import React from 'react'
function Message(mData){
   // console.log(mData)
    
   return(
    <div className={!(mData.mData.senderId===mData.user)?"message animated bounceInLeft":"byMe animated bounceInRight"}>
    <div>
    <span className='mSender'>{(mData.mData.senderId===mData.user)?'You':mData.mData.sender.name}</span>
    <div className='mText'>{mData.mData.parts[0].payload.content}</div>
    <span className='messageTime'>
    {mData.mData.createdAt.slice(mData.mData.createdAt.indexOf('T')+1, mData.mData.createdAt.indexOf('Z')-2)}
    </span>
    </div>
    </div>
    
)
}
export default Message