// // controllers/userController.js
// const User1 = require("../model/User");
// const Otp = require('../model/Otp');
// const admin = require("../../config/firebaseconfig"); // Import Firebase config
// const crypto = require("crypto");
// //the otp should be generated and sent to the user's phone number

// // Generate OTP
// const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// // Send OTP to user (via Firebase or alternative SMS provider)
// exports.sendOtp = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     const otp = generateOtp();

//     // Check if user exists
//     let user = await User1.findOne({ phoneNumber });
//     if (!user) {
//       // Create new user if not exists
//       user = new User1({ phoneNumber, otp });
//     } else {
//       // Update OTP if user exists
//       user.otp = otp;
//     }

//     await user.save();

//     // Here, we would use Firebase or any SMS service to send the OTP
//     const phoneAuth = await admin.auth().createUser({ phoneNumber });
//     // Mock success response for sending OTP (replace with actual SMS sending logic in production)
//     console.log(otp);
//     res.status(200).json({ message: "OTP sent successfully", otp }); // Note: In production, don't send the OTP back

//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     res.status(500).json({ error: "Error sending OTP" });
//   }
// };

// // Verify OTP
// exports.verifyOtp = async (req, res) => {
//   try {
//     const { phoneNumber, otp } = req.body;

//     // Find user by phone number
//     const user = await User1.findOne({ phoneNumber });
//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     // Verify OTP explicitly
//     if (user.otp !== otp) {
//       return res.status(400).json({ error: "Invalid OTP" });
//     }

//     // Clear OTP directly in the database
//     await User1.updateOne({ phoneNumber }, { otp: null });

//     res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     res.status(500).json({ error: "Error verifying OTP" });
//   }
// };

// const User1 = require("../model/User");
// const axios = require("axios");
// const crypto = require("crypto");

// // Generate OTP
// const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// // Send OTP to user via RML Connect API
// exports.sendOtp = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     const otp = generateOtp();

//     // Check if user exists
//     let user = await User1.findOne({ phoneNumber });
//     if (!user) {
//       // Create new user if not exists
//       user = new User1({ phoneNumber, otp });
//     } else {
//       // Update OTP if user exists
//       user.otp = otp;
//     }

//     await user.save();

//     // SMS API URL (RML Connect)
//     const smsUrl = `http://sms6.rmlconnect.net:8080/bulksms/bulksms`;
//     const params = {
//       username: 'timestring',           // your username
//       password: 'c7*HKy)6',             // your password
//       type: 5,                          // message type (plain text)
//       dlr: 1,                           // delivery report enabled
//       destination: `+${phoneNumber}`,   // destination phone number
//       source: 'Demo',                   // source (sender's name or ID)
//       message: `Your OTP is: ${otp}`,   // OTP message
//     };

//     // Send OTP via SMS using RML Connect API
//     await axios.get(smsUrl, { params })
//       .then(response => {
        
//         console.log("OTP sent successfully via RML Connect:", response.data);
//         res.status(200).json({ message: "OTP sent successfully" });
//       })
//       .catch(error => {
//         console.error("Error sending OTP:", error);
//         res.status(500).json({ error: "Error sending OTP" });
//       });
    
//   } catch (error) {
//     console.error("Error generating OTP:", error);
//     res.status(500).json({ error: "Error generating OTP" });
//   }
// };

// // Verify OTP
// exports.verifyOtp = async (req, res) => {
//   try {
//     const { phoneNumber, otp } = req.body;

//     // Find user by phone number
//     const user = await User1.findOne({ phoneNumber });
//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     // Verify OTP explicitly
//     if (user.otp !== otp) {
//       return res.status(400).json({ error: "Invalid OTP" });
//     }

//     // Clear OTP directly in the database
//     await User1.updateOne({ phoneNumber }, { otp: null });

//     res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     res.status(500).json({ error: "Error verifying OTP" });
//   }
// };
// const User1 = require("../model/User");
// const Otp = require('../model/Otp');
// const smpp = require('smpp'); // Add the SMPP library
// const crypto = require("crypto");

// // Generate OTP
// const generateOtp = () => String(Math.floor(1000 + Math.random() * 9000)).padStart(4, "0");
// // SMPP Configuration
// const smppConfig = {
//   host: 'sms6.rmlconnect.net', // Replace with your SMPP server's host
//   port: 8080, // Replace with your SMPP server's port
//   system_id: 'timestring', // Replace with your SMPP account username
//   password: 'c7*HKy)6', // Replace with your SMPP account password
// };

// exports.sendOtp = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     const otp = generateOtp();

//     let user = await User1.findOne({ phoneNumber });
//     if (!user) {
//       user = new User1({ phoneNumber, otp });
//     } else {
//       user.otp = otp;
//     }

//     await user.save();

//     const session = smpp.connect(smppConfig);

//     session.on('connect', () => {
//       session.bind_transmitter(smppConfig, (err) => {
//         if (err) {
//           console.error('SMPP binding failed:', err);
//           res.status(500).json({ error: 'SMPP binding failed' });
//           session.close();
//           return;
//         }

//         const senderId = 'Demo';
//         const recipient = phoneNumber.replace(/^\+/, '');
//         const message =` Your OTP is: ${otp}`;

//         if (message.length > 160) {
//           res.status(400).json({ error: 'Message exceeds maximum length' });
//           session.close();
//           return;
//         }

