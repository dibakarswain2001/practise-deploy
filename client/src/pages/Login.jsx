import { useState } from "react";
import lock from "../../public/images/lock_2.png"
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"
const defaultUser = {
  email: "",
  password: ""
}

const URL = "http://localhost:8000/api/auth/login";
export const Login = () => {
  const [user,setUser] = useState(defaultUser);

const navigate = useNavigate();

// ! get value from store
const {storeTokenInLS} = useAuth();

  // ! handle Input
  const handleInput = (e) => {
    let {name,value} = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  // ! handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);


    try {
      const response = await fetch(URL,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
      });

      console.log('response via login',response);
      
      const res_data = await response.json();
      console.log('res_data--> login',res_data);
      
      
      if(response.ok){

        // ! store token in LocalStorage
        storeTokenInLS(res_data.token);
        toast.success("login Successful");
        setUser(defaultUser);
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails: res_data.message);
        toast.error('Invalid Credentials');
      }
    } catch (error) {
      
    }
   
    
    
  }
    return (
      <>
      <section>
    <main>
      <div className="section-registration">
        <div className="container grid grid-two-cols">
          <div className="registration-image">
            <img src={lock} alt="lets fill the login Form " width="500" height="500"/>
          </div>
          <div className="registration-form">
            <h1 className="main-heading mb-3">Login Form</h1>
            <br />

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">email</label>
                <input type="email" name="email" placeholder="enter your email" id="email"
                required
                autoComplete="off" 
                value={user.email}
                onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="password">password</label>
                <input type="password" name="password" placeholder="password" id="password"
                required
                autoComplete="off" 
                value={user.password}
                onChange={handleInput}/>
              </div>

              <br />
              <button type="submit" className="btn btn-submit">Login Now</button>
            </form>
          </div>
        </div>
      </div>
    </main>
   </section>
      </>
    )
  }
  
  