require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const app = express();
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 3000


// ! CORS policy
const corsOptions = {
    origin: "https://admin-panel01-frontend.onrender.com",
    methods: ["GET","PUT","POST","PATCH","DELETE","HEAD"],
    credentials: true
}
app.use(cors(corsOptions));
// ! body parser (optional we use simple)
// app.use(bodyParser.json())
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);
app.use("/api/admin",adminRoute);




app.use(errorMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.DB);
        app.listen(PORT,() => {
            console.log("server is running at PORT",PORT);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}
start();
