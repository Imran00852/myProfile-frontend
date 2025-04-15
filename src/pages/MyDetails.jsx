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
        <h1>Your Submission was Successful 🎉</h1>
        <p>
          <strong>{user.ticketId}</strong>
          <br />
          Please provide this number to our agent on email so that they can
          assist you further.
        </p>
      </div>
    </div>
  );
};

export default MyDetails;
