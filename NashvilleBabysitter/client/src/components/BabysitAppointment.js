import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Image, Header, Button } from "semantic-ui-react";

const BabysitAppointment = ({ babysit }) => {
  const history = useHistory();

  const userProfileId = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );
  return (
    <Card>
      <Image size="mini" centered src={babysit.child.userProfile.imageUrl} />
      <Header>{babysit.child.userProfile.name}</Header>
      <Card.Content>Date: {babysit.date}</Card.Content>
      <Card.Content>Child: {babysit.child.name}</Card.Content>
      <Button
        color="black"
        onClick={() => {
          history.push(`/babysit/confirm/${userProfileId}`);
        }}
      >
        Confirm
      </Button>
      <Button
        color="black"
        onClick={() => {
          history.push(`/babysit/deny/${userProfileId}`);
        }}
      >
        Deny
      </Button>
      <Button
        color="black"
        onClick={() => {
          history.push(`/babysit/complete/${userProfileId}`);
        }}
      >
        Complete
      </Button>
    </Card>
  );
};
export default BabysitAppointment;
