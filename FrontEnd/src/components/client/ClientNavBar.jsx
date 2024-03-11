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
      <div className="rightNav">
        <li className='client'><Link to="/client">Home</Link></li>
        <li className='categorys'><Link to="/category">Category</Link></li>
        <li className='orders'><Link to="/orders">Orders</Link></li>
        <li className='cart'><Link to="/cart">Cart</Link></li>
        <li className='profile'><Link to="/ClientProfile">Profile</Link></li>

        </div>
        <li className='logout'><Link to="/logout" onClick={logout}>Logout</Link></li>
      </ul>
    </nav>
  );
}
