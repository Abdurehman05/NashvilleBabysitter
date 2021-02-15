import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Button, Header, Form } from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";

const ConfirmForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const { babysitId } = useParams();
  const [babysitToEdit, setBabysitToEdit] = useState({});

  const userProfileId = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );

  const history = useHistory();
  useEffect(() => {
    return getToken()
      .then((token) =>
        fetch(`/api/Babysit/${babysitId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then((edit) => setBabysitToEdit(edit));
  }, []);

  const confirmBabysit = (babysit) => {
    getToken()
      .then((token) =>
        fetch(`/api/Babysit/confirm/${userProfileId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(babysit),
        })
      )
      .then(() => history.push("/babysitter/details"));
  };
  return (
    <>
      <Header as="h2">
        Are you sure you want to confirm this appointment?
      </Header>
      <Card centered>
        <Form>
          {/* <Card>
            <Card.Header>{prop.date}</Card.Header>
            <Card.Content>{prop.babyStatusId}</Card.Content>
          </Card> */}
          <Button
            type="submit"
            color="black"
            onClick={(e) => {
              e.preventDefault();
              confirmBabysit(babysitToEdit);
            }}
          >
            Confirm
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default ConfirmForm;
