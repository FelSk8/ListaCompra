"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_source_1 = require("../data-source");
var User_1 = require("../entity/User");
var jwt = require("jsonwebtoken"); //importamos el jsonwebtoken
var config_1 = require("../config/config");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    var _a;
    _a = AuthController;
    AuthController.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, email, password, authRepo, user, error_1, token;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body //capturamos el email y password  
                    , email = _b.email, password = _b.password;
                    if (!(email && password)) {
                        return [2 /*return*/, res.status(409).json({ message: 'user & pass are required' })];
                    }
                    authRepo = data_source_1.AppDataSource.getRepository(User_1.User);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, authRepo.findOneOrFail({
                            where: {
                                email: email,
                            }
                        })];
                case 2:
                    user = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    return [2 /*return*/, res.status(452).json({ message: 'user incorrect' })];
                case 4:
                    if (!user.checkPassword(password)) { //comprobamos la contraseña
                        return [2 /*return*/, res.status(452).json({ message: 'passwor incorrect' })];
                    }
                    token = jwt.sign({
                        userId: user.id,
                        email: email
                    }, //datos que queremos guardar en el token
                    config_1.default.jwtSecret, { expiresIn: '1h' } //clave secreta y tiempo de expiracion
                    );
                    return [2 /*return*/, res.status(200).json({ menssage: 'login', token: token })
                        // return res.status(200).json({message:'login'});
                    ]; //devolvemos el token
            }
        });
    }); };
    return AuthController;
}());
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map