import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
    }
  }
`;

interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}


export const Register = (props : any) => {
  const navigate = useNavigate();
  const [variables, setVariables] = useState<User>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, __) {
      navigate("/login")
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const submitRegisterForm = (e: any) => {
    e.preventDefault();
    registerUser({ variables });
    console.log(variables);
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1>Register</h1>
        <Form onSubmit={submitRegisterForm}>
          <Form.Group>
            <Form.Label className={errors.email && "text-danger"}>
              {errors.email ?? 'Email address'}
            </Form.Label>
            <Form.Control
              type="email"
              value={variables.email}
              onChange={(e) => {
                setVariables({ ...variables, email: e.target.value });
              }}
              className={errors.email &&  'is-invalid'}
            />
          </Form.Group>
          <Form.Group>
          <Form.Label className={errors.username && "text-danger"}>
              {errors.username ?? 'Username'}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.username}
              onChange={(e) => {
                setVariables({ ...variables, username: e.target.value });
              }}
              className={errors.username && 'is-invalid'}

            />
          </Form.Group>
          <Form.Group>
          <Form.Label className={errors.password && "text-danger"}>
              {errors.password ?? 'Password'}
            </Form.Label>
            <Form.Control
              type="password"
              value={variables.password}
              onChange={(e) => {
                setVariables({ ...variables, password: e.target.value });
              }}
              className={errors.password && 'is-invalid'}

            />
          </Form.Group>
          <Form.Group>
          <Form.Label className={errors.confirmPassword && "text-danger"}>
              {errors.confirmPassword ?? 'Confirm Password'}
            </Form.Label>
            <Form.Control
              type="password"
              value={variables.confirmPassword}
              onChange={(e) => {
                setVariables({ ...variables, confirmPassword: e.target.value });
              }}
              className={errors.confirmPassword && 'is-invalid'}

            />
          </Form.Group>

          <div className="text-center mt-2">
            <Button
              variant="success"
              type="submit"
              className="text-center"
              disabled={loading}
              style={{"backgroundColor":"#8D6E63", "borderColor":"#8D6E63" , "color":"white"}}
            >
              {loading ? "loading..." : "Register"}
            </Button>
            <br/>
            <small>Already have an account? <Link to="/login" style={{"color":"#8D6E63"}} >Login</Link></small>

          </div>
        </Form>
      </Col>
    </Row>
  );
};
