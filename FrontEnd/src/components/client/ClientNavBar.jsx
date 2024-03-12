import { Link } from 'react-router-dom';
import "../style/ClientNavbar.css"

export default function ClientNavbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav className='NavBar'>
      <ul className='NavBarClient'>
        <div className="leftNav">
          <li className='client'><Link to="/client">Home</Link></li>
          <li className='categorys'><Link to="/category">Category</Link></li>
          <li className='orders'><Link to="/orders">Orders</Link></li>
          <li className='categorys'><Link to="/client/item">Items</Link></li>
          <li className='cart'><Link to="/cart">Cart</Link></li>
          <li className='profile'><Link to="/client/Profile">Profile</Link></li>
        </div>
        <div className="rightNav">
          <li className='logout'><Link to="/logout" onClick={logout}>Logout</Link></li>
        </div>
      </ul>
    </nav>
  );
}
