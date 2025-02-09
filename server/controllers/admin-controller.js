const Contact = require("../models/contact-model");
const User = require("../models/user-model");


// ! get All Users 
const getAllUsers = async (req,res) => {
    try {
        const users = await User.find({},{password: 0});
        if(!users || users.length === 0){
        return res.status(404).json({msg: "No Users Found"});
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

// ! get All Contacts
const getAllContacts = async (req,res) => {
    try {
        const contacts = await Contact.find({});
        if(!contacts || contacts.length === 0){
            return res.status(404).json({msg: "No Contacts found"})
        }
        return res.status(200).json(contacts)
    } catch (error) {
        next(error);
    }
}

// ! Delete User
const deleteUserById = async (req, res) => {
    try {
        const _id  = req.params.id;
        await User.deleteOne({_id});
        res.status(200).json({msg: "User Deleted Successfully"});
    } catch (error) {
        next(error);
    }

}

// ! Update user By id
const updateUserById = async (req,res) => {
    try {
        const _id = req.params.id;
        const updateUserData = req.body;
        const updatedData = await User.updateOne({_id}, {
            $set: updateUserData,
        });
        return res.status(200).json(updatedData)
    } catch (error) {
        next(error)
    }
}

// ! get Single User Data
const getUserById = async (req,res) => {
    try {
        const _id = req.params.id;
       const data =  await User.findOne({_id},{password: 0});
        res.status(200).json(data)
    } catch (error) {
        next(error);
    }
}


// ! delete contacts by id
const deleteContactById = async (req, res) => {
    try {
      const id = req.params.id;
      await Contact.deleteOne({ _id: id });
      return res.status(200).json({ message: "Contact Deleted Successfully" });
    } catch (error) {
      next(error);
    }
  };

module.exports = {getAllUsers,getAllContacts, deleteUserById, getUserById, updateUserById,deleteContactById};