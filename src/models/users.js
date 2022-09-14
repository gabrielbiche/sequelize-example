"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}
  }
  Users.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Please enter the name" },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Please enter the email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Please enter the password" },
          len: {
            args: [6, 20],
            msg: "password must contain at least 6 characters  and a maximum of 50",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Please enter the age" },
        },
      },
      state: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Please enter the state" },
        },
      },
      city: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Please enter the city" },
        },
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
