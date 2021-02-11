import React, { useState, useContext, useEffect, Children } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Card, Button, Header, Input } from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";

const CompleteForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [babysitToEdit, setBabysitToEdit] = useState({});
  const [duration, setDuration] = useState("");
  const userProfileId = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );

  const history = useHistory();

  useEffect(() => {
    getToken()
      .then((token) =>
        fetch(`/api/Babysit/getbybabysitter/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then((edit) => setBabysitToEdit(edit.babysit));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const babysit = {
      duration,
    };
  };

  const updateBabysit = (babysit) => {
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
      .then(history.push("/parent/details"));
  };

  return (
    <>
      <Header as="h2">Complete Appointment</Header>
      <Card centered>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input
              placeholder="Babysit Duration"
              type="text"
              id="duration"
              required="required"
              onChange={(e) => setDuration(e.target.value)}
            />
          </Form.Field>

          <Button
            type="submit"
            color="black"
            onClick={(e) => {
              e.preventDefault();
              updateBabysit(babysitToEdit);
            }}
          >
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default CompleteForm;
