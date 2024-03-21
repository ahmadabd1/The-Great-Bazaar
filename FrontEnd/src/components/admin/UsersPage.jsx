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
    <div style={{
      overflowY: 'auto',
      maxHeight: '700px',
      margin: 'auto',
      padding: '10px',
      background: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      textAlign: 'center'
    }}>
      <h1>Users</h1>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <thead>
          <tr>
            <th style={{
              backgroundColor: '#2c3e50',
              color: 'white',
              padding: '20px',
              fontSize: '18px',
              position: 'sticky',
              top: '0',
              zIndex: '10'
            }}>Full Name</th>
            <th style={{
              backgroundColor: '#2c3e50',
              color: 'white',
              padding: '20px',
              fontSize: '18px',
              position: 'sticky',
              top: '0',
              zIndex: '10'
            }}>Email</th>
            <th style={{
              backgroundColor: '#2c3e50',
              color: 'white',
              padding: '20px',
              fontSize: '18px',
              position: 'sticky',
              top: '0',
              zIndex: '10'
            }}>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} style={{
              backgroundColor: 'white',
              fontSize: '16px',
              borderBottom: '1px solid #ddd',
              transition: 'background-color 0.3s'
            }}>
              <td style={{ padding: '20px' }}>{user.fullName}</td>
              <td style={{ padding: '20px' }}>{user.email}</td>
              <td style={{ padding: '20px' }}>{user.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
