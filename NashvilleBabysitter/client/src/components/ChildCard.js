import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Header } from "semantic-ui-react";

const ChildCard = ({ child }) => (
  <Card>
    <Card.Content>
      <Image size="mini" centered src={child.imageUrl} />
      <Header>{child.name}</Header>
      <Card.Content>Age: {child.age}</Card.Content>
      <Card.Content>Note: {child.notes}</Card.Content>
    </Card.Content>
  </Card>
);
export default ChildCard;
