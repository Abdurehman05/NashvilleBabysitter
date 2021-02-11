import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Button, Header } from "semantic-ui-react";

const ParentCard = ({ parent }) => (
  <Card>
    <Image size="mini" centered src={parent.imageUrl} />
    <Header>{parent.displayName}</Header>
    <Card.Content>{parent.phone}</Card.Content>
  </Card>
);
export default ParentCard;
