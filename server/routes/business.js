const express = require('express');
const businessInfo = require('../models/business_info');
const router = express.Router();

router.post('/signin', async (req, res) => {
    try{
      const user =  await businessInfo.findOne({ email: req.body.email });
      if(!user){
        console.log("No such owner exists!");
        return res.status(401).json({message: "No such user exists!"});
      }
      if(user.password != req.body.password){
        console.log('Invalid password');
        return res.status(401).json({message: "Invalid password!"});
      }
      console.log('Welcome '+ user.fullname);
      res.status(200).json({message: 'Login Successful! Welcome '+ user.business_name});
    } catch(error){
      res.status(500).json({error: 'Server Error.'});
    }
});

router.post('/signup', async (req, res) => {
    try {
        credentials = req.body;
        const existing_email = await businessInfo.findOne({email : credentials.email});
        if (existing_email){
          return res.status(400).json({message: 'User with this email already exists!'})
        }
        existing_contact = await businessInfo.findOne({contact : credentials.contact});
        if (existing_contact){
          return res.status(400).json({message: 'User with contact number already exists!'})
        }
  
        const current_id = await businessInfo.findOne().sort({ business_id: -1});
        if(current_id){
            credentials.business_id = (current_id.business_id + 1);
        }
        else{
            credentials.business_id = 101;
        }
        console.log(req.body);
        console.log(credentials)
        const user = new businessInfo(credentials);
        await user.save();
        res.status(201).json({message : 'User created successfully!'});
  
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

router.get('/:id', async (req, res) => {
    try {
      const user = await businessInfo.findOne({business_id : req.params.id});
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message});
    }
});

module.exports = router;