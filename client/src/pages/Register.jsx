import { useState } from "react";
import registerImg from "../../public/images/register_1.png"
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"
const defaultUser = {
  username: "",
  email: "",
  phone: "",
  password: ""
}

export const Register = () => {
  const [user,setUser] = useState(defaultUser);


  const navigate = useNavigate();
  // ! get value from store
const {storeTokenInLS} = useAuth();



  // ! handle Input Change
  const handleChange = (e) => {
    let {name,value} = e.target;
    setUser({
      ...user,
      [name]: value
    });
    
      
  }

  // ! handle Form Submit
  const handleFormSubmit =async (e) => {
    e.preventDefault();
    // toast(user);
    console.log(user);

    try {
      
// ! connection code
const response = await fetch("http://localhost:8000/api/auth/register",{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(user),
});

console.log(response);
const res_data = await response.json();
console.log('response via register',res_data);
if(response.ok){
  // const res_data = await response.json();
  // console.log('response via register',res_data);

  // ! set token in localStorage
  storeTokenInLS(res_data.token);

  setUser(defaultUser);
  toast.success("Registration Successful");
  navigate("/");
} else {
  toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
}
    } catch (error) {
      console.log(`error via register ${error}`);
      
    }
   
    
  }
    return (
      <>
      <section>
        <main>
        <div className="section-registration">
        <div className="container grid grid-two-cols">
          <div className="registration-image">
            <img src={registerImg} alt="trying to do register " width="500" height="500"/>
          </div>
          <div className="registration-form">
            <h1 className="main-heading mb-3">Registration Form</h1>
            <br />

            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input type="text" name="username"
                 placeholder="username" id="username"
                required
                autoComplete="off" 
                value={user.username}
                onChange={handleChange}
              
               />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input type="email" name="email" placeholder="enter your email" id="email"
                required
                autoComplete="off" 
                value={user.email}
                onChange={handleChange}
              
                />
              </div>

              <div>
                <label htmlFor="phone">phone</label>
                <input type="number" name="phone" placeholder="phone" id="phone"
                required
                autoComplete="off" 
                value={user.phone}
                onChange={handleChange}
                
                />
              </div>

              <div>
                <label htmlFor="password">password</label>
                <input type="password" name="password" placeholder="password" id="password"
                required
                autoComplete="off" 
                value={user.password}
                onChange={handleChange}
              
                />
              </div>

              <br />
              <button type="submit" className="btn btn-submit">Register Now</button>
            </form>
          </div>
        </div>
      </div>
        </main>
      </section>
      </>
    )
  }
  
  