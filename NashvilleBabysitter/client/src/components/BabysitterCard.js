import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Button, Header } from "semantic-ui-react";

const BabysitterCard = ({ babysitter }) => (
  <Card>
    <Image src={babysitter.imageUrl} />
    <Header>{babysitter.displayName}</Header>
    <Button color="black">Schedule A Babysit</Button>
  </Card>
);
export default BabysitterCard;
