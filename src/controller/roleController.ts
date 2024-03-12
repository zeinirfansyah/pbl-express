import { Request, Response } from "express";
import Role from "../db/models/role";

// get all data
const getAllRole = async (req: Request, res: Response): Promise<Response> => {
  try {
		// const role_datas = await Role.findAll({
		// 	where: {
		// 		active: true
		// 	}
		// });
    
		const role_datas = await Role.findAll();

		return res.status(200).send({
			status: 200,
			message: 'OK',
			data: role_datas
		});
	} catch (error: any) {
		if (error != null && error instanceof Error) {
			return res.status(500).send({
				status: 500,
				message: error.message,
				errors: error
			});
		}

		return res.status(500).send({
			status: 500,
			message: "Internal server error",
			errors: error
		});
	}
};

// get data by id
const getRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    //    ambil id
    const { id } = req.params;

    const role_data = await Role.findByPk(id);

    if (!role_data) {
      return res.status(404).send({
        status: 404,
        message: "data not found",
        data: null,
      });
    }

    return res.status(200).send({
      status: 200,
      message: `get data by id ${id} success`,
      data: role_data,
    });
    
  } catch (error: any) {
    if (error !== null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "internal server error",
      errors: error,
    });
  }
};

const createRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { roleName, active } = req.body;

    const create = await Role.create({
      roleName,
      active,
    });

    return res.status(201).send({
      status: 201,
      message: "create success",
      data: create,
    });
  } catch (error: any) {
    if (error !== null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "internal server error",
      errors: error,
    });
  }
};

const updateRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    //    ambil id
    const { id } = req.params;
    const { roleName, active } = req.body;

    const role_data = await Role.findByPk(id);

    if (!role_data) {
      return res.status(404).send({
        status: 404,
        message: "data not found",
        data: null,
      });
    }

    role_data.roleName = roleName;
    role_data.active = active;

    await role_data.save();
    return res.status(200).send({
      status: 200,
      message: "update success",
      data: role_data,
    });
  } catch (error: any) {
    if (error !== null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "internal server error",
      errors: error,
    });
  }
};

const deleteRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    //    ambil id
    const { id } = req.params;

    const role_data = await Role.findByPk(id);

    if (!role_data) {
      return res.status(404).send({
        status: 404,
        message: "data not found",
        data: null,
      });
    }

    await role_data.destroy();

    return res.status(200).send({
      status: 200,
      message: "delete success",
      data: null,
    });
  } catch (error: any) {
    if (error !== null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errors: error,
      });
    }

    return res.status(500).send({
      status: 500,
      message: "internal server error",
      errors: error,
    });
  }
};

export default {
  getAllRole,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
