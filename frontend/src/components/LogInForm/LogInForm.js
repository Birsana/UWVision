import React, { useState } from "react";
import {
    Form,
    Input
} from './styles'

const LogInForm = (props) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    console.log("Submitted");
    console.log(userInfo);
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="login-form">
        <h2> Log In</h2>
        <div className="form-input">
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(event) =>
              setUserInfo({ ...userInfo, email: event.target.value })
            }
            value={userInfo.email}
          />
        </div>
        <div className="form-input">
          <Input
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(event) =>
              setUserInfo({ ...userInfo, password: event.target.value })
            }
            value={userInfo.password}
          />
        </div>
        <input type="submit" value="Log In" />
      </div>
    </Form>
  );
};

export default LogInForm;
