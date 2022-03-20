import React, { Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../../context/auth";
import { User } from "./User";
import { Messages } from "./Messages";

export const Home = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  const [selectedUser, setSelectedUser] = React.useState<null | string>(null);

  return (
    <Fragment>
      <Row className=" flex mb-2" style={{ "background": "#FFE0B2" }}>
        <Col className="text-center">
          <Link to="/login">
            <Button variant="link" style={{"color":"black"}}>Login</Button>
          </Link>
        </Col>
        <Col className="text-center">
          <Link to="/register">
            <Button variant="link" style={{"color":"black"}}>Register</Button>
          </Link>
        </Col>
        <Col className="text-center">
          <Button variant="link" style={{"color":"black"}} onClick={logout}>
            {" "}
            Logout
          </Button>
        </Col>
      </Row>
      <Row className="bg-white">
        <User />
        <Messages />
      </Row>
    </Fragment>
  );
};
