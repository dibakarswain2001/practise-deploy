const {Schema,model} = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// ! create a Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: new Date()
    }

});

// ! secure the password with bcrypt
userSchema.pre("save", async function(next){
    // console.log(`this-->`,this);
    const user =  this;

    if(!user.isModified("password")){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password = hash_password;
        
    } catch (error) {
        next(error);
    }
    
});

// ! compare the password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

// ! generate JWT token
userSchema.methods.generateToken = async function(){

    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: "30d"
    }
);
    } catch (error) {
        console.error(`error`,error);
        
    }

}

//  ! create a model
const User = new model("User",userSchema);

module.exports = User;