import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface RoleAttributes {
  id?: number;
  roleName?: string | null;
  active?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleInput extends Optional<RoleAttributes, "id"> {}
export interface RoleOutput extends Required<RoleAttributes> {}

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  public id!: number;
  public roleName!: string;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


Role.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    sequelize: connection,
    underscored: false,
    timestamps: true,
  }
);



export default Role;