import { Link } from 'react-router-dom';
import "../style/ClientNavbar.css"
import axios from 'axios';
export default function ClientNavbar() {

  const logout = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        await axios.post('/user/logout', { refreshToken });
        localStorage.clear();
        window.location.href = '/';
    } catch (error) {
        console.error("Logout error:", error.response ? error.response.data : error.message);
        localStorage.clear();
        window.location.href = '/';
    }
};

  return (
    <nav className='NavBar'>
      <ul className='NavBarClient'>
      <div className="rightNav">
        <li className='client'><Link to="/client">Home</Link></li>
        <li className='categorys'><Link to="/category">Category</Link></li>
        <li className='orders'><Link to="/orders">Orders</Link></li>
        <li className='categorys'><Link to="/client/item">Item</Link></li>

        <li className='cart'><Link to="/cart">Cart</Link></li>
        <li className='profile'><Link to="/client/Profile">Profile</Link></li>

        </div>
        <li className='logout'><Link to="/logout" onClick={logout}>Logout</Link></li>
      </ul>
    </nav>
  );
}
