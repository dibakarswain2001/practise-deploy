const {connect} = require("mongoose");

const connectDB =  (uri) => {
    try {
         connect(uri);
        console.log(`DB connect successfully ${uri}`);
        
    } catch (error) {
        console.log(`error while connecting DB`);
        
    }
}

module.exports  = connectDB;