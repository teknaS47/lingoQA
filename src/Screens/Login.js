// import "@patternfly/react-core/dist/styles/base.css";
// import "./fonts.css";

import React, { useState, useCallback, useEffect } from "react";
import {
  LoginFooterItem,
  LoginForm,
  LoginMainFooterBandItem,
  LoginMainFooterLinksItem,
  LoginPage,
  BackgroundImageSrc,
  ListItem,
} from "@patternfly/react-core";
import { Redirect, useHistory } from "react-router-dom";
import { ExclamationCircleIcon } from "@patternfly/react-icons";

function Login() {
  // showHelperText: false,
  const [usernameValue, setUsernameValue] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [passwordValue, setPasswordValue] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [adminPage, setAdminPage] = useState(false);

  const tokenString = localStorage.getItem("token");
  const adminTokenString = localStorage.getItem("adminToken");

  const history=useHistory()

  useEffect(() => {
    setIsValidUsername(true);
    setIsValidPassword(true);
    console.log("tokenString", tokenString);
    if (tokenString === "true") {
    }
    // return () => {
    //   cleanup
    // }
  }, [adminPage, tokenString]);

  // isRememberMeChecked: false

  const handleUsernameChange = (value) => {
    setIsValidUsername(true);
    setUsernameValue(value);
  };

  const handlePasswordChange = (passwordValue) => {
    setIsValidPassword(true);
    setPasswordValue(passwordValue);
  };

  // this.onRememberMeClick = () => {
  //   this.setState({ isRememberMeChecked: !this.state.isRememberMeChecked });
  // };

  const loginComplete = () => {
    if (isValidUsername && isValidPassword) {
      console.log("aaaaaaaa");
      window.open("/", "_self");
    }
  };

  const onLoginButtonClick = (event) => {
    event.preventDefault();
    console.log(isValidPassword);
    if (usernameValue === "root" && passwordValue === "redhat") {
      if (adminPage) {localStorage.setItem("adminToken", true); history.push("/admin")}
      else {localStorage.setItem("token", true); history.push("/")}
    } else {
      setIsValidUsername(false);
      setIsValidPassword(false);
    }
    // }
    // loginComplete();
    //   this.setState({
    //     showHelperText: !this.state.usernameValue || !this.state.passwordValue
    //   });
    // setTimeout(()=>{
    //   if(isValidUsername && isValidPassword)
    //   {window.open("/","_self")}
  };
  // ,2000)

  // };

  //   render() {
  // const helperText = () => (
  //   <React.Fragment>
  //     <ExclamationCircleIcon />
  //     &nbsp;Invalid login credentials.
  //   </React.Fragment>
  // );

  // const listItem = (
  //   <React.Fragment>
  //     <ListItem>
  //       <LoginFooterItem href="#">Terms of Use </LoginFooterItem>
  //     </ListItem>
  //     <ListItem>
  //       <LoginFooterItem href="#">Help</LoginFooterItem>
  //     </ListItem>
  //     <ListItem>
  //       <LoginFooterItem href="#">Privacy Policy</LoginFooterItem>
  //     </ListItem>
  //   </React.Fragment>
  // );

  const loginForm = (
    <div>
      <LoginForm
        // showHelperText={this.state.showHelperText}
        helperText={"helperText"}
        usernameLabel="Username"
        usernameValue={usernameValue}
        onChangeUsername={handleUsernameChange}
        isValidUsername={isValidUsername}
        passwordLabel="Password"
        passwordValue={passwordValue}
        onChangePassword={handlePasswordChange}
        isValidPassword={isValidPassword}
        // rememberMeLabel="Keep me logged in for 30 days."
        // isRememberMeChecked={this.state.isRememberMeChecked}
        // onChangeRememberMe={this.onRememberMeClick}
        onLoginButtonClick={onLoginButtonClick}
      />
      {/* {loginComplete()} */}
      {/* {isValidPassword && isValidUsername ? (<Redirect to='/'/>):null} */}
    </div>
  );

  const images = {
    // [BackgroundImageSrc.lg]: "/assets/images/pfbg_1200.jpg",
    // [BackgroundImageSrc.sm]: "/assets/images/pfbg_768.jpg",
    // [BackgroundImageSrc.sm2x]: "/assets/images/pfbg_768@2x.jpg",
    // [BackgroundImageSrc.xs]: "/assets/images/pfbg_576.jpg",
    // [BackgroundImageSrc.xs2x]: "/assets/images/pfbg_576@2x.jpg"
  };

  const admin = useCallback(() => {
    setAdminPage(!adminPage);
  }, [adminPage]);

  if(tokenString)
  {
    return (<Redirect to="/"/>)
  }

  if(adminTokenString)
  {
    return (<Redirect to = "/admin"/>)
  }

  return adminPage ? (
    <LoginPage
      footerListVariants="inline"
      // brandImgSrc={brandImg}
      // brandImgAlt="PatternFly logo"
      backgroundImgSrc={images}
      backgroundImgAlt="Images"
      // footerListItems={listItem}
      textContent="This log in is intended for admins only."
      loginTitle="Log In to LingoQA Admin account"
      // loginSubtitle="Please use your single sign-on LDAP credentials"
    >
      {loginForm}
      <div style={{ width: "100%", left: 100 }}>
        <a href="#login" onClick={admin}>
          Login
        </a>
      </div>
      {/* <a href="#admin" onClick={setAdminPage(true)}>Admin Login</a> */}
    </LoginPage>
  ) : (
    <LoginPage
      footerListVariants="inline"
      // brandImgSrc={brandImg}
      // brandImgAlt="PatternFly logo"
      backgroundImgSrc={images}
      backgroundImgAlt="Images"
      // footerListItems={listItem}
      // textContent="This is placeholder text only. Use this area to place any information or introductory message about your application that may be relevant to users."
      loginTitle="Log In to LingoQA account"
      // loginSubtitle="Please use your single sign-on LDAP credentials"
    >
      {loginForm}
      <a href="#admin" onClick={admin}>
        Admin Login
      </a>
      {/* <a href="#admin" onClick={setAdminPage(true)}>Admin Login</a> */}
    </LoginPage>
  );
  //   }
}

export default Login;
