// import "@patternfly/react-core/dist/styles/base.css";
// import "./fonts.css";

import axios from "axios";
import BASE_URL from "../API/BASE_URL";

import React, { useState, useCallback, useEffect } from "react";
import {
  // LoginFooterItem,
  LoginForm,
  LoginMainFooterBandItem,
  // LoginMainFooterLinksItem,
  LoginPage,
  HelperText,
  HelperTextItem,
  // ListItem,
} from "@patternfly/react-core";
import { Redirect, useHistory } from "react-router-dom";
// import brandImg from "../Logo-Red_Hat-A-Reverse-RGB.svg";
import brandImg from "../Logo-Red_Hat-A-Reverse-RGB2.png";

// import background from '../assets/images/white.jpg';
import { Form, FormGroup, TextInput, Button } from "@patternfly/react-core";

// import { ExclamationCircleIcon } from "@patternfly/react-icons";

function Login() {
  // showHelperText: false,
  const [signinUsername, setSigninUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [signinPassword, setSigninPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [loginHelperText, setLoginHelperText] = useState("");
  const [signupHelperText, setSignupHelperText] = useState("");
  const [signupError, setSignupError] = useState(false);

  const [adminPage, setAdminPage] = useState(false);
  const [loginPage, setLoginPage] = useState(true);
  const [changeCredentialsPage, setChangeCredentialsPage] = useState(false);

  const tokenString = localStorage.getItem("token");
  const adminTokenString = localStorage.getItem("adminToken");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validatedName] = React.useState("default");
  const [validatedEmail, setValidatedEmail] = React.useState("default");
  const [validatedPassword, setValidatedPassword] = React.useState("default");
  const [validatedConfirmPassword, setValidatedConfirmPassword] =
    React.useState("default");
  // const [helperText, setHelperText] = React.useState(
  //   "Enter your age to continue"
  // );

  const history = useHistory();

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
    // setIsValidUsername(true);
    setSigninUsername(value);
  };

  const handleLoginPasswordChange = (signinPassword) => {
    // setIsValidPassword(true);
    setSigninPassword(signinPassword);
  };

  // this.onRememberMeClick = () => {
  //   this.setState({ isRememberMeChecked: !this.state.isRememberMeChecked });
  // };

  // const loginComplete = () => {
  //   if (isValidUsername && isValidPassword) {
  //     console.log("aaaaaaaa");
  //     window.open("/", "_self");
  //   }
  // };

  const onLoginButtonClick = async (event) => {
    event.preventDefault();

    const userData = await axios(`${BASE_URL}/users`, {
      params: {
        name: signinUsername,
        password: signinPassword,
      },
    });

    console.log(userData);

    if (!userData.data.error) {
      if (adminPage) {
        if (userData.data.admin === false) {
          setIsValidUsername(false);
          setIsValidPassword(false);
          setLoginHelperText("You don't have admin rights.");
        } else {
          localStorage.setItem("adminToken", true);
          localStorage.setItem("userName", signinUsername);
          localStorage.setItem("loginTime", userData.data.loginTime);
          history.push("/admin");
        }
      } else {
        localStorage.setItem("userName", signinUsername);
        localStorage.setItem("token", true);
        localStorage.setItem("loginTime", userData.data.login_time);

        history.push("/");
      }
    } else {
      setIsValidUsername(false);
      setIsValidPassword(false);
      setLoginHelperText(userData.data.error);
    }
  };

  const onSignupButtonClick = async (event) => {
    event.preventDefault();

    if (
      validatedEmail === "success" &&
      validatedPassword === "success" &&
      validatedConfirmPassword === "success"
    ) {
      const userData = await axios.post(`${BASE_URL}/users`, {
        name: username,
        email: email,
        password: password,
      });

      console.log(userData);
      if (userData.data.error) {
        setSignupError(true);
        setSignupHelperText(userData.data.error);
        // alert("User Signup Failed")
      } else {
        alert("User Signup Successful");
        localStorage.setItem("token", true);
        history.push("/");
      }
    }
  };

  const onChangeCredentialsClick = async (event) => {
    event.preventDefault();

    if (
      validatedEmail === "success" &&
      validatedPassword === "success" &&
      validatedConfirmPassword === "success"
    ) {
      await axios
        .post(`${BASE_URL}/users/forgot`, {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data === "Password changed sucessfully") {
            alert("Password changed successfully");
            history.push("/");
          } else {
            alert("Password did not change");
          }
          console.log(response.data);
        });

      // console.log("User DATA",userData.data);
      // if (userData.data.error) {
      //   setSignupError(true);
      //   setSignupHelperText(userData.data.error);
      // } else {
      //   localStorage.setItem("token", true);
      //   history.push("/");
      // }
    }
  };

  const handleNameChange = (username) => {
    setUsername(username);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    setValidatedEmail("default");
    if (!/^[a-zA-Z0-9]+@redhat.com$/.test(email)) {
      setValidatedEmail("error");
    } else {
      setValidatedEmail("success");
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    setValidatedPassword("default");
    if (password !== "") {
      setValidatedPassword("success");
    }
    if (confirmPassword !== "") {
      handleConfirmPasswordChange();
    }
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    setValidatedConfirmPassword("default");
    if (confirmPassword !== "" && confirmPassword === password) {
      setValidatedConfirmPassword("success");
    } else {
      setValidatedConfirmPassword("error");
    }
  };

  const signupForm = (
    <div>
      {signupError ? (
        <HelperText>
          <HelperTextItem variant="error" hasIcon>
            {signupHelperText}
          </HelperTextItem>
        </HelperText>
      ) : null}
      <Form>
        <FormGroup label="Username" isRequired>
          <TextInput
            isRequired
            validated={validatedName}
            value={username}
            type="text"
            id="simple-form-name-01"
            name="simple-form-name-01"
            aria-describedby="simple-form-name-01-helper"
            onChange={handleNameChange}
          />
        </FormGroup>
        <FormGroup
          label="Red Hat email"
          isRequired
          validated={validatedEmail}
          helperTextInvalid="Must be a Red Hat email"
        >
          <TextInput
            isRequired
            validated={validatedEmail}
            value={email}
            type="email"
            id="simple-form-name-01"
            name="simple-form-name-01"
            aria-describedby="simple-form-name-01-helper"
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormGroup label="Password" isRequired>
          <TextInput
            isRequired
            validated={validatedPassword}
            value={password}
            type="password"
            id="simple-form-name-01"
            name="simple-form-name-01"
            aria-describedby="simple-form-name-01-helper"
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <FormGroup
          label="Confirm password"
          isRequired
          validated={validatedConfirmPassword}
          helperTextInvalid="Passwords don't match"
        >
          <TextInput
            isRequired
            validated={validatedConfirmPassword}
            value={confirmPassword}
            type="password"
            id="simple-form-name-01"
            name="simple-form-name-01"
            aria-describedby="simple-form-name-01-helper"
            onChange={handleConfirmPasswordChange}
          />
        </FormGroup>
        <Button variant="primary" onClick={onSignupButtonClick}>
          Sign up
        </Button>
      </Form>
    </div>
  );

  const loginForm = (
    <div>
      {!isValidUsername ? (
        <HelperText>
          <HelperTextItem variant="error" hasIcon>
            {loginHelperText}
          </HelperTextItem>
        </HelperText>
      ) : null}
      <LoginForm
        // showHelperText={true}
        // helperText={"helperText"}
        usernameLabel="Username"
        usernameValue={signinUsername}
        onChangeUsername={handleUsernameChange}
        isValidUsername={isValidUsername}
        passwordLabel="Password"
        passwordValue={signinPassword}
        onChangePassword={handleLoginPasswordChange}
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

  const changeCredentialsForm = (
    <Form>
      <FormGroup
        label="Red Hat email"
        isRequired
        validated={validatedEmail}
        helperTextInvalid="Must be a Red Hat email"
      >
        <TextInput
          isRequired
          validated={validatedEmail}
          value={email}
          type="email"
          id="simple-form-name-01"
          name="simple-form-name-01"
          aria-describedby="simple-form-name-01-helper"
          onChange={handleEmailChange}
        />
      </FormGroup>
      <FormGroup label="New password" isRequired>
        <TextInput
          isRequired
          validated={validatedPassword}
          value={password}
          type="password"
          id="simple-form-name-01"
          name="simple-form-name-01"
          aria-describedby="simple-form-name-01-helper"
          onChange={handlePasswordChange}
        />
      </FormGroup>
      <FormGroup
        label="Confirm new password"
        isRequired
        validated={validatedConfirmPassword}
        helperTextInvalid="Passwords don't match"
      >
        <TextInput
          isRequired
          validated={validatedConfirmPassword}
          value={confirmPassword}
          type="password"
          id="simple-form-name-01"
          name="simple-form-name-01"
          aria-describedby="simple-form-name-01-helper"
          onChange={handleConfirmPasswordChange}
        />
      </FormGroup>
      <Button variant="primary" onClick={onChangeCredentialsClick}>
        Change Password
      </Button>
    </Form>
  );

  const signup = useCallback(() => {
    setLoginPage(!loginPage);
  }, [loginPage]);

  const admin = useCallback(() => {
    setAdminPage(!adminPage);
    setSigninUsername("");
    setSigninPassword("");
  }, [adminPage]);

  const ChangeCredentials = useCallback(() => {
    setChangeCredentialsPage(!changeCredentialsPage);
    setSigninUsername("");
    setSigninPassword("");
  }, [changeCredentialsPage]);

  const signUpForAccountMessage = (
    <LoginMainFooterBandItem>
      Need an account?{" "}
      <a href="#signup" onClick={signup}>
        Sign up{" "}
      </a>
    </LoginMainFooterBandItem>
  );

  const adminLoginMessage = (
    <LoginMainFooterBandItem>
      <a href="#admin" onClick={admin}>
        Admin Login
      </a>
    </LoginMainFooterBandItem>
  );

  const forgotCredentials = (
    <LoginMainFooterBandItem>
      <a href="#forgotcreds" onClick={ChangeCredentials}>
        Forgot password?
      </a>
    </LoginMainFooterBandItem>
  );

  const loginAccountMessage = (
    <LoginMainFooterBandItem>
      {adminPage ? null : "Have an account? "}
      <a
        href="#login"
        onClick={
          adminPage ? admin : changeCredentialsPage ? ChangeCredentials : signup
        }
      >
        Login
      </a>
    </LoginMainFooterBandItem>
  );

  const images = {
    lg: "../assets/images/white.jpg",
    sm: "../assets/images/white.jpg",
    sm2x: "../assets/images/white.jpg",
    xs: "../assets/images/white.jpg",
    xs2x: "../assets/images/white.jpg",
  };

  if (tokenString) {
    return <Redirect to="/" />;
  }

  if (adminTokenString) {
    return <Redirect to="/admin" />;
  }

  return loginPage ? (
    adminPage ? (
      <LoginPage
        footerListVariants="inline"
        brandImgSrc={brandImg}
        // brandImgAlt="PatternFly logo"
        backgroundImgSrc={images}
        backgroundImgAlt="Images"
        // footerListItems={listItem}
        textContent="This log in is intended for admins only."
        loginTitle="Admin Login for LingoQA"
        signUpForAccountMessage={[loginAccountMessage]}
        // loginSubtitle="Please use your single sign-on LDAP credentials"
      >
        {loginForm}
        {/* <a href="#admin" onClick={setAdminPage(true)}>Admin Login</a> */}
      </LoginPage>
    ) : changeCredentialsPage ? (
      <LoginPage
        footerListVariants="inline"
        brandImgSrc={brandImg}
        // brandImgAlt="PatternFly logo"
        backgroundImgSrc={images}
        backgroundImgAlt="Images"
        // footerListItems={listItem}
        textContent="Change your password by entering new passowrd"
        loginTitle="Change password"
        signUpForAccountMessage={[loginAccountMessage]}
        // loginSubtitle="Please use your single sign-on LDAP credentials"
      >
        {changeCredentialsForm}
        {/* <a href="#admin" onClick={setAdminPage(true)}>Admin Login</a> */}
      </LoginPage>
    ) : (
      <LoginPage
        footerListVariants="inline"
        brandImgSrc={brandImg}
        // style={{background:"/assets/images/white.jpg"}}
        // brandImgAlt="PatternFly logo"
        backgroundImgSrc={images}
        backgroundImgAlt="Images"
        // footerListItems={listItem}
        textContent="Login to your LingoQA account"
        loginTitle="Log In to LingoQA account"
        signUpForAccountMessage={[signUpForAccountMessage, adminLoginMessage]}
        // loginSubtitle="Please use your single sign-on LDAP credentials"
        forgotCredentials={forgotCredentials}
      >
        {loginForm}
        {/* {signUpForAccountMessage}  */}
        {/* <a href="#admin" onClick={admin}>
          Admin Login
        </a> */}
        {/* <a href="#signup" onClick={signup}>
          Signup
        </a> */}
        {/* <a href="#admin" onClick={setAdminPage(true)}>Admin Login</a> */}
      </LoginPage>
    )
  ) : (
    <LoginPage
      footerListVariants="inline"
      brandImgSrc={brandImg}
      // brandImgAlt="PatternFly logo"
      backgroundImgSrc={images}
      backgroundImgAlt="Images"
      // footerListItems={listItem}
      textContent="Signup for a LingoQA account"
      loginTitle="Sign up for a LingoQA account"
      signUpForAccountMessage={[loginAccountMessage]}
      // loginSubtitle="Please use your single sign-on LDAP credentials"
    >
      {signupForm}
    </LoginPage>
  );
  //   }
}

export default Login;
