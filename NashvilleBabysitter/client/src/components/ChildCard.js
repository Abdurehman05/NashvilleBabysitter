import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Header } from "semantic-ui-react";

const ChildCard = ({ child }) => (
  <Card>
    <Image src={child.imageUrl} />
    <Link to={`child/detail/${child.id}`}>
      <Header>{child.name}</Header>
    </Link>
    <Card.Content>Age: {child.age}</Card.Content>
    <Card.Content>
      <strong>Note:</strong> {child.notes}
    </Card.Content>
  </Card>
);
export default ChildCard;
