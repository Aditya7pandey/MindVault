import app from "./build/app.js";
import connectDb from "./build/db/db.js";
import dotenv from 'dotenv'

dotenv.config();

const port = process.env.PORT;

connectDb();

app.listen(port,()=>{
    console.log(`Server is running in ${port}`);
})