//         session.submit_sm(
//           {
//             source_addr: senderId,
//             destination_addr: recipient,
//             short_message: message,
//             data_coding: 0, // GSM 7-bit encoding
//           },
//           (err, response) => {
//             if (err) {
//               console.error('Failed to send OTP:', err);
//               res.status(500).json({ error: 'Failed to send OTP' });
//             } else {
//               console.log('OTP sent successfully, message_id:', response.message_id);
//               res.status(200).json({ message: 'OTP sent successfully' });
//             }
//             session.close();
//           }
//         );
//       });
//     });

//     session.on('error', (err) => {
//       console.error('SMPP connection error:', err);
//       res.status(500).json({ error: 'SMPP connection error' });
//     });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ error: 'Error sending OTP' });
//   }
// };


// exports.verifyOtp = async (req, res) => {
//     try {
//       exports.sendOtp = async (req, res) => {
//         try {
//           const { phoneNumber } = req.body;
      
//           if (!phoneNumber) {
//             return res.status(400).json({ error: 'Phone number is required' });
//           }
      
//           const otp = generateOtp();
      
//           let user = await User1.findOne({ phoneNumber });
//           if (!user) {
//             user = new User1({ phoneNumber, otp });
//           } else {
//             user.otp = otp;
//           }
      
//           await user.save();
      
//           const session = smpp.connect(smppConfig);
      
//           session.on('connect', () => {
//             session.bind_transmitter(smppConfig, (err) => {
//               if (err) {
//                 console.error('SMPP binding failed:', err);
//                 res.status(500).json({ error: 'SMPP binding failed' });
//                 session.close();
//                 return;
//               }
      
//               const senderId = 'Demo'; // Sender ID
//               const recipient = phoneNumber.replace(/^\+/, ''); // Remove '+' for SMPP
//               const message = `Your OTP is: ${otp}`; // Template message
      
//               session.submit_sm(
//                 {
//                   source_addr: senderId,
//                   destination_addr: recipient,
//                   short_message: message,
//                   data_coding: 0, // GSM 7-bit encoding
//                 },
//                 (err, response) => {
//                   if (err) {
//                     console.error('Failed to send OTP:', err);
//                     res.status(500).json({ error: 'Failed to send OTP' });
//                   } else {
//                     console.log('OTP sent successfully, message_id:', response.message_id);
//                     res.status(200).json({ message: 'OTP sent successfully' });
//                   }
//                   session.close();
//                 }
//               );
//             });
//           });
      
//           session.on('error', (err) => {
//             console.error('SMPP connection error:', err);
//             res.status(500).json({ error: 'SMPP connection error' });
//           });
//         } catch (error) {
//           console.error('Error sending OTP:', error);
//           res.status(500).json({ error: 'Error sending OTP' });
//         }
//       }; const { phoneNumber, otp } = req.body;
  
//       // Find user by phone number
//       const user = await User1.findOne({ phoneNumber });
//       if (!user) {
//         return res.status(400).json({ error: "User not found" });
//       }
  
//       // Verify OTP explicitly
//       if (user.otp !== otp) {
//         return res.status(400).json({ error: "Invalid OTP" });
//       }
  
//       // Clear OTP directly in the database
//       await User1.updateOne({ phoneNumber }, { otp: null });
  
//       res.status(200).json({ message: "OTP verified successfully" });
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       res.status(500).json({ error: "Error verifying OTP" });
//     }
//   };
////////////////////////////////////////////////////////////////////
const User1 = require("../model/User");
const twilio = require("twilio"); 
require('dotenv').config();// Import Twilio SDK

// Twilio credentials
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// Send OTP to user via Twilio SMS
exports.sendOtp = async (req, res) => {
  try {
    // Check if Twilio credentials are available inside the route handler
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      console.error("Twilio credentials are missing.");
      return res.status(500).json({ error: "Twilio credentials are not configured correctly" });
    }

    // Initialize Twilio client
    const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const { phoneNumber } = req.body;

    // Ensure the phone number is in E.164 format (e.g., +1234567890)
    if (!phoneNumber.startsWith("+")) {
      return res.status(400).json({ error: "Phone number must be in international format (+<country_code><number>)" });
    }

    const otp = generateOtp();

    // Check if user exists
    let user = await User1.findOne({ phoneNumber });
    if (!user) {
      // Create new user if not exists
      user = new User1({ phoneNumber, otp });
    } else {
      // Update OTP if user exists
      user.otp = otp;
    }

    await user.save();

    // Send OTP via Twilio SMS
    client.messages
      .create({
        body: `Your OTP is: ${otp}`, // OTP message body
        to: phoneNumber, // Recipient's phone number in E.164 format
        from: TWILIO_PHONE_NUMBER, // Your Twilio phone number
      })
      .then((message) => {
        console.log("OTP sent successfully:", message.sid);
        res.status(200).json({ message: "OTP sent successfully" });
      })
      .catch((error) => {
        console.error("Error sending OTP with Twilio:", error);
        res.status(500).json({ error: "Error sending OTP" });
      });

  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Error sending OTP" });
  }
};
exports.verifyOtp = async (req, res) => {
    try {
      const { phoneNumber, otp } = req.body;
  
      // Find user by phone number
      const user = await User1.findOne({ phoneNumber });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
  
      // Verify OTP explicitly
      if (user.otp !== otp) {
        return res.status(400).json({ error: "Invalid OTP" });
      }
  
      // Clear OTP directly in the database
      await User1.updateOne({ phoneNumber }, { otp: null });
  
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Error verifying OTP" });
    }
   };
