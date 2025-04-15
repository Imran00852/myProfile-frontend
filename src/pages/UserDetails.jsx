import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setFullName } from "../redux/reducers/user";

const UserDetails = () => {
  const { fullName, email } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => {
    if (!fullName.trim() || !email.trim()) {
      alert("Full name and Email are required!");
      return;
    }

    // Full name should not contain numbers
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullName)) {
      alert("Full name should only contain letters and spaces.");
      return;
    }

    // email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    navigate("/imageUpload");
  };

  return (
    <div className="form-container">
      <form>
        <h2>Enter your details</h2>
        <input
          type="text"
          placeholder="Your Full name"
          required
          value={fullName}
          onChange={(e) => dispatch(setFullName(e.target.value))}
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <button className="nextBtn" type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
};

export default UserDetails;
