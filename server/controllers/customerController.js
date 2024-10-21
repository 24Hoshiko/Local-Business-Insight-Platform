const customerInfo = require('../models/customerModel');

const signInCustomer = async (req, res) => {
    try{
      const user =  await customerInfo.findOne({ email: req.body.email });
      if(!user){
        console.log("No such user exists!");
        return res.status(401).json({message: "No such user exists!"});
      }
      if(user.password != req.body.password){
        console.log('Invalid password');
        return res.status(401).json({message: "Invalid password!"});
      }
      console.log('Welcome '+ user.fullname);
      res.status(200).json({user: user, message: 'Login Successful! Welcome '+ user.fullname});
    } catch(error){
      res.status(500).json({error: 'Server Error.'});
    }
};

const signUpCustomer =  async (req, res) => {
    try {
        const credentials = { ...req.body };
  
        const existing_user = await customerInfo.findOne({email : credentials.email});
        if (existing_user){
          return res.status(400).json({message: 'User already exists!'})
        }
  
        const current_id = await customerInfo.findOne().sort({ cust_id: -1});
        if(current_id){
            credentials.cust_id = (current_id.cust_id + 1);
        }
        else{
            credentials.cust_id = 101;
        }
  
        const user = new customerInfo(credentials);
        await user.save();
        res.status(201).json({user: user, message : 'User created successfully!'})
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

const getCustomerById = async (req, res) => {
    try {
      const user = await customerInfo.findOne({cust_id : req.params.id});
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message});
    }
};

module.exports = { signInCustomer, signUpCustomer, getCustomerById };