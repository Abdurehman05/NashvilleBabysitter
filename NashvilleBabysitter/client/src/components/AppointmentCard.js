import React from "react";
import { Card, Image, Button, Header } from "semantic-ui-react";

const AppointmentCard = ({ babysit }) => (
  <Card>
    <Image size="mini" centered src={babysit.child.userProfile.imageUrl} />
    <Header>{babysit.child.userProfile.displayName}</Header>
    <Card.Content>{babysit.child.userProfile.phone}</Card.Content>
    <Button color="black">Confirm</Button>
    <Button color="black">Deny</Button>
  </Card>
);
export default AppointmentCard;
