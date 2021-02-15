import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Card, Button, Header, Input } from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";

const CompleteForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const { babysitId } = useParams();
  const [babysitToComplete, setBabysitToEdit] = useState({});

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

  const CompleteBabysit = (babysit) => {
    getToken().then((token) => {
      fetch(`/api/Babysit/complete/${userProfileId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(babysit),
      }).then(() => history.push("/babysitter/details"));
    });
  };

  return (
    <>
      <Header as="h2">Complete Appointment?</Header>
      <Card centered>
        <Form>
          {/* <Form.Field>
            <Input
              placeholder="Babysit Duration"
              type="text"
              id="duration"
              required="required"
              onChange={(e) => setDuration(e.target.value)}
            />
          </Form.Field> */}

          <Button
            type="submit"
            color="black"
            onClick={(e) => {
              e.preventDefault();
              CompleteBabysit(babysitToComplete);
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
