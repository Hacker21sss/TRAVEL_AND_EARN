const Bank = require('../model/Editprofile');
// const driver=require('../Model/Bank')

const path = require('path');

// Multer setup for file upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/passbook'); // Directory where passbook pictures will be stored
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Filename with a timestamp to avoid duplicates
//     }
// });

// Filter to accept only image files (JPEG, PNG)
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Only images are allowed'));
//     }
// };

// Configure multer middleware
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
//     fileFilter: fileFilter
// }).single('passbookPicture'); // Expect a file with field name 'passbookPicture'

/**
 * Create new bank details with passbook picture
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const createBankDetails = async (req, res) => {
    // upload(req, res, async (err) => {
    //   if (err) {
    //     return res.status(400).json({ message: err.message });
    //   }
  
      try {
        const { driverId } = req.params;
  
        if (!driverId) {
          return res.status(400).json({ message: 'Driver ID is required' });
        }
  
        const { accountHolderName, accountNumber, confirmAccountNumber, bankName, ifscCode } = req.body;
  
        if (!accountHolderName || !accountNumber || !confirmAccountNumber || !bankName || !ifscCode) {
          return res.status(400).json({ message: 'All required fields must be provided' });
        }
  
        const passbookPicture = req.file ? req.file.path : null;
  
        const newBank = new Bank({
          driverId,
          accountHolderName,
          accountNumber,
          confirmAccountNumber,
          bankName,
          ifscCode,
          
        });
  
        await newBank.save();
  
        res.status(201).json({ message: 'Bank details saved successfully', bank: newBank });
      } catch (error) {
        console.error('Error saving bank details:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
      }
    
  
  
  
  
/**
 * Get bank details for a specific driver
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getBankDetails = async (req, res) => {
    try {
        // Extract driver ID from request parameters
        const { driverId } = req.params;

        if (!driverId) {
            return res.status(400).json({ message: 'Driver ID is required' });
        }

        // Fetch bank details for the specified driver
        const bankDetails = await Bank.find({ driverId });
        
        if (bankDetails.length === 0) {
            return res.status(404).json({ message: 'No bank details found for this driver' });
        }

        res.status(200).json(bankDetails);
    } catch (error) {
        console.error('Error fetching bank details:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
}

module.exports = { createBankDetails, getBankDetails };