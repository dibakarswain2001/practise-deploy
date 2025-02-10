import { createContext, useContext, useEffect, useState } from "react";


// ! create context
export const AuthContext = createContext();


// ! Provider 
export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user,setUser] = useState("");
    const [isLoading,setIsLoading] = useState(true);
    const [services,setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;
    // ! set token in local Storage

    //  const API = "https://admin-panel01-backend.onrender.com";

    const API = "https://admin-panel01-backend.onrender.com"
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

 // * toggling login  or logout 
 let isLoggedIn = !!token;
 console.log('isLoggedIn',isLoggedIn);
 

  // ! logout Functionality
  const LogoutUser = () => {
    setToken("");
    // setUser("");
    return localStorage.removeItem("token");
  }

  // ! JWT Authentication to get currently logged in user Data
  
  const userAuthentication = async () => {
    
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/auth/user`,{
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }

      });
      if(response.ok){
        const data = await response.json();
        console.log('data auth',data.userData);
        
        setUser(data.userData);
        setIsLoading(false); 
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user Data");
      
    }
  }

// ! to fetch the services data from database
const getServices = async () => {
  try {
    const response = await fetch(`${API}/api/data/service`,{
      method: "GET",
    });

    if(response.ok){
      const data = await response.json();
      console.log('data',data.msg);
      setServices(data.msg);
      
    }
  } catch (error) {
    console.log(`services frontend error ${error}`);
    
  }
}

  useEffect(()=> {
    getServices();
    userAuthentication();
  },[])

  return (
    <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, services, authorizationToken, isLoading, API }}>
      {children}
    </AuthContext.Provider>
  );
};


// ! consumer (delivery boy)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("Component must be wrapped with Provider");
    }
    return context;
}
