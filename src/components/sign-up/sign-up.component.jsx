import React from 'react';
import {connect} from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signUpStart} from '../../redux/user/user.actions';
import {auth,createUserProfileDocument} from '../../firebase/firebase.utils';
import './sign-up.styles.scss';

class SignUp extends React.Component{
    constructor(){
        super();
        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }
    handleSubmit = async event =>{
        event.preventDefault();
        const  {displayName,email,password,confirmPassword}=this.state;
        const {signUpStart} = this.props;
        if(password!==confirmPassword){
            alert("passwords don't match");
            return;
        }
       
        signUpStart({displayName,email,password});
     
        /*
        try{    
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{displayName});
            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''
            });
            
        }catch(error){
            console.log(error);
        }
        */
    }
    handleChange = event =>{
        const {value,name} = event.target;
        this.setState({[name]:value});
    }
    render(){
        const  {displayName,email,password,confirmPassword}=this.state;
        const {error} = this.props;
            
        return(
            <div className="sign-up">
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <span>{error?error.message:null}</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput name="displayName" type="text" value={displayName} onChange={this.handleChange} label='displayName' required/>
                
                    <FormInput name="email" type="email" value={email} onChange={this.handleChange} label='email' required/>
                
                    <FormInput name="password" type="password" value={password} onChange={this.handleChange} label='passowrd' required/>
                    <FormInput name="confirmPassword" type="password" value={confirmPassword} onChange={this.handleChange} label='confirmPassword' required/>
                    
                    <CustomButton type="submit">Sign Up</CustomButton>

                </form>
            </div>
        )
    }
    
}
const mapStateToProps = ({user})=>({
    error:user.error
})
const mapDispatchToProps = dispatch =>({
    signUpStart : userCredentials=>dispatch(signUpStart(userCredentials))
});
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);