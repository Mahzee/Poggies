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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const snkbr = useRef();
  const [password, setPassword] = useState(0);
  const [email, setEmail] = useState('');

  function validateEmailAddress (emailAddress) {
  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  if (!pattern.test(emailAddress)) return false
  else return true
  }

  async function login (){
    var token = "";
    if (!email)
      return snkbr.current.openSnackbar(
        "Please enter your email address",
        "error"
      );
    if (!password)
      return snkbr.current.openSnackbar(
        "Please enter your email password",
        "error"
      );
    if (password.length < 8)
      return snkbr.current.openSnackbar(
        "Password should have less than 8 character",
        "error"
      );
    if (validateEmailAddress(email) === false)
      return snkbr.current.openSnackbar(
        "This email address is wrong",
        "error"
      );

    const res = await axios
      .post("http://127.0.0.1:8000/", {
        Usernameormail: email,
        Password: password,
      })
      .catch((e) => {
        console.log(e);
        const message =
          (e.response && e.response.data && e.response.data.message) ||
          "somthing is wrong";
        console.log();
        snkbr.current.openSnackbar(message);
      });

    if (!res.data.success) return snkbr.current.openSnackbar(res.data.message);

    window.localStorage.setItem('token', token)
    snkbr.current.openSnackbar(res.data.message);
    console.log("loged in");
  }

  return (
    <BoxContainer>
      <SnackBar ref={snkbr} />
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={12} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.5em" />
      <SubmitButton type="submit" onClick={login}>
        Sign in
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink>
        Don't have an account?
        <BoldLink href="#" onClick={switchToSignup}>
          Sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
