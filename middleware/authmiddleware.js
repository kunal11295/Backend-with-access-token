import encrypt from "encryptjs";
import userdatas from '../modals/usermodals.js'



export const registration = async (req,res,next) => {
    try{
        const {name,email,password} = req.body
        if(!name) return res.send("Name is Required");
        if(!email) return res.send("email is Required");
        if(!password) return res.send("password is Required");

        if(password.length < 8)
        {
            return res.send("password should be atleast 8 character")
        }
       const response = await userdatas.find({email:email}).exec();
       if(response.length)
       {
        return res.send("email is registered");
       }
       next();
    }
    catch(err)
    {
        return res.send(err);
    }
}
