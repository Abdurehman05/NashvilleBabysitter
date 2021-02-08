import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Button, Header } from "semantic-ui-react";

const ParentCard = ({ parent }) => (
  <Card>
    <Image avatar centered src={parent.imageUrl} />
    <Header>{parent.displayName}</Header>
    <Button color="black">Confirm</Button>
    <Button color="black">Deny</Button>
  </Card>
);
export default ParentCard;
