import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Image, Button } from "semantic-ui-react";
import formatDate from "../utils/dateFormatter";

const BabysitAppointment = ({ babysit }) => {
  const history = useHistory();

  const userProfileId = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );
  return (
    <Card>
      <Card.Content>
        <Image centered src={babysit.child.userProfile.imageUrl} />
        <Card.Header>{babysit.child.userProfile.fullName}</Card.Header>
        <Card.Meta>Child: {babysit.child.name} </Card.Meta>
        <Card.Content>Date: {formatDate(babysit.date)}</Card.Content>
        <Button
          color="black"
          onClick={() => {
            history.push(`/babysit/confirm/${babysit.id}`);
          }}
        >
          Confirm
        </Button>
        <Button
          color="black"
          onClick={() => {
            history.push(`/babysit/deny/${babysit.id}`);
          }}
        >
          Deny
        </Button>
      </Card.Content>
    </Card>
  );
};
export default BabysitAppointment;
