"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
var jwt = require("jsonwebtoken");
var config_1 = require("../config/config");
var checkJwt = function (req, res, next) {
    var token = req.headers['auth']; //obtenemos el token
    console.log(token); //imprimimos el token
    var jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret); //verificamos el token
        res.locals.jwtPayload = jwtPayload; //guardamos el token en el payload
        console.log(jwtPayload); //imprimimos el payload
    }
    catch (error) {
        return res.status(401).json({
            message: 'no auth token erroneo',
        });
    }
    var userId = jwtPayload.userId, email = jwtPayload.email; //obtenemos el id y el email del payload
    var newToken = jwt.sign({ userId: userId, email: email }, config_1.default.jwtSecret, { expiresIn: '1h' }); //creamos un nuevo token
    res.setHeader('auth', newToken); //enviamos el nuevo token
    next(); //pasamos al siguiente middleware
};
exports.checkJwt = checkJwt;
//# sourceMappingURL=jwt.js.map