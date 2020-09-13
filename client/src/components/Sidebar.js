import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "font-awesome/css/font-awesome.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import { UserContext } from "../UserContext";
import { withRouter } from "react-router-dom";

function Sidebar({ history, classes, classInfo }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <div style={{ display: user?._id == undefined ? "none" : "initial" }}>
        <Card>
          <Card.Header as="h6">My classes</Card.Header>
          {classes.map((singleCLass) => (
            <ListGroup.Item
              key={singleCLass._id}
              action
              onClick={() =>
                history.push(
                  `/class/${singleCLass.term.toLowerCase()}/${singleCLass.subject.toLowerCase()}/${
                    singleCLass.catalogNbr
                  }`
                )
              }
            >
              {`${singleCLass.subject} ${singleCLass.catalogNbr}`}
            </ListGroup.Item>
          ))}
        </Card>
      </div>
      <br />
      <Card
        style={{
          display: classInfo?.description == undefined ? "none" : undefined,
        }}
      >
        <Card.Header as="h6">About this class</Card.Header>
        <Card.Body>
          <Card.Text>
            {classInfo.description?.substring(0, 150) + "..."}
          </Card.Text>
        </Card.Body>
      </Card>

      <br />

      <div style={{ display: user?._id == undefined ? "initial" : "none" }}>
        <Card>
          <Card.Header as="h6">Class Whisper</Card.Header>
          <Card.Body>
            <Card.Text>
              Class Whisper is a multifaceted application designed/devloped by
              <a href="https://www.linkedin.com/in/maidul98/" target={"_blank"}>
                {" "}
                Maidul Islam{" "}
              </a>{" "}
              (Cornell '21) to provide an avenue for anonymized class specific
              communication. It allows students to freely share and discuss
              their thoughts in an organized fashion. Under no circumstance will
              user data be shared.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default withRouter(Sidebar);
