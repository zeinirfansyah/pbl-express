import { Request, Response } from "express";
import User from "../db/models/user";
import responseHelper from "../helpers/responseHelper";
import passwordHelper from "../helpers/passwordHelper";

const Register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const hashed = await passwordHelper.passwordHash(password);

    const create_user = await User.create({
      name,
      email,
      password: hashed,
      active: true,
      verified: true,
      roleId: 1,

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res
      .status(201)
      .send(
        responseHelper.responseData(201, "Register success", null, create_user)
      );
  } catch (error) {
    return res
      .status(500)
      .send(responseHelper.responseData(500, "", error, null));
  }
};

// get all data
const getAllUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    // const user_datas = await User.findAll({
    // 	where: {
    // 		active: true
    // 	}
    // });

    const user_datas = await User.findAll();
    return res
      .status(201)
      .send(responseHelper.responseData(201, "Get all user", null, user_datas));
  } catch (error: any) {
    return res
      .status(500)
      .send(responseHelper.responseData(500, "", error, null));
  }
};

// get data by id
const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    //    ambil id
    const { id } = req.params;

    const user_data = await User.findByPk(id);

    return res
      .status(201)
      .send(
        responseHelper.responseData(
          201,
          `Get user by id ${id}`,
          user_data,
          null
        )
      );
  } catch (error: any) {
    return res
      .status(500)
      .send(responseHelper.responseData(500, "", error, null));
  }
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    //    ambil id
    const { id } = req.params;

    const user_data = await User.findByPk(id);

    if (!user_data) {
      return res.status(404).send({
        status: 404,
        message: "data not found",
        data: null,
      });
    }

    await user_data.destroy();

    return res
      .status(201)
      .send(responseHelper.responseData(201, "Get all user", null, null));
  } catch (error: any) {
    return res
      .status(500)
      .send(responseHelper.responseData(500, "", error, null));
  }
};

export default { Register, getAllUser, getUser, deleteUser };
