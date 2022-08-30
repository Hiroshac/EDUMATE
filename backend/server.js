import exprees from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = exprees();
dotenv.config();

//mongoose connection

const connect = () => {
    try{
        mongoose.connect(process.env.MONG_URL)
                .then(()=>{ console.log('connect db')})
    }catch(err){
        throw(err);
    }
}

//error handling
app.use((err, req, res, next) => {
    const status = err.status || 5000;
    const message = err.message || "somthing went wrong";

    return res.status(status).json({
        success: false,
        message: message,
        status: status,
    });
});



//middleware


//port connecting
app.listen(5000, ()=>{
    connect();
    console.log("port is running");
})