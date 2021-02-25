import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Image, Button, Header, CardHeader } from "semantic-ui-react";

const BabysitterCard = ({ babysitter }) => {
  const history = useHistory();

  const userProfileId = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );

  return (
    <>
      <Card>
        <Image src={babysitter.imageUrl} />
        <Header>{babysitter.displayName}</Header>
        <Card.Content>{babysitter.neighborhood.name}</Card.Content>
        <Button
          color="black"
          onClick={() => {
            history.push(`/babysit/create/${babysitter.id}`);
          }}
        >
          Schedule A Babysit
        </Button>
      </Card>
    </>
  );
};
export default BabysitterCard;
