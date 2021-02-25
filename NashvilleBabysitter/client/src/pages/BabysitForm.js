import React, { useState, useContext, useEffect, Children } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Card, Button, Header, Input, Dropdown } from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";

const BabysitterForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const [date, setDate] = useState("");

  const [childId, setChildId] = useState("");

  const { babysitterId } = useParams();
  const [children, setChildren] = useState([]);

  const history = useHistory();

  const userProfileId = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const babysit = {
      date,
      childId,
      userProfileId: babysitterId,
    };

    getToken()
      .then((token) =>
        fetch(`/api/Babysit`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(babysit),
        })
      )
      .then(history.push("/parent/details"));
  };

  useEffect(() => {
    getToken().then((token) =>
      fetch(`/api/Child/getbyuser/${userProfileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((children) => {
          setChildren(children);
        })
    );
  }, []);

  return (
    <>
      <Header as="h2">Schedule an Appointment with {}</Header>
      <Card centered>
        <Form>
          <Form.Field>
            <Input
              type="datetime-local"
              id="date"
              required="required"
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              placeholder="Select your Child"
              fluid
              onChange={(e, { value }) => setChildId(value)}
              selection
              options={children.map((c) => ({
                text: c.name,
                value: c.id,
                key: c.id,
              }))}
            />
          </Form.Field>
          <Button type="submit" color="black" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default BabysitterForm;
