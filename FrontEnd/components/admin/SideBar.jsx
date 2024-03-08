import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
      </div>
      <ul className="menu">
        <li>
          <Link to="/admin/TestComponent">Test Component</Link>
        </li>
        <li>
          <Link to="/admin/TestComponent2">Test Component2</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;