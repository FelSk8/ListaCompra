"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controller/UserController");
var router = (0, express_1.Router)();
router.post('/', /*[checkJwt]*/ UserController_1.UserController.newUser);
router.get('/', UserController_1.UserController.getUsers);
router.get('/:id', UserController_1.UserController.getByid);
router.delete('/:id', UserController_1.UserController.delete);
router.patch('/:id', UserController_1.UserController.update);
exports.default = router;
//# sourceMappingURL=user.js.map