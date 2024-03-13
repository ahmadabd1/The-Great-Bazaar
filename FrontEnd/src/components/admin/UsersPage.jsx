import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8080/user/users');
    console.log(response.data[0]); 
    const filteredUsers = response.data.filter(user => user.email !== 'admin');
    setUsers(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};


    fetchUsers();
  }, []);

  return (
    <div className="page content container text-center" style={{ marginTop: "150px" }}>
      <h1>Users</h1>
      <div className="relative mt-12">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user, index) => (
            <li key={index} className="space-y-3 rounded-lg border bg-white p-4" style={{ height: '200px', width: '200px' }}>
              <div className="text-center">
                {/* User content here */}
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Name: {user.fullName}</h4>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phoneNumber}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersPage;
