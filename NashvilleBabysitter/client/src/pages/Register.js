import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css";

const Register = () => {
  const { register } = useContext(UserProfileContext);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userTypeId, setUserTypeId] = useState("");
  const [neighborhoodId, setNeighborhoodId] = useState("");

  const [userTypes, setUserType] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const profile = {
      fullName,
      address,
      displayName,
      email,
      phone,
      imageUrl,
      userTypeId,
      neighborhoodId,
    };
    register(profile, password)
      .then((user) => {
        setLoading(false);
        toast.info(`Welcome ${user.displayName}`);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Invalid email");
      });
  };

  useEffect(() => {
    fetch("/api/UserType", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserType(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/Neighborhood", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setNeighborhoods(data);
      });
  }, []);

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="avatar bg-primary">
          <img src="/babylogo.png" alt="Avatar" />
        </div>
        <h2 className="text-center">User Register</h2>
        <div className="form-group">
          <Input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="form-control"
            name="fullName"
            placeholder="Full Name"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setDisplayName(e.target.value)}
            type="text"
            className="form-control"
            name="displayName"
            placeholder="Display Name"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="Confirm Password"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="form-control"
            name="address"
            placeholder="Address"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="form-control"
            name="phone"
            placeholder="Phone"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setImageUrl(e.target.value)}
            type="url"
            className="form-control"
            name="imageUrl"
            placeholder="Image Url"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setUserTypeId(e.target.value)}
            type="select"
            className="form-control"
            name="userType"
            required="required"
          >
            <option value="0">Select User Type</option>
            {userTypes.map((ut) => (
              <option value={ut.id} key={ut.id}>
                {ut.name}
              </option>
            ))}
          </Input>
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setNeighborhoodId(e.target.value)}
            type="select"
            className="form-control"
            name="neighborhood"
            required="required"
          >
            <option value="0">Select Neighborhood</option>
            {neighborhoods.map((n) => (
              <option value={n.id} key={n.id}>
                {n.name}
              </option>
            ))}
          </Input>
        </div>
        <div className="form-group">
          <Button type="submit" block color="danger" disabled={loading}>
            Sign Up
          </Button>
        </div>
        <div className="text-center small">
          Already have an account?
          <div>
            <Link to="/login">Log in here</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
