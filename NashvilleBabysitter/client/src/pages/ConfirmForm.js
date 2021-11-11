import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Button, Header, Form, Segment } from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { format } from "date-fns";

const ConfirmForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const { babysitId } = useParams();
  const [babysitToEdit, setBabysitToEdit] = useState({
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
      <Card centered color="yellow" header="Option 3">
        <Card.Content as="h2">
          Are you sure you want to confirm this appointment for{" "}
          <Segment>{format(new Date(babysitToEdit.date), "PPPPpp")}</Segment>?
        </Card.Content>

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
      </Card>
    </>
  );
};

export default ConfirmForm;
