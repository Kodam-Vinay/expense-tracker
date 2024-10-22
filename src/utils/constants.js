const jwt = require("jsonwebtoken");

const filterTransactionDetails = (transaction) => {
  return {
    id: transaction.id,
    date: transaction.date,
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category,
  };
};

const generateJwtToken = (details) => {
  const token = jwt.sign({ userDetails: details }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

const authorizeUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY || "", (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ status: false, message: "Unauthorized User" });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).send({ status: false, message: "Unauthorized User" });
  }
};

module.exports = {
  filterTransactionDetails,
  authorizeUser,
  generateJwtToken,
};
