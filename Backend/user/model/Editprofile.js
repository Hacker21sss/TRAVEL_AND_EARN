const mongoose = require('mongoose');

const editProfileSchema = new mongoose.Schema({
    UserId:{type:String,required:true}, 
    ProfilePicture:{type:String,default:''},
    firstname: { type: String,  }, // Experience in years
    lastname: { type: String,  }, // Speaking skills description
    email: { type: String, }, // Alternative phone number
    phoneNumber: { type: String, },
    accountNumber:{type:String},
    accountName:{type:String},

    ifscCode:{type:String},
    bankName:{type:String},
    branch:{type:String} // City or village name
    
});

module.exports = mongoose.model('EditProfile', editProfileSchema);