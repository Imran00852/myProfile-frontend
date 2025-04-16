import { useCallback, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { server } from "../constants/config";
import debounce from "lodash/debounce";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = useCallback(
    debounce(async (e) => {
      const value = e.target.value;
      setSearch(value);

      if (!value.trim()) {
        setFilteredUsers(users);
        return;
      }

      try {
        const { data } = await axios.get(`${server}/admin/search`, {
          params: {
            ticketId: value,
            fullName: value,
            email: value,
          },
        });
        console.log(data);
        setFilteredUsers(data.users);
      } catch (err) {
        console.log(err);
        setFilteredUsers([]);
      }
    }, 500),
    [users]
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleClose = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    axios
      .get(`${server}/admin/users`)
      .then(({ data }) => {
        setUsers(data.users);
        setFilteredUsers(data.users);
      })

      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="admin-container">
      <input
        type="text"
        placeholder="Search by name, email, or ticket ID..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value); // update instantly
          handleSearch(e); // trigger debounce
        }}
        className="search-bar"
      />

      <ul className={`user-list ${selectedUser ? "blurred" : ""}`}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user._id} onClick={() => handleUserClick(user)}>
              {user.fullName}
            </li>
          ))
        ) : (
          <li className="no-users">No users found</li>
        )}
      </ul>

      {selectedUser && (
        <div className="modal-overlay">
          <div className="user-card modal">
            <button className="close-btn" onClick={handleClose}>
              <ImCross size={20} />
            </button>
            <img src={selectedUser.capturedImg} alt={selectedUser.fullName} />
            <h3>{selectedUser.fullName}</h3>
            <p>{selectedUser.email}</p>
            <p>
              <strong>Ticket ID:</strong> #{selectedUser.ticketId}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
