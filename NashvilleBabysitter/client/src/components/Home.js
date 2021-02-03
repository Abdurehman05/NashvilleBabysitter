import React from "react";
import { Image, Container, Header } from "semantic-ui-react";

const Home = () => {
  return (
    <>
      <Header>Welcome To Nashville Babysitter Scheduler</Header>
      <Container>
        <Image
          fluid
          src="https://images.unsplash.com/photo-1489760176169-fd3d32805239?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fGJhYnlzaXR0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        />
      </Container>
    </>
  );
};
export default Home;
