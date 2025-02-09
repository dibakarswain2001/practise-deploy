import { useEffect } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Logout = () => {

  // ! get the value from store
  const {LogoutUser} = useAuth();
    useEffect(() => {
      LogoutUser();
    // toast.success("logout successfully");

    },[LogoutUser]);
   


    return <Navigate to="/login" />
  }
  
  