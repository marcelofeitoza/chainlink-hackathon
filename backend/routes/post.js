const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");

const postController = require("../controllers/post");

//Middlewares
const unsureAuthenticated = require("../middlewares/unsureAuthenticated");

router.post(
    "/create", 
    [body("description", "Descrição é necessário").exists({ checkFalsy: true })], 
    unsureAuthenticated.unsureAuthenticated,
    postController.Create
);

router.get(
    "/getAll",
    unsureAuthenticated.unsureAuthenticated,
    postController.GetAll
);

router.get(
    "/getById/:id",
    [param("id", "ID é necessário").exists({ checkFalsy: true })],
    unsureAuthenticated.unsureAuthenticated,
    postController.GetPostById
);

router.get(
    "/getByUser/:id",
    unsureAuthenticated.unsureAuthenticated,
    postController.GetPostByAuthorId
)

router.delete(
    "/delete/:id",
    [param("id", "ID é necessário").exists({ checkFalsy: true })],
    unsureAuthenticated.unsureAuthenticated,
    postController.DeletePostById
)



//Exporta o ROUTER
module.exports = router;
