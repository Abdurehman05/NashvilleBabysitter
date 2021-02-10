import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Card, Button, Header } from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";

const ChildForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNote] = useState("");

  const userProfileId = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );

  // Use this hook to allow us to programatically redirect users
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const child = {
      imageUrl,
      name,
      age,
      notes,
      userProfileId,
    };
    getToken()
      .then((token) =>
        fetch(`/api/Child`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(child),
        })
      )
      .then(history.push("/parent/details"));
  };

  return (
    <>
      <Header as="h2">Add A Child</Header>
      <Card centered>
        <Form>
          <Form.Field>
            <input
              placeholder="Image Url"
              id="imageUrl"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Name"
              id="name"
              type="text"
              required="required"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Age"
              id="age"
              type="text"
              required="required"
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Note"
              id="note"
              type="text"
              required="required"
              onChange={(e) => setNote(e.target.value)}
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

export default ChildForm;
