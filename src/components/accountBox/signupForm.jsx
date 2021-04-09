import React from 'react'
import axios from 'axios';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import SnackBar from "./SnackBar";
import LoginForm from './loginForm';

class signupForm extends React.Component {
  state = {
      email: '',
      password: 0,
      confirmPassword: 0,
      switch: 'signUp',
      fullName: '',
  }
  login =async() => {
    if(!this.state.email) return (this.SnackBar.openSnackbar('please enter your email address', 'error'))
    if(!this.state.fullName) return (this.SnackBar.openSnackbar('please enter your full name address', 'error'))
    if(!this.state.password) return (this.SnackBar.openSnackbar('please enter your email password', 'error'))
    if(!this.state.confirmPassword) return (this.SnackBar.openSnackbar('please enter your confirm email password', 'error'))
    if(this.state.password !== this.state.confirmPassword) return (this.SnackBar.openSnackbar('please repeat your password correctly', 'error'))
    if(this.state.password.length < 8) return (this.SnackBar.openSnackbar('password should have less than 8 character', 'error'))
    if(this.validateEmailAddress(this.state.email) === false) return (this.SnackBar.openSnackbar('this email address is wrong', 'error'))

    // const res = await axios.post(_XXXXXXX, {
    //     email: this.state.email,
    //     password: this.state.password,
    //     confirmPassword: this.state.confirmPassword,
    //     fullName: this.state.fullName,
    // })
    //     .catch(e => {
    //         console.log(e);
    //         const message = (e.response && e.response.data && e.response.data.message) || 'somthing is wrong'
    //         console.log()
    //         this.SnackBar.openSnackbar(message)
    //     });

    // if (!res.data.success) return this.SnackBar.openSnackbar(res.data.message);

    // window.localStorage.setItem('token', token)
    // this.SnackBar.openSnackbar(res.data.message);
    console.log("signed up")

  }
  switchToLogin=()=>{
    this.setState({switch: 'login'})
  }

  validateEmailAddress = emailAddress => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(emailAddress)) return false
    else return true
  }
render() {
  return(
    <BoxContainer>
      <SnackBar ref={el => this.SnackBar = el} />
       {this.state.switch === 'signUp' &&
       <>
       <FormContainer>
         <Input type="text" placeholder="Full Name" onChange={e => this.setState({fullName: e.target.value})}/>
         <Input type="email" placeholder="Email" onChange={e => this.setState({email: e.target.value})}/>
         <Input type="password" placeholder="Password" onChange={e => this.setState({password: e.target.value})}/>
         <Input type="password" placeholder="Confirm Password" onChange={e => this.setState({confirmPassword: e.target.value})}/>
       </FormContainer>
       <Marginer direction="vertical" margin={16} />
       <SubmitButton type="submit" onClick={this.signUp}>Sign Up</SubmitButton>
       <Marginer direction="vertical" margin="1em" />
       <MutedLink>
         Already have an account?
         <BoldLink href="#" onClick={this.switchToLogin}>
           Sign in
         </BoldLink>
       </MutedLink>
       </>
      }
       {this.state.switch === 'login' &&
       <LoginForm/>
       }
     </BoxContainer>
  )
  }
}
export default signupForm;

