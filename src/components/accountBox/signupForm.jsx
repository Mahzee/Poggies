import React, { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";

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
import SnackBar  from "./SnackBar"; 
import axios from "axios";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const snkbr = useRef();
  const [password, setPassword] = useState(0);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(0);
  
    async function signup () {
      var token = "";

      if (!email)
        return snkbr.current.openSnackbar(
          "Please enter your email address",
          "error"
        );
      if (!fullName)
        return snkbr.current.openSnackbar(
          "Please enter your full name",
          "error"
        );
      if (!password)
        return snkbr.current.openSnackbar(
          "Please enter your email address",
          "error"
        );
      if (!confirmPassword)
        return snkbr.current.openSnackbar(
          "Please enter your confirm email password",
          "error"
        );
      if (password !== confirmPassword)
        return snkbr.current.openSnackbar(
          "Please repeat your password correctly",
          "error"
        );
      if (password.length < 8)
        return snkbr.current.openSnackbar(
          "Password should have more than 8 character",
          "error"
        );
      if (validateEmailAddress(email) === false)
        return snkbr.current.openSnackbar(
          "This email address is wrong",
          "error"
        );
          
      const res = await axios
        .post("https://webhook.site/52e30428-2b5c-4dcf-99c1-6b5ebbae4171", {
          Username: fullName,
          Email: email,
          Password: password,
          Confirmpassword: confirmPassword,
        })
        .catch((e) => {
          console.log(e);
          const message =
            (e.response && e.response.data && e.response.data.message) ||
            "somthing is wrong";
          console.log();
          snkbr.current.openSnackbar(message);
        });

        if(!res) return
        if (!res.data.success) return snkbr.current.openSnackbar(res.data.message);

      window.localStorage.setItem('token', token)
      snkbr.current.openSnackbar(res.data.message);
      console.log("signed up");
    }

  function validateEmailAddress (emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(emailAddress)) return false
    else return true
  }

  return (
      <BoxContainer>
        <SnackBar ref={snkbr} />
       <FormContainer>
         <Input type="text" placeholder="Full Name" onChange={e => setFullName(e.target.value)}/>
         <Input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
         <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
         <Input type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>
       </FormContainer>
       <Marginer direction="vertical" margin={16} />
       <SubmitButton type="submit" onClick={signup}>Sign Up</SubmitButton>
       <Marginer direction="vertical" margin="1em" />
       <MutedLink>
         Already have an account?
         <BoldLink href="#" onClick={switchToSignin}>
           Sign in
         </BoldLink>
       </MutedLink>
     </BoxContainer>
  );
}
