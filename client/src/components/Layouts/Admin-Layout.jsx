import { Navigate, NavLink, Outlet } from "react-router-dom"
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {

    // ! value from store
      const {user, isLoading}  = useAuth();

      
      console.log('Admin user Layout',user)
      ;
      

        if(isLoading){
            return <h1>Loading...</h1>
        }

      if(!user.isAdmin){
        return <Navigate to="/"/>
      }
      
    
  return (
<>
  <header>
    <div className="container">
        <nav>
            <ul>
                <li>
                    <NavLink to="/admin/users">Users</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/contacts">Contacts</NavLink>
                </li>
                <li>
                    <NavLink to="/service">Services</NavLink>
                </li>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
            </ul>
        </nav>
    </div>
  </header>
  <Outlet />
</>  )
}
