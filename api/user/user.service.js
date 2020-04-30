var ResHelper = require("../helper/response/response");
var jwt = require("jsonwebtoken");

exports.getStudents = async (req, res) => {
  try {
    let dataStudent = await knexSqlDb("student_details").select(["*"]);
    if (dataStudent) {
      ResHelper.apiResponse(res, true, "Success", 200, dataStudent, "");
    } else {
      ResHelper.apiResponse(res, true, "No data available", 204, {}, "");
    }
  } catch (e) {
    ResHelper.apiResponse(
      res,
      false,
      "Error occured during execution",
      500,
      {},
      ""
    );
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let dataStudent = await knexSqlDb("student_details")
      .select(["*"])
      .where({ email: email });
    if (dataStudent[0]) {
      if (password == dataStudent[0].password) {
        jwt.sign(
          { dataStudent },
          "secretKey",
          { expiresIn: "2h" },
          (err, token) => {
            if (err) {
              ResHelper.apiResponse(
                res,
                false,
                "Error occured during execution",
                500,
                {},
                ""
              );
            } else
              ResHelper.apiResponse(
                res,
                true,
                "Success",
                200,
                dataStudent,
                token
              );
          }
        );
      } else {
        ResHelper.apiResponse(res, false, "incorrect password", 401, {}, "");
      }
    } else {
      ResHelper.apiResponse(res, false, "email not found", 400, {}, "");
    }
  } catch (e) {
    ResHelper.apiResponse(
      res,
      false,
      "Error occured during execution",
      500,
      {},
      ""
    );
  }
};

exports.getStudentsID = async (req, res) => {
  try {
    let dataStudent = await knexSqlDb("student_details")
      .select(["*"])
      .where({ id: req.body.id });
    if (dataStudent[0]) {
      ResHelper.apiResponse(res, true, "Success", 200, dataStudent[0], "");
    } else {
      ResHelper.apiResponse(res, true, "No data available", 204, {}, "");
    }
  } catch (e) {
    ResHelper.apiResponse(
      res,
      false,
      "Error occured during execution",
      500,
      {},
      ""
    );
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    let dataStudent = await knexSqlDb("student_details").insert([
      {
        email: email,
        name: name,
        password: password,
      },
    ]);
    let data = {
      id: dataStudent[0],
    };
    ResHelper.apiResponse(res, true, "success", 200, data, req.token);
  } catch (e) {
    ResHelper.apiResponse(
      res,
      false,
      "Error occured during execution",
      500,
      {},
      req.token
    );
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user_id, password } = req.body;
    let dataStudent = await knexSqlDb("student_details")
      .where({ id: user_id })
      .update({
        password: password,
      });
    if (dataStudent) {
      let dataStudent = await knexSqlDb("student_details")
        .where({ id: user_id })
        .select(["*"]);

      ResHelper.apiResponse(
        res,
        true,
        "success",
        200,
        dataStudent[0],
        req.token
      );
    } else {
      ResHelper.apiResponse(
        res,
        false,
        "no user id available",
        400,
        {},
        req.token
      );
    }
  } catch (e) {
    ResHelper.apiResponse(
      res,
      false,
      "Error occured during execution",
      500,
      {},
      req.token
    );
  }
};
