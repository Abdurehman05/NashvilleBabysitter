import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

const ChildDetail = () => {
  const [child, setChild] = useState();
  const history = useHistory();
  const { childId } = useParams();
  const { getToken } = useContext(UserProfileContext);

  const currentUser = JSON.parse(localStorage.getItem("userProfile")).id;

  useEffect(() => {
    getToken().then((token) =>
      fetch(`/babysitter/${currentUser}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((child) => {
          setChild(child);
        })
    );
  }, []);
};
export default ChildDetail;
