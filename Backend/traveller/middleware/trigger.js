const updateEarnings = require('../../traveller/middleware/earn');


// Order Success Handler
app.post('/order/success', async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Trigger earnings update
    await updateEarnings(userId, amount, { rides: amount });

    res.status(200).json({ message: 'Order processed and earnings updated!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
