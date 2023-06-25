import encrypt from "encryptjs";
import userdatas from "../modals/usermodals.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const access_token = "jio";
    var secretkey = "kunal";
    var plaintext = password;
    var ciphertext = encrypt.encrypt(plaintext, secretkey, 256);
    const userdata = new userdatas({
      name,
      email,
      password: ciphertext,
      access_token,
    });
    await userdata.save();

    // res.json({access_token:access_token}),

    setTimeout(async () => {
      await userdatas.updateOne({ email }, { $unset: { access_token: 1 } });
    }, 1 * 60 * 1000);
    return res.send("Registration succesfull");
  } catch (err) {
    return res.send(err);
  }
};

export const regenerate = async (req, res) => {
  try {
    const { email, access_token } = req.body;

    const response = await userdatas.find({email}).exec();

    if (!response[0].access_token) {
    const newtoken = await userdatas.findOneAndUpdate({ email }, { access_token }).exec();
      console.log(newtoken);
    }
  } catch (err) {
    return res.send(err);
  }
};


export const Accessdata = async (req,res) =>
{
    try{
        const{email} = req.body

        const response = await userdatas.find({email}).exec();

        if(response[0].access_token)
        {
            return res.send("access Granted")
        }
        else{
            return res.send("regenerate token")
        }
    }
    catch(err)
    {
        return res.send(err)
    }
}