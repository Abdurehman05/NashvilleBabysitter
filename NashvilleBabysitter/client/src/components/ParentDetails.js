import React, { useEffect, useState, useContext } from "react";
import BabysitterCard from "./BabysitterCard";
import { useHistory } from "react-router-dom";
import BabysitCard from "./BabysitCard";
import ChildCard from "./ChildCard";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
  Card,
  Button,
  Image,
  Container,
  Header,
  Grid,
} from "semantic-ui-react";

const ParentDetails = () => {
  const [parent, setParent] = useState();
  const [children, setChildren] = useState([]);
  const [babysitters, setBabysitters] = useState([]);
  const [babysits, setBabysits] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const currentUser = JSON.parse(localStorage.getItem("userProfile")).id;

  const history = useHistory();

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
          setParent(parent);
          setChildren(children);
          setBabysitters(babysitters);
          setBabysits(babysits);
        })
    );
  }, []);

  if (!parent) {
    return null;
  }
  return (
    <>
      <Container>
        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={4}>
              <Card>
                <Image src={parent.userProfile.imageUrl} />
                <Header>{parent.userProfile.fullName}</Header>
                <Card.Content>{parent.userProfile.address}</Card.Content>
                <Card.Content>Email:{parent.userProfile.email}</Card.Content>
                <Card.Content>Phone: {parent.userProfile.phone}</Card.Content>
              </Card>
              <Button
                color="black"
                onClick={() => {
                  history.push("/child/create");
                }}
              >
                Add a Child
              </Button>
            </Grid.Column>

            <Grid.Column width={8}>
              <Header as="h2">Children</Header>
              <Card.Group itemsPerRow={3}>
                {parent.children.map((child) => {
                  return <ChildCard key={child.id} child={child} />;
                })}
              </Card.Group>
            </Grid.Column>

            <Grid.Column width={4}>
              <Header as="h2">Babysitters Near me</Header>
              {parent.babysitters.map((babysitter) => {
                return (
                  <BabysitterCard key={babysitter.id} babysitter={babysitter} />
                );
              })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Header as="h2">Upcoming Babysits Schedule</Header>
            {parent.babysits.map((babysit) => {
              return <BabysitCard key={babysit.id} babysit={babysit} />;
            })}
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};
export default ParentDetails;
