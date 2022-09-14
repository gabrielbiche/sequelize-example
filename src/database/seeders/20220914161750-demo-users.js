"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        name: "Ciclano",
        email: "ciclano@email.com",
        password: "1234567",
        age: 18,
        state: "São Paulo",
        city: "São Paulo",
      },
      {
        name: "Beltrano",
        email: "beltrano@email.com",
        password: "1234567",
        age: 18,
        state: "São Paulo",
        city: "São Paulo",
      },
    ],
    {}
  );
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Users", null, {});
}
