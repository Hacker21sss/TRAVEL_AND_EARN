const io = require('socket.io')(5001); // Adjust the port as needed

// Function to send notification to a specific driver
const sendNotification = (driverId, message) => {
    io.to(driverId).emit('notification', message);
};

// Function to handle driver connection
const handleDriverConnection = (socket) => {
    console.log(`Driver connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Driver disconnected: ${socket.id}`);
    });
};

// Listen for driver connections
io.on('connection', handleDriverConnection);

module.exports = { sendNotification };
