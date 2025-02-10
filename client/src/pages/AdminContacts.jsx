import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";
export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const {authorizationToken, API} = useAuth();
  const getContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });
      const data = await response.json();
      console.log("contactData",data);
      if(response.ok){
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // ! Defining the function deleteContactById

  const deleteContactById = async (id) => {
try {
  
  const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: authorizationToken,
    }
  });
  if(response.ok){
    getContactsData();
    toast.success("Deleted Successfully");
  } else {
    toast.error("Not Deleted");
  }
} catch (error) {
  console.log(error);
  
}
  }
  useEffect(() => {
  getContactsData();
  },[]);
  return <>
<section className="admin-contacts-section">
  <h1>Admin Contact Data</h1>

  <div className="container admin-users">
  {
  contactData.map((curContactData,index) => {
    const {_id,username, email, message} = curContactData;
    return <div key={index}>
      <p>{username}</p>
      <p>{email}</p>
      <p>{message}</p>
      <button className="btn" onClick={() => deleteContactById(_id)}>Delete</button>
    </div>
  })
}
  </div>
</section>

  </>
}
