import { Link } from 'react-router-dom';
import '../style/adminSideBar.css'
const SideBar = () => {
  return (
    <div className="sidebar">
      Admin Side Bar
      <div className="logo">
      </div>
      <ul className="menu">
        <li>
          <Link to="/admin/Items">Items  </Link>
        </li>
        <li>
          <Link to="/admin/statics">Statics </Link>
        </li>
        <li>
          <Link to="/admin/categories">Categories </Link>
        </li>
        <li>
          <Link to="/admin/orders">Orders </Link>
        </li>
        <li>
          <Link to="/admin/clents">Clients </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;