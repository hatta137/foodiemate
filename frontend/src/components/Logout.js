import {useSignOut} from "react-auth-kit";
import {useNavigate} from "react-router-dom";




const Logout = () => {
    const signOut = useSignOut();
    const navigate = useNavigate()
    signOut();
    navigate("/login");

}

export default Logout;