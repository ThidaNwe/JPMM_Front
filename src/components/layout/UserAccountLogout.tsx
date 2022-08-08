import '../../font/Pacifico-Regular.ttf';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserAccountLogout = ({ userName } : {userName:any}) => {
  
  //console.log("user_name in useracc logout", userName);
  
  return (
    <>
      <div className="user-login-sec">
         <ul>
            <li><AccountCircleIcon sx={{ fontSize: 40 ,color:"blue"}}/></li>
          <li><span>{userName}</span></li>
            <li><a href="/Logout"><span>Logout</span><LogoutIcon/></a></li>
         </ul>
       </div>
      
    </>
  );
}
export default UserAccountLogout;