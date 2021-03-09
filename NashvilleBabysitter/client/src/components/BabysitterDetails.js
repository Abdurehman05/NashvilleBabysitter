import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import BabysitCompleteCard from "./BabysitCompleteCard";
import BabysitAppointment from "./BabysitAppointment";
import { UserProfileContext } from "../providers/UserProfileProvider";
import formatDate from "../utils/dateFormatter";
import {
  Card,
  Button,
  Image,
  Container,
  Header,
  Grid,
  Table,
} from "semantic-ui-react";

const BabysitterDetails = () => {
  const [data, setBabysitter] = useState();
  const [parents, setParents] = useState([]);
  const [babysits, setBabysits] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const currentUser = JSON.parse(localStorage.getItem("userProfile")).id;

  const history = useHistory();

  useEffect(() => {
    getToken().then((token) =>
      fetch(`/babysitter/${currentUser}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBabysitter(data);
          setParents(parents);
          setBabysits(babysits);
        })
    );
  }, []);

  if (!data) {
    return null;
  }
  return (
    <>
      <Container>
        <Grid celled="internally">
          <Grid.Row>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Image src={data.babysitter.imageUrl} />
                  <Header>{data.babysitter.displayName}</Header>
                  <Card.Content>
                    <strong>Neighborhood: </strong>
                    {data.babysitter.neighborhood.name}
                  </Card.Content>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h2">Confirm Appointments</Header>
              <Card.Group centered itemsPerRow={2}>
                {data.pendingBabysits.map((babysit) => {
                  return (
                    <BabysitAppointment key={babysit.id} babysit={babysit} />
                  );
                })}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Header as="h2">Appointments</Header>
            {data.babysits.map((babysit) => {
              return <BabysitCompleteCard key={babysit.id} babysit={babysit} />;
            })}
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};
export default BabysitterDetails;
