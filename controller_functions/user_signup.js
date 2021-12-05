import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import user from '../model/user_schema.js';
dotenv.config()
async function user_signup(request, response){

    try {
        const exist = await user.findOne({ email: request.body.email }); //searching user is already exist in our database or not
        if (exist) {
            return response.status(401).json({ message: 'User already exist' });
        }
        const user_data = request.body;
        console.log(user_data)
        const newUser = new user(user_data);     //inserting the user details in  DB
        await newUser.save();
        mailer(user_data)
        response.status(200).json({message: 'user has been successfully registered'});
    }
    catch(error){
        response.status(401).json({error:error.message});
    }

}
function mailer(user_data){
    sgMail.setApiKey(process.env.sndgrid_api_key);
    const msg = {
      to: user_data.email,
      from: process.env.myemail, // Use the email address or domain you verified above
      subject: 'Welcome Mail',
      text: `We pleased to Welcome ${user_data.firstname}`,
      html: `<div><h1>Dear ${user_data.firstname} </h1></div>
            <p><h3>Thank You For SignUp</h3></p>
            <h4>Regards</h4>`
    };
    sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);
    
        if (error.response) {
          console.error(error.response.body)
        }
      });
}
export default user_signup;