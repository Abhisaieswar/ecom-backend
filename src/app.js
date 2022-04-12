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
var typeorm_1 = require("typeorm");
var Productsdetails_1 = require("./Entity/Productsdetails");
var Cart_1 = require("./Entity/Cart");
var User_1 = require("./Entity/User");
var Orders_1 = require("./Entity/Orders");
var cors = require("cors");
var uuid_1 = require("uuid");
var jwt = require('jsonwebtoken');
var express = require("express");
var app = express();
app.use(express.json());
//module.exports = 
//"entities": [`${__dirname}/src/Entity/*.js`],
app.use(cors());
app.options('*', cors());
var initializeServerAndGetConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, typeorm_1.createConnection)({
                        "type": "postgres",
                        "host": "localhost",
                        "port": 5432,
                        "username": "postgres",
                        "password": "postgres",
                        "database": "postgres",
                        "entities": [Productsdetails_1.Productsdetails, Cart_1.Cart, Orders_1.Orders, User_1.User],
                        "logging": true,
                        "synchronize": true
                    })
                    //const data=await entityManager.findOne(productsdetails,1)
                ];
            case 1:
                connection = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
initializeServerAndGetConnection();
app.listen(3001, function () {
    console.log("Server running on port 3001");
});
var entityManager = (0, typeorm_1.getManager)();
var jwt_token;
app.get("/getusername", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token = authHeader.split(" ")[1];
            }
            console.log(jwt_token);
            if (jwt_token === undefined) {
                res.status(401);
                res.send([{ "send": "Invalid access token" }]);
            }
            else {
                jwt.verify(jwt_token, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log(payload);
                        if (error) {
                            res.status(400);
                            res.send([{ "msg": "Invalid access token" }]);
                        }
                        else {
                            res.send({ uname: payload.username });
                        }
                        return [2 /*return*/];
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err);
        }
        return [2 /*return*/];
    });
}); });
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token = authHeader.split(" ")[1];
            }
            console.log(jwt_token, "aaaaaaaaaaaaabbbbbbbbbbbcccccccccccc");
            if (jwt_token === undefined) {
                res.status(401);
                res.send([{ "send": "Invalid access token" }]);
            }
            else {
                jwt.verify(jwt_token, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(payload, "******************************************");
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send([{ "msg": "Invalid access token" }]);
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, entityManager.find(Productsdetails_1.Productsdetails, { order: { id: "DESC" } })];
                            case 2:
                                data = _a.sent();
                                res.send(JSON.stringify(data));
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err, "**************************************");
        }
        return [2 /*return*/];
    });
}); });
app.get("/getcart/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_1, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_1 = authHeader.split(" ")[1];
            }
            if (jwt_token_1 === undefined) {
                res.status(401);
                res.send([{ "msg": "Invalid access token" }]);
            }
            else {
                jwt.verify(jwt_token_1, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send([{ "msg": "Invalid access token" }]);
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, entityManager.find(Cart_1.Cart, { where: { user: payload.userid } })];
                            case 2:
                                data = _a.sent();
                                console.log(data);
                                res.send(data);
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.get("/getorders/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_2, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_2 = authHeader.split(" ")[1];
            }
            if (jwt_token_2 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_2, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, entityManager.find(Orders_1.Orders, { where: { user: payload.userid }, order: { id: "ASC" } })];
                            case 2:
                                data = _a.sent();
                                res.send(data);
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.get("/getorder/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_3, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_3 = authHeader.split(" ")[1];
            }
            if (jwt_token_3 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_3, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var id, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1:
                                id = req.params;
                                return [4 /*yield*/, entityManager.find(Orders_1.Orders, id)];
                            case 2:
                                data = _a.sent();
                                res.send(data);
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.get("/getuser", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_4, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_4 = authHeader.split(" ")[1];
            }
            if (jwt_token_4 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_4, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, entityManager.find(User_1.User, { where: { username: payload.username } })];
                            case 2:
                                data = _a.sent();
                                res.send(data);
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.post("/login/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, payload, jwt_token_5, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, entityManager.find(User_1.User, { where: { username: username, password: password } })];
            case 1:
                user = _b.sent();
                if (user.length === 0) {
                    res.status(400);
                    res.send({ not: "User Not Found" });
                }
                else {
                    payload = {
                        username: username,
                        userid: user[0].id
                    };
                    jwt_token_5 = jwt.sign(payload, "secret");
                    res.send({ jwt_token: jwt_token_5 });
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                console.log(err_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/products/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_6, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_6 = authHeader.split(" ")[1];
            }
            if (jwt_token_6 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_6, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, brand, imageurl, price, rating, title, quantity;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1:
                                _a = req.body, brand = _a.brand, imageurl = _a.imageurl, price = _a.price, rating = _a.rating, title = _a.title, quantity = _a.quantity;
                                return [4 /*yield*/, entityManager.insert(Productsdetails_1.Productsdetails, { brand: brand, price: price, title: title, quantity: quantity, imageurl: imageurl, rating: rating })];
                            case 2:
                                _b.sent();
                                res.send("Product added successfully");
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.post("/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password1, users, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                _a = req.body, username = _a.username, password1 = _a.password1;
                return [4 /*yield*/, entityManager.find(User_1.User, { where: { username: username } })];
            case 1:
                users = _b.sent();
                if (!(users.length === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, entityManager.insert(User_1.User, { username: username, password: password1 })];
            case 2:
                _b.sent();
                res.status(200);
                res.send({ msg: "success" });
                return [3 /*break*/, 4];
            case 3:
                res.status(400);
                res.send({ msg: "failed" });
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_3 = _b.sent();
                console.log(err_3.message);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post("/cart/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_7, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_7 = authHeader.split(" ")[1];
            }
            if (jwt_token_7 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_7, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, id, brand, imageurl, price, rating, title, quantity, cartquantity;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1:
                                _a = req.body, id = _a.id, brand = _a.brand, imageurl = _a.imageurl, price = _a.price, rating = _a.rating, title = _a.title, quantity = _a.quantity, cartquantity = _a.cartquantity;
                                return [4 /*yield*/, entityManager.insert(Cart_1.Cart, { id: id, brand: brand, price: price, title: title, quantity: quantity, imageurl: imageurl, rating: rating, cartquantity: cartquantity, uniquecart: (0, uuid_1.v4)(), user: payload.userid })];
                            case 2:
                                _b.sent();
                                res.send("success");
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.post("/ordersdata/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_8, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_8 = authHeader.split(" ")[1];
            }
            if (jwt_token_8 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_8, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, id, brand, imageurl, price, rating, title, quantity, cartquantity, ordereddate, totalamt;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1:
                                _a = req.body, id = _a.id, brand = _a.brand, imageurl = _a.imageurl, price = _a.price, rating = _a.rating, title = _a.title, quantity = _a.quantity, cartquantity = _a.cartquantity, ordereddate = _a.ordereddate, totalamt = _a.totalamt;
                                console.log(req.body.ordereddate);
                                return [4 /*yield*/, entityManager.insert(Orders_1.Orders, { id: id, brand: brand, price: price, title: title, quantity: quantity, imageurl: imageurl, rating: rating, cartquantity: cartquantity, ordereddate: ordereddate, totalamt: totalamt, status: "Order placed", user: payload.userid, uniqueorder: (0, uuid_1.v4)() })];
                            case 2:
                                _b.sent();
                                res.status(200);
                                res.send("success");
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
            return [2 /*return*/, err];
        }
        return [2 /*return*/];
    });
}); });
app.post("/adduser/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_9, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_9 = authHeader.split(" ")[1];
            }
            if (jwt_token_9 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_9, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, name_1, address, phone;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1:
                                _a = req.body, name_1 = _a.name, address = _a.address, phone = _a.phone;
                                return [4 /*yield*/, entityManager.update(User_1.User, payload.userid, { name: name_1, address: address, phone: phone })];
                            case 2:
                                _b.sent();
                                res.status(200);
                                res.send("success");
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
            return [2 /*return*/, err];
        }
        return [2 /*return*/];
    });
}); });
app.put("/products/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_10, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_10 = authHeader.split(" ")[1];
            }
            if (jwt_token_10 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_10, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var id, _a, brand, imageurl, price, rating, title, quantity;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 14];
                            case 1:
                                id = req.params.id;
                                _a = req.body, brand = _a.brand, imageurl = _a.imageurl, price = _a.price, rating = _a.rating, title = _a.title, quantity = _a.quantity;
                                if (!(brand != "")) return [3 /*break*/, 3];
                                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { brand: brand })];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                if (!(imageurl != "")) return [3 /*break*/, 5];
                                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { imageurl: imageurl })];
                            case 4:
                                _b.sent();
                                _b.label = 5;
                            case 5:
                                if (!(price != null)) return [3 /*break*/, 7];
                                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { price: price })];
                            case 6:
                                _b.sent();
                                _b.label = 7;
                            case 7:
                                if (!(rating != null)) return [3 /*break*/, 9];
                                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { rating: rating })];
                            case 8:
                                _b.sent();
                                _b.label = 9;
                            case 9:
                                if (!(title != "")) return [3 /*break*/, 11];
                                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { title: title })];
                            case 10:
                                _b.sent();
                                _b.label = 11;
                            case 11:
                                if (!(quantity != "")) return [3 /*break*/, 13];
                                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { quantity: quantity })];
                            case 12:
                                _b.sent();
                                _b.label = 13;
                            case 13:
                                res.send("Product updated successfully");
                                _b.label = 14;
                            case 14: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.put("/updateitem/:title", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token = authHeader.split(" ")[1];
            }
            if (jwt_token === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var title, qty;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1:
                                title = req.params;
                                qty = req.body.qty;
                                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, title, { quantity: qty })];
                            case 2:
                                _a.sent();
                                res.send("success");
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.put("/updatecart/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_11, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_11 = authHeader.split(" ")[1];
            }
            if (jwt_token_11 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_11, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var id, qty;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1:
                                id = req.params;
                                qty = req.body.qty;
                                return [4 /*yield*/, entityManager.update(Cart_1.Cart, id, { cartquantity: qty })];
                            case 2:
                                _a.sent();
                                res.send("success");
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.put("/updatestatus/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_12, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_12 = authHeader.split(" ")[1];
            }
            if (jwt_token_12 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_12, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var id, st;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1:
                                id = req.params;
                                st = req.body.st;
                                return [4 /*yield*/, entityManager.update(Orders_1.Orders, id, { status: st })];
                            case 2:
                                _a.sent();
                                res.send("success");
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.put("/updateuser/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, jwt_token_13, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            id = req.params;
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_13 = authHeader.split(" ")[1];
            }
            if (jwt_token_13 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_13, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, name_2, address, phone, id_1, d;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 4];
                            case 1:
                                _a = req.body, name_2 = _a.name, address = _a.address, phone = _a.phone, id_1 = _a.id;
                                return [4 /*yield*/, entityManager.find(User_1.User, id_1)];
                            case 2:
                                d = _b.sent();
                                console.log(d, "user*************************************");
                                return [4 /*yield*/, entityManager.update(User_1.User, id_1, { name: name_2, address: address, phone: phone })];
                            case 3:
                                _b.sent();
                                res.send("success");
                                _b.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.delete("/deletecartitem/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_14, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_14 = authHeader.split(" ")[1];
            }
            if (jwt_token_14 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_14, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var id;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1:
                                id = req.params;
                                return [4 /*yield*/, entityManager.delete(Cart_1.Cart, id)];
                            case 2:
                                _a.sent();
                                res.send("success");
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.delete("/deletecart/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_15, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_15 = authHeader.split(" ")[1];
            }
            if (jwt_token_15 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_15, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, entityManager.clear(Cart_1.Cart)];
                            case 2:
                                _a.sent();
                                res.send("success");
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
app.delete("/products/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt_token_16, authHeader;
    return __generator(this, function (_a) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.setHeader("Access-Control-Allow-Headers", "content-type");
            res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
            authHeader = req.headers["authorization"];
            if (authHeader !== undefined) {
                jwt_token_16 = authHeader.split(" ")[1];
            }
            if (jwt_token_16 === undefined) {
                res.status(401);
                res.send("Invalid access token");
            }
            else {
                jwt.verify(jwt_token_16, "secret", function (error, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    var id;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                res.status(400);
                                res.send("Invalid access token");
                                return [3 /*break*/, 3];
                            case 1:
                                id = req.params.id;
                                return [4 /*yield*/, entityManager.delete(Productsdetails_1.Productsdetails, id)];
                            case 2:
                                _a.sent();
                                res.send("Product deleted successfully");
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        catch (err) {
            console.log(err.message);
        }
        return [2 /*return*/];
    });
}); });
