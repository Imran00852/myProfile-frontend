import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../constants/config";

const MyDetails = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`${server}/my`, { withCredentials: true })
      .then(({ data }) => setUser(data.user))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="details-container">
      <div className="card">
        <h1 style={{ marginBottom: "1.5rem", color: "#333" }}>Your Profile</h1>
        <img src={user.capturedImg} alt="User" className="user-img" />
        <h2>{user.fullName}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default MyDetails;
