const jwt = require('jsonwebtoken');
const Userprofile = require('../user/model/Profile');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Userprofile.findOne({ userId: decoded.userId, 'tokens.token': token });
    if (!user) {
      throw new Error('Authentication failed');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};
