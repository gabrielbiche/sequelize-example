import { Router } from "express";

import userController from "../controllers/user-controller";

const routes = Router();

routes.get("/users", userController.index);
routes.get("/users/:id_user", userController.show);
routes.post("/users", userController.store);
routes.patch("/users/:id_user", userController.update);
routes.delete("/users/:id_user", userController.destroy);

export default routes;
