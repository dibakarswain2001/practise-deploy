import { useState } from "react";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"
const defaultForm = {
  username:"",
  email:"",
  message:""
}
export const Contact = () => {
  const [contact,setContact] = useState(defaultForm);

const [userData,setUserData] = useState(true);

  // ! get the data fro store
  const {user}  = useAuth();



  if(userData && user){
    setContact({
      username: user.username,
      email: user.email,
      message:"",
    });

    setUserData(false);
  }
  // ! handle Input
  const handleInput = (e) => {
    let {name,value} = e.target;
    setContact({
      ...contact,
      [name]: value
    })

  }
  // ! handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contact);

 try {
  const response = await fetch("http://localhost:8000/api/form/contact",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contact)
  });

  if(response.ok){
    setContact(defaultForm);
    const data = await response.json();
    console.log('data -> contact',data);
    toast.success("Message successfully sent");
    
    
  } else {
    toast.error("Failed to send Message")
  }
 } catch (error) {
  alert("Message not sent");
  console.error(error);
  
 }




    
  }
    return (
      <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">contact us</h1>
      </div>
      <div className="container grid grid-two-cols">
        <div className="contact-img">
          <img src="/images/contactus.png" alt="we are always ready to help" /></div>
  
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="">username</label>
                <input type="text" name="username" id="username"
                value={contact.username}
                onChange={handleInput} autoComplete="off" required />
              </div>
  
              <div>
                <label htmlFor="">email</label>
                <input type="email" name="email" id="email" au
                value={contact.email}
                onChange={handleInput}toComplete="off" required />
              </div>
  
              <div>
                <label htmlFor="message">message</label>
                <textarea name="message" id="message" 
                value={contact.message}
                onChange={handleInput}
                autoComplete="off"
                required
                cols="30" rows="10"></textarea>
              </div>
  
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
      </div>
  
      <section className="mb-3">
  
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13276.965125479528!2d84.73442083535136!3d19.484210125686964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d4d3a65a3490d%3A0xfe811e0ed1336f93!2sScience%20College%20Hinjilicut%20(Autonomous)!5e1!3m2!1sen!2sin!4v1730108706521!5m2!1sen!2sin" 
  width="100%"
  height="450"
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"></iframe>
   </section>
    </section>
    )
  }
  
  