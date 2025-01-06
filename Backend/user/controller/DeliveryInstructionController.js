const Instruction = require('../model/DeliveryInstruction');

// Get instructions by order ID
const getInstructionByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const instruction = await Instruction.findOne({ orderId });

        if (!instruction) {
            return res.status(404).json({ message: 'Instruction not found' });
        }

        res.status(200).json(instruction);
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

// Create a new instruction
const createInstruction = async (req, res) => {
    try {
        const { orderId, customerName, pickupLocation, handoverInstructions } = req.body;

        // Validate required fields
        if (!orderId || !customerName || !pickupLocation || !handoverInstructions) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newInstruction = new Instruction({
            orderId,
            customerName,
            pickupLocation,
            handoverInstructions,
        });

        await newInstruction.save();
        res.status(201).json({ message: 'Instruction created successfully', instruction: newInstruction });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

// Update an instruction by order ID
const updateInstructionByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updates = req.body;

        const updatedInstruction = await Instruction.findOneAndUpdate(
            { orderId },
            { $set: updates },
            { new: true }
        );

        if (!updatedInstruction) {
            return res.status(404).json({ message: 'Instruction not found' });
        }

        res.status(200).json({ message: 'Instruction updated successfully', instruction: updatedInstruction });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

// Delete an instruction by order ID
const deleteInstructionByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;

        const deletedInstruction = await Instruction.findOneAndDelete({ orderId });

        if (!deletedInstruction) {
            return res.status(404).json({ message: 'Instruction not found' });
        }

        res.status(200).json({ message: 'Instruction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

module.exports = {
    getInstructionByOrderId,
    createInstruction,
    updateInstructionByOrderId,
    deleteInstructionByOrderId,
};
