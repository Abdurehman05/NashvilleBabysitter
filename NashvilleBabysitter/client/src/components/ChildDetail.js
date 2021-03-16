import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const ChildDetail = () => {
  const [child, setChild] = useState();
  const history = useHistory();
  const { childId } = useParams();
};
export default ChildDetail;
