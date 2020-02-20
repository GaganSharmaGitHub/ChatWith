import React from 'react'
class RoomListItem extends React.Component{
    constructor(){
        super()
        this.state={id:''}
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(){
        console.log('render hua h')
        this.props.changeRoom(this.state.id)
        
    }
    componentDidMount(){
        this.setState({id:this.props.item.id})
    }
    render(){
        return(
        <li
        onClick={this.handleSubmit}
        className={(this.props.item.id==this.props.current)?"active":"inactive"}
        key={this.props.item.id}>
        {this.props.item.name}</li>
        )
    }
}
export default RoomListItem