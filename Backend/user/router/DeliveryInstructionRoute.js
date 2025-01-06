const express = require('express');
const {
    getInstructionByOrderId,
    createInstruction,
    updateInstructionByOrderId,
    deleteInstructionByOrderId,
} = require('../controller/DeliveryInstructionController');

const router = express.Router();

// Routes
router.get('/:orderId', getInstructionByOrderId);
router.post('/', createInstruction);
router.put('/:orderId', updateInstructionByOrderId);
router.delete('/:orderId', deleteInstructionByOrderId);

module.exports = router;
