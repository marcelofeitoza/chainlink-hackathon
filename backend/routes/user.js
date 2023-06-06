const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");

const userController = require("../controllers/user");

//Middlewares
const unsureAuthenticated = require("../middlewares/unsureAuthenticated");

/**
 * @swagger
 * /v1/user:
 *   get:
 *     description: Get the authenticated user
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", unsureAuthenticated.unsureAuthenticated, userController.GetUserCalling);

/**
 * @swagger
 * /v1/user/{id}:
 *   get:
 *     description: Get a user by ID
 *     parameters:
 *       - name: id
 *         description: User ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get
        ("/getUserByID/:id", 
        unsureAuthenticated.unsureAuthenticated, 
        userController.GetUser);

/**
 * @swagger
 * /v1/user/register:
 *   post:
 *     description: Register a new user
 *     parameters:
 *       - name: email
 *         description: User's email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password
 *         in: body
 *         required: true
 *         type: string
 *       - name: name
 *         description: User's name
 *         in: body
 *         required: true
 *         type: string
 *       - name: area
 *         description: User's area
 *         in: body
 *         required: true
 *         type: string
 *       - name: tags
 *         description: User's tags
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post
        ("/register", 
        [body("email", "Email é necessário").exists({ checkFalsy: true })], 
        [body("password", "Senha é necessária").exists({ checkFalsy: true })], 
        [body("name", "Nome é necessária").exists({ checkFalsy: true })], 
        [body("area", "Area é necessária").exists({ checkFalsy: true })], 
        [body("tags", "Tags é necessária").exists({ checkFalsy: true })],
         userController.Create);

/**
 * @swagger
 * /v1/user/auth:
 *   post:
 *     description: Authenticate a user
 *     parameters:
 *       - name: email
 *         description: User's email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post
        ("/auth", 
        [body("email", "Email é necessário").exists({ checkFalsy: true })], 
        [body("password", "Senha é necessária").exists({ checkFalsy: true })], 
        userController.Auth);

/**
 * @swagger
 * /v1/user/update/{id}:
 *   put:
 *     description: Update a user by ID
 *     parameters:
 *       - name: id
 *         description: User ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description:Success
 */
router.put
        ("/update/:id", 
        [param("id", "ID é necessário").exists({ checkFalsy: true })],
        unsureAuthenticated.unsureAuthenticated, 
        userController.Update);

/**
 * @swagger
 * /v1/user/delete/{id}:
 *   delete:
 *     description: Delete a user by ID
 *     parameters:
 *       - name: id
 *         description: User ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
        "/getAll", 
        unsureAuthenticated.unsureAuthenticated, 
        userController.getAll
);

//Exporta o ROUTER
module.exports = router;
