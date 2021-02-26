import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Card, Button, Header, Input } from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import formatDate from "../utils/dateFormatter";

const CompleteForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const { babysitId } = useParams();
  const [babysitToComplete, setBabysitToEdit] = useState({
    duration: "",
    date: "",
    userProfile: "",
  });

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

  const handleSubmit = (e) => {
    const newBabysit = { ...babysitToComplete };
    newBabysit[e.target.name] = e.target.value;
    setBabysitToEdit(newBabysit);
  };

  const completeBabysit = (babysit) => {
    getToken()
      .then((token) =>
        fetch(`/api/Babysit/complete/${userProfileId}`, {
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
      <Header as="h2">Complete Appointment?</Header>
      <Card centered>
        <Card.Content>
          Babysitter: {babysitToComplete.userProfile.fullName}
        </Card.Content>
        <Card.Content>Date:{babysitToComplete.date}</Card.Content>
        <Form>
          <Form.Field>
            <Input
              placeholder="Babysit Duration in sec"
              type="text"
              id="duration"
              name="duration"
              value={babysitToComplete.duration}
              onChange={(e) => handleSubmit(e)}
            />
          </Form.Field>

          <Button
            type="submit"
            color="black"
            onClick={(e) => {
              e.preventDefault();
              completeBabysit(babysitToComplete);
            }}
          >
            Complete
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default CompleteForm;
