import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/context/authContext";
import { ADD_USER } from "../../utils/mutations";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const [registerAPI, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log("username", username);
  //     console.log("email", email);
  //     console.log("password", password);
  //     console.log(error);
  //   }, [username, email, password, error]);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      const mutationResponse = await registerAPI({
        variables: { name: username, email, password },
      });
      //   console.log(mutationResponse);
      const token = mutationResponse.data?.addUser.token;
      navigate("/");
      authContext.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Username Required" }]}
      >
        <Input
          type="text"
          id="name"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email Required" }]}
      >
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password Required" }]}
      >
        <Input.Password
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Create New User
        </Button>
      </Form.Item>
      {error && ( // show error message if error state is not null
        <div style={{ background: "red", color: "white", padding: "10px" }}>
          <span style={{ marginRight: "5px" }}>!</span>
          {error.message}
        </div>
      )}
    </Form>
  );
};

export default CreateUser;
