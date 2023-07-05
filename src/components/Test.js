import React, { useEffect, useState } from "react";
import axios from "axios";

function Test() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("https://89c170fc-a7cc-40aa-a896-fa864a3d9b98.mock.pstmn.io/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addUser = () => {
    axios
      .post("https://api.example.com/users", { name, email })
      .then(() => {
        getUsers();
        setName("");
        setEmail("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateUser = (userId) => {
    axios
      .put(`https://api.example.com/users/${userId}`, { name, email })
      .then(() => {
        getUsers();
        setName("");
        setEmail("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteUser = (userId) => {
    axios
      .delete(
        `https://89c170fc-a7cc-40aa-a896-fa864a3d9b98.mock.pstmn.io/${userId}`
      )
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={addUser}>Add</button>
    </div>
  );
}

export default Test;
