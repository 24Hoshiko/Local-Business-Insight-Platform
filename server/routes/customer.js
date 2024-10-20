const express = require('express');
const customerInfo = require('../models/customer_info');
const router = express.Router();

router.post('/signin', async (req, res) => {
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
    res.status(200).json({message: 'Login Successful! Welcome '+ user.fullname});
  } catch(error){
    res.status(500).json({error: 'Server Error.'});
  }
});

router.post('/signup', async (req, res) => {
  try {
      credentials = req.body;
      const existing_user = await customerInfo.findOne({email : credentials.email});
      if (existing_user){
        return res.status(400).json({message: 'User already exists!'})
      }

      const current_id = await customerInfo.findOne().sort({ cust_id: -1});
      credentials.cust_id = (current_id.cust_id + 1);
      console.log(req.body);

      const user = new customerInfo(credentials);
      await user.save();
      res.status(201).json({message : 'User created successfully!'});

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const user = await customerInfo.findOne({cust_id : req.params.id});
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message});
    }
});

module.exports = router;