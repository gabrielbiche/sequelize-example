import Router from "express";

import userRoutes from "./user-routes";

const routes = new Router();

routes.use(userRoutes);

export default routes;
