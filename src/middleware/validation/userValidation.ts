import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import responseHelper from "../../helpers/responseHelper";
import User from "../../db/models/user";

const registrationValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required!")
    .isString()
    .withMessage("Name must be string")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email must be valid")
    .custom(async (value) => {
      const user = await User.findOne({
        where: {
          email: value,
        },
      });

      if (user) {
        throw new Error("Email already exists");
      }
 
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .notEmpty()
    .withMessage("Password is required!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required!")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }

      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send(
          responseHelper.responseData(
            400,
            "Validation failed",
            null,
            errors.array()
          )
        );
    }

    next();
  },
];

export default {
  registrationValidation,
};
