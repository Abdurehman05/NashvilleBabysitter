import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Card, Button, Header, Input, Segment } from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { format } from "date-fns";

const CompleteForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const { babysitId } = useParams();
  const [babysitToComplete, setBabysitToComplete] = useState({
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
      .then((edit) => setBabysitToComplete(edit));
  }, []);

  const handleSubmit = (e) => {
    const newBabysit = { ...babysitToComplete };
    newBabysit[e.target.name] = e.target.value;
    setBabysitToComplete(newBabysit);
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
      <Card centered>
        <Header>Complete Appointment by adding babysit duration?</Header>
        <Card.Content>
          Babysitter Name: {babysitToComplete.userProfile.fullName}
        </Card.Content>
        <Card.Content>
          Date:
          <Segment>
            {format(new Date(babysitToComplete.date), "PPPPpp")}
          </Segment>
        </Card.Content>
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
