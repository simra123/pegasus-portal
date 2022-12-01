// ** React Imports
import { Link, useHistory } from 'react-router-dom'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import CoreHttpHandler from '../../../http/services/CoreHttpHandler'
import { selectMail } from '../../apps/email/store'
import { useState } from 'react'
import logo from "@src/assets/images/logo/logo.png";
import OtpInput from "react-otp-input";
import Swal from 'sweetalert2'
import { ToastError, ToastSuccess, LoadingButton } from "../reuseable";


const ForgotPasswordBasic = () => {

  const [email,setEmail] = useState("")
  const [showEmail,setShowEmail] = useState(true)
  const [showtoken, setShowToken] = useState(false);
  const [token,setToken] = useState("")
  
  let history = useHistory();

  const onClick = () =>{
    CoreHttpHandler.request(
      "sellers",
      "forget",
      {
        email: email
      },
      (response)=>{
        setShowEmail(false)
      },
      (err)=>{
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${err.response.data.message.split(":")[2]}`,
          showCancelButton: false,
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-outline-danger ms-1",
          },
          background: "#020202",
        });
      }
    );
}

  const onClickToken = () =>{
    CoreHttpHandler.request(
      "sellers",
      "check_token",
      {
        token: token
      },
      (response)=>{
			  ToastSuccess("Success", "Valid token. Now reset your password");
        history.push({ pathname: "/reset-password", state: token });
       
      },
      (err)=>{
         Swal.fire({
           icon: "error",
           title: "Error",
           text: `${err.response.data.message.split(":")[1]}`,
           showCancelButton: false,
           customClass: {
             confirmButton: "btn btn-primary",
             cancelButton: "btn btn-outline-danger ms-1",
           },
           background: "#020202",
         });
      }
    );
  }

    const customStyles = {
    option: (base, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...base,
        backgroundColor: isFocused ? "red" : "rgba(52, 52, 52, 1)",
      };
    },
  };
  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <Link
              className="brand-logo"
              to="/"
              onClick={(e) => e.preventDefault()}
            >
              <Link
                className="brand-logo"
                to="/"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  className="img-fluid"
                  width={45}
                  src={logo}
                  alt="Login"
                  style={{ display: "flex", alignItem: "center" }}
                />
                <h2
                  style={{ marginTop: "10px" }}
                  className="brand-text text-primary ms-1"
                >
                  Pegasus
                </h2>
              </Link>
            </Link>
            {showEmail ? (
              <>
                <CardTitle tag="h4" className="mb-1">
                  Forgot Password? 🔒
                </CardTitle>

                <CardText className="mb-2">
                  Enter your email and we'll send you instructions to reset your
                  password
                </CardText>
                <Form
                  className="auth-forgot-password-form mt-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="mb-1">
                    <Label className="form-label" for="login-email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="login-email"
                      placeholder="john@example.com"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button color="primary" onClick={onClick} block>
                    Send Code to Email
                  </Button>
                </Form>
                <p className="text-center mt-2">
                  <Link to="/login">
                    <ChevronLeft className="rotate-rtl me-25" size={14} />
                    <span className="align-middle">Back to login</span>
                  </Link>
                </p>
              </>
            ) : (
              <>
                <CardTitle tag="h4" className="mb-1">
                  Verification Code
                </CardTitle>
                <CardText className="mb-2">
                  We have send you a code at your email. Please type it below.
                </CardText>
                <Form
                  className="auth-forgot-password-form mt-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="mb-1">
                    <Label
                      className="form-label"
                      for="login-email"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      Code
                    </Label>
                    {/* <Input
                      type="number"
                      id="login-email"
                      placeholder=""
                      autoFocus
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    /> */}

                    <div style={{ display: "flex", justifyContent: "center",marginTop: "10px" }}>
                      <OtpInput
                      
                        inputStyle={{
                          width: "25px",
                          backgroundColor: "#f6f6f6",
                          height: "35px",
                          border: "none"
                        }}
                        value={token}
                        onChange={(e) => setToken(e)}
                        numInputs={6}
                        separator={<span style={{margin: "4px"}}>  -  </span>}
                      />
                    </div>
                  </div>
                  <Button color="primary" onClick={onClickToken} block>
                    Send
                  </Button>
                </Form>
                <p className="text-center mt-2">
                  <Link to="/login">
                    <ChevronLeft className="rotate-rtl me-25" size={14} />
                    <span className="align-middle">Back to login</span>
                  </Link>
                </p>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ForgotPasswordBasic
