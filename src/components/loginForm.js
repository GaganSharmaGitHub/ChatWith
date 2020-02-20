import React from 'react'
class LoginForm extends React.Component{
    constructor(){
        super()
        this.state={
            user:""
        }
        this.handleClick=this.handleClick.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }
    componentDidMount(){
        this.setState({user:this.props.user})
    }
    handleClick(){
        this.props.login(this.state.user)
    }
    handleChange(e){
      this.setState({user:e.target.value})
    }
    render(){
        return(
            <div className='messageList'>
            <h1 className="loginMessage">Login to chatWith</h1>
            <div className="loginForm">
            <select onChange={this.handleChange} className="selectUser">
                <option value="Gagan">Gagan</option>
                <option value="Chahar">Chahar</option>
                <option value="Kantesh">Kantesh</option>
            </select>
            <button onClick={this.handleClick}>Login</button></div>

            </div>
        )
    }
}
export default LoginForm