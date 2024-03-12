import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../style/adminSideBar.css';

const SideBar = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="sidebar">
      Admin Side Bar
      <div className="logo">
      </div>
      <ul className="menu">
        <li>
          <Link to="/admin/Items">Items</Link>
        </li>
        <li>
          <Link to="/admin/statics">Statics</Link>
        </li>
        <li>
          <Link to="/admin/categories">Categories</Link>
        </li>
        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>
        <li>
          <Link to="/admin/Clients">Clients</Link>
        </li>
      </ul>
      <Button variant="danger" className="logout-button" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default SideBar;
