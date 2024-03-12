
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

exports.handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401); // Unauthorized

  const user = await User.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(403); // Forbidden

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) return res.sendStatus(403); // Forbidden

    // Issue a new access token
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    res.json({ accessToken });
  });
};
