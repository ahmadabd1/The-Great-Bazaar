export default function AdminMainPage() {
 const logout = () => {
   
    localStorage.removeItem('token');

 window.location.href = '/login';  };
  return (
    <div>
      <div>AdminMainPage-Ahmad</div>
      <button onClick={logout}>LogOut</button>
    </div>
  );
}
