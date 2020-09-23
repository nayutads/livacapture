import React from 'react';

class Auth extends React.Component{

    constructor(props){
        super(props);
        
        this.state={
            auth_class:'btn btn-secondary',
            auth_string:'認証',
            screen_name:''
        }
    }

    _handleClick(){
        const AuthTwitter=require('./../rendererHelper/AuthTwitter');
        AuthTwitter();
    }

    render(){
        return(
            <div className='auth-container'>
                <div className={this.state.auth_class} onClick={()=>this._handleClick()}>
                    <p>{this.state.auth_string}</p>
                </div>
            </div>
        );
    }
}

export default Auth;