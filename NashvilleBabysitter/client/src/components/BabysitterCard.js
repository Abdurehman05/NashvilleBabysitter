import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Button, Header } from "semantic-ui-react";

const BabysitterCard = ({ babysitter }) => (
  <Card>
    <Card.Content>
      <Image size="tiny" centered src={babysitter.imageUrl} />
      <Header>{babysitter.displayName}</Header>
      <Button color="black">Schedule A Babysit</Button>
    </Card.Content>
  </Card>
);
export default BabysitterCard;
