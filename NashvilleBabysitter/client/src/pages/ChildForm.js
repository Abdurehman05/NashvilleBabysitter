import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import {
  Form,
  FormGroup,
  Card,
  Label,
  Input,
  Button,
  Checkbox,
  Header,
} from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";

const ChildForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [note, setNote] = useState("");
  const [userProfileId, setUserProfileId] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("userProfile")).id;

  // Use this hook to allow us to programatically redirect users
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const child = {
      imageUrl,
      name,
      age,
      note,
      userProfileId,
    };

    getToken().then((token) =>
      fetch(`/api/Child/${userProfileId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(child),
      }).then((c) => {
        history.push("/parent/:parentId");
      })
    );
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
          <Form.Field>
            <input
              id="userProfileId"
              type="hidden"
              onChange={(e) => setUserProfileId(e.target.value)}
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
