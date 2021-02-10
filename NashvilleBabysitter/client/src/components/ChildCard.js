import React from "react";
import { Card, Image, Header } from "semantic-ui-react";

const ChildCard = ({ child }) => (
  <Card>
    <Image src={child.imageUrl} />
    <Header>{child.name}</Header>
    <Card.Content>Age: {child.age}</Card.Content>
    <Card.Content>
      <strong>Note:</strong> {child.notes}
    </Card.Content>
  </Card>
);
export default ChildCard;
