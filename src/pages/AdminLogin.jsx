import { useState } from "react";
import axios from "axios";
import { server } from "../constants/config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [secretKey, setSecretKey] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/admin/login`,
        { secretKey },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.msg);
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Enter Secret Key"
          required
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
        <button className="nextBtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
