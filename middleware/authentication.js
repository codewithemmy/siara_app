const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(400).json({ msg: `Authentication Invalid` });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the routes
    req.user = {
      userId: payload.userId,
      name: payload.name,
      phonenumber: payload.phonenumber,
    };
    next();
  } catch (error) {
    return res.status(400).json({ msg: `Authentication Invalid` });
  }
};

module.exports = auth;
