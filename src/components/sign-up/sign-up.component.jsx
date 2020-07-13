import React from 'react';
import './sign-up.styles.scss';

class SignUp extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:''
        }
    }
    render(){
        return(
            <div className="sign-up">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
            </div>
        )
    }
    
}
export default SignUp;