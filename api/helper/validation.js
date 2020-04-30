const Joi = require("@hapi/joi");
var ResHelper = require("../helper/response/response");

module.exports = {
  schemas: {
    //schema for register api
    registerValidation: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
    //schema for update api
    updatevalidation: Joi.object({
      user_id: Joi.number().required(),
      password: Joi.string().required().min(8),
    }),
  },
  validationBody: (schema) => {
    return (req, res, next) => {
      //generate error through joi
      const err = schema.validate(req.body);

      if (err.error) {
        if (err.error.isJoi) {
          let errDetail = [];
          // we had a joi error, let's return a custom 400 json response
          if (err.error.details) {
            err.error.details.map(function (item) {
              var temp = {};
              temp[item.context.key] = item.message;
              errDetail.push(temp);
            });
          }

          return ResHelper.apiResponse(
            res,
            false,
            "Invalid request",
            400,
            errDetail,
            ""
          );

          // res.status(400).json({
          //   Status: false,
          //   Data: errDetail,
          //   Message: "Model InValid"
          // });
        } else {
          return ResHelper.apiResponse(
            res,
            false,
            "Error occured during execution",
            500,
            {},
            ""
          );
          // pass on to another error handler
          // res.json({
          //   Status: false,
          //   Data: {},
          //   Message: "Error Occured"
          // });
        }
        //
      }
      // call the next middleware function
      next();
    };
  },
};
