import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routers';
import router from './routes/user-routes';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);



mongoose.connect("mongodb+srv://admin:CZDG5IAQ3VDydMRp@cluster0.qpbs7qx.mongodb.net/Blog?retryWrites=true&w=majority")
.then(()=>app.listen(5000))
.then(()=>console.log("Connected to server at 5000"))
 .catch((erroe)=> console.log(erroe));
