import mongoose from 'mongoose';

const Connection = async (DB_URL) => {
    try{
        await mongoose.connect(DB_URL);
        console.log('Database Connected Succesfully')
    }
    catch(error){
        console.log("Error: ",error.message);
    }
}

export default Connection;