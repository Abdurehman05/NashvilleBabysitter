import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Button, Header, Form } from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";

const ConfirmForm = () => {
  const { getToken } = useContext(UserProfileContext);
  const { id } = useParams();
  const [babysitToEdit, setBabysitToEdit] = useState({});
  const userProfileId = parseInt(
    JSON.parse(localStorage.getItem("userProfile")).id
  );

  const history = useHistory();

  useEffect(() => {
    getToken()
      .then((token) =>
        fetch(`/api/Babysit/getbybabysitter/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then((edit) => setBabysitToEdit(edit.babysit));
  }, []);

  //   const handleSubmit = (e) => {
  //     const newBabysit = { ...babysitToEdit };
  //     newBabysit[e.target.name] = e.target.value;
  //     setBabysitToEdit(newBabysit);
  //   };

  const updateBabysit = (babysit) => {
    getToken()
      .then((token) =>
        fetch(`/api/Babysit/confirm/${userProfileId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(babysit),
        })
      )
      .then(history.push("/parent/details"));
  };
  return (
    <>
      <Header as="h2">
        Are you sure you want to confirm this appointment?
      </Header>
      <Card centered>
        <Form>
          <Button
            type="submit"
            color="black"
            onClick={(e) => {
              e.preventDefault();
              updateBabysit(babysitToEdit);
            }}
          >
            Confirm
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default ConfirmForm;
