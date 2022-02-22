const controllers = require("./book.controllers");
const ROUTES = require("./book.constants");
const express = require("express");
const middlewares = require("../../middlewares")

function BookRouter(app) {
  const router = express.Router();

  router
    .get(ROUTES.getBooks, middlewares.isLoggedIn, controllers.getBooks)
    .get(ROUTES.getBookById, middlewares.isLoggedIn, controllers.getBookById)
    .post(ROUTES.createBook, middlewares.isLoggedIn, controllers.createBook)
    .put(ROUTES.updateBook, middlewares.isLoggedIn, controllers.updateBook)
    .delete(ROUTES.deleteBook, middlewares.isLoggedIn, controllers.deleteBook)

  app.use("/api", router);
}

module.exports = BookRouter;
