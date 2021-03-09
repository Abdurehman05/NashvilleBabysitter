import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Button, Header, Form } from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";

const DenyForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const { babysitId } = useParams();
  const [babysitToEdit, setBabysitToEdit] = useState({
    date: "",
  });

  const userProfileId = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );

  const history = useHistory();
  useEffect(() => {
    return getToken()
      .then((token) =>
        fetch(`/api/Babysit/${babysitId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then((edit) => setBabysitToEdit(edit));
  }, []);

  const denyBabysit = (babysit) => {
    getToken()
      .then((token) =>
        fetch(`/api/Babysit/deny/${userProfileId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(babysit),
        })
      )
      .then(() => history.push("/babysitter/details"));
  };
  return (
    <>
      <Card color="red" centered>
        <Card.Content as="h2">
          Are you sure you want to deny this appointment {babysitToEdit.date} ?
        </Card.Content>
        <Form>
          <Button
            type="submit"
            color="black"
            onClick={(e) => {
              e.preventDefault();
              denyBabysit(babysitToEdit);
            }}
          >
            Deny
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default DenyForm;
