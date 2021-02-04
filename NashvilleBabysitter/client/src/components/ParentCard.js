import React, { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
  Card,
  Button,
  Image,
  Container,
  Header,
  List,
} from "semantic-ui-react";

const ParentCard = () => {
  const [parent, setParents] = useState([]);
  const [babysitters, setBabysitters] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const currentUser = JSON.parse(localStorage.getItem("userProfile")).id;
  debugger;
  useEffect(() => {
    getToken().then((token) =>
      fetch(`/parent/${currentUser}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((parent) => {
          setParents(parent);
        })
    );
  }, []);
  return (
    <>
      <Header as="h1">Parent Dashboard</Header>
      <Container>
        <Card>
          <Image src={parent.userProfile.imageUrl} />
          <Header>{parent.userProfile.fullName}</Header>
          <Card.Content>{parent.userProfile.address}</Card.Content>
          <Card.Content>Email:{parent.userProfile.email}</Card.Content>
          <Card.Content>Phone: {parent.userProfile.phone}</Card.Content>
        </Card>
      </Container>
      <Button color="youtube">Add a Child</Button>

      {/* <Container>
        <List>
          {babysitters.map((babysitter) => {
            return <List.Item key={babysitter.id} babysitter={babysitter} />;
          })}
        </List>
      </Container> */}
    </>
  );
};
export default ParentCard;
