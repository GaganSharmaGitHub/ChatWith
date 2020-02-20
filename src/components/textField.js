import React from 'react'
class TextField extends React.Component{
    constructor(){
        super()
        this.state={
            value:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        this.setState({
            value: e.target.value
        })
    }
    handleSubmit(){
        console.log('render hua h')
        this.props.sendMessage(this.state.value)
        this.setState({value:''})
    }
    render(){
        return(
            <div className="textField">
            
            <input type="text" 
            onSubmit={this.handleSubmit}
             placeholder="Type message......." onChange={this.handleChange}
            value={this.state.value}
            ></input>
            
            <button className='send' onClick={this.handleSubmit}>Send</button>
            </div>
        )
    }
}
export default TextField