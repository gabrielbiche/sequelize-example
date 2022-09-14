import db from "../models";
const Users = db.Users;

import { NotFound } from "../helpers";

export const index = async (req, res) => {
  const users = await Users.findAll();

  return res.status(200).json(users);
};

export const show = async (req, res) => {
  const { id_user } = req.params;

  const user = await Users.findOne({ where: { id: id_user } });
  if (!user) throw new NotFound("User not found.");

  return res.status(200).json(user);
};

export const store = async (req, res) => {
  const { name, email, password, age, state, city } = req.body;

  const newUser = await Users.create({
    name: name,
    email: email,
    password: password,
    age: age,
    state: state,
    city: city,
  });
  const user = await Users.findOne({ where: { id: newUser.id } });

  return res.status(201).json(user);
};

export const update = async (req, res) => {
  const { id_user } = req.params;
  const { name, email, password, age, state, city } = req.body;

  const user = await Users.findOne({ where: { id: id_user } });
  if (!user) throw new NotFound("User not found.");
  await Users.update(
    {
      name: name,
      email: email,
      password: password,
      age: age,
      state: state,
      city: city,
    },
    { where: { id: user.id } }
  );

  return res.status(204).end();
};

export const destroy = async (req, res) => {
  const { id_user } = req.params;

  const user = await Users.findOne({ where: { id: id_user } });
  if (!user) throw new NotFound("User not found.");
  await Users.destroy({ where: { id: user.id } });

  return res.status(204).end();
};

export default {
  index,
  show,
  store,
  update,
  destroy,
};
