import React from "react";
import '../../font/Pacifico-Regular.ttf';
import LoginIcon from '@mui/icons-material/Login';


const UserAccountLogin = () => {
  return (
    <>
     <div className="user-login-sec">
         <ul>
            <li><a href="/login">Login<LoginIcon/></a></li>
         </ul>
       </div>
      
    </>
  );
}
export default UserAccountLogin;