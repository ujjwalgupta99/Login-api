var jwt = require("jsonwebtoken");
var ResHelper = require("./response/response");

module.exports.tokenVerification = function () {
  return (req, res, next) => {
    //get header from request
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      //if header present then retrieve token
      const bearer = bearerHeader.split(" ");

      const bearerToken = bearer[1];
      req.token = bearerToken;

      jwt.verify(req.token, "secretKey", (err, authdata) => {
        if (err) {
          //if toekn not verified throw error
          ResHelper.apiResponse(res, false, "access denied", 403, {}, "");
        } else {
          //call next middleware function
          next();
        }
      });
    } else {
      //else throw error
      ResHelper.apiResponse(res, false, "access denied", 403, {}, "");
    }
  };
};
