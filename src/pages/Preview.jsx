import { useDispatch, useSelector } from "react-redux";
import { FaCameraRotate } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { setCapturedImg } from "../redux/reducers/user";
import axios from "axios";
import { server } from "../constants/config";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Preview = () => {
  const { fullName, email, capturedImg } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRetake = () => {
    dispatch(setCapturedImg(""));
    navigate("/imageUpload");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait!");
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/register`,
        {
          fullName,
          email,
          capturedImg,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.msg, {
        id: toastId,
      });
      console.log(data);
      navigate("/myDetails");
    } catch (err) {
      toast.error(err.response?.data?.msg, {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Preview</h3>
        <img
          src={capturedImg}
          alt="Captured"
          style={{ width: "300px", margin: "1rem 0", borderRadius: "10px" }}
        />
        <h4>OR</h4>
        <button type="button" className="retakeBtn" onClick={handleRetake}>
          Retake <FaCameraRotate />
        </button>
        <button type="submit" className="submitBtn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Preview;
