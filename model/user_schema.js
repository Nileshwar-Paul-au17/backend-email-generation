import mongoose from 'mongoose';

let validateEmail = function(email) {           //validating email is in proper format or not given by user
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const user_schema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        max:30
    },
    lastname:{
        type:String,
        required:true,
        max:30
    },
    phone:{
        type:Number,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        validate: [validateEmail, 'Please fill a valid email address'], //invoking the validateEmail method
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
    },
    password: {
        type: String,
        required: true,
        min:8,
        max:20
    }
})



const user = mongoose.model('user_data', user_schema); //creating the user schema in the database
export default user;