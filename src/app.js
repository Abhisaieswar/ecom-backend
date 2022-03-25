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
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                return [4 /*yield*/, entityManager.find(Productsdetails_1.Productsdetails)];
            case 1:
                data = _a.sent();
                res.send(data);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/getcart/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                return [4 /*yield*/, entityManager.find(Cart_1.Cart)];
            case 1:
                data = _a.sent();
                console.log(data, "////////////////////////////////////////////");
                res.send(data);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.log(err_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/getorders/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                return [4 /*yield*/, entityManager.find(Orders_1.Orders)];
            case 1:
                data = _a.sent();
                res.send(data);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.log(err_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/products/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, brand, imageurl, price, rating, title, quantity, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                _a = req.body, brand = _a.brand, imageurl = _a.imageurl, price = _a.price, rating = _a.rating, title = _a.title, quantity = _a.quantity;
                console.log(req.body, "///////////////////////////////");
                //insert data into db
                return [4 /*yield*/, entityManager.insert(Productsdetails_1.Productsdetails, { brand: brand, price: price, title: title, quantity: quantity, imageurl: imageurl, rating: rating })];
            case 1:
                //insert data into db
                _b.sent();
                res.send("Product added successfully");
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                console.log(err_5.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/cart/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, brand, imageurl, price, rating, title, quantity, cartquantity, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                _a = req.body, id = _a.id, brand = _a.brand, imageurl = _a.imageurl, price = _a.price, rating = _a.rating, title = _a.title, quantity = _a.quantity, cartquantity = _a.cartquantity;
                return [4 /*yield*/, entityManager.insert(Cart_1.Cart, { id: id, brand: brand, price: price, title: title, quantity: quantity, imageurl: imageurl, rating: rating, cartquantity: cartquantity })];
            case 1:
                _b.sent();
                res.send("success");
                return [3 /*break*/, 3];
            case 2:
                err_6 = _b.sent();
                console.log(err_6.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/ordersdata/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, brand, imageurl, price, rating, title, quantity, cartquantity, ordereddate, totalamt, err_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                _a = req.body, id = _a.id, brand = _a.brand, imageurl = _a.imageurl, price = _a.price, rating = _a.rating, title = _a.title, quantity = _a.quantity, cartquantity = _a.cartquantity, ordereddate = _a.ordereddate, totalamt = _a.totalamt;
                console.log("//////////////////", req.body, "////////////////////");
                return [4 /*yield*/, entityManager.insert(Orders_1.Orders, { id: id, brand: brand, price: price, title: title, quantity: quantity, imageurl: imageurl, rating: rating, cartquantity: cartquantity, ordereddate: ordereddate, totalamt: totalamt, status: "ordered" })];
            case 1:
                _b.sent();
                res.status(200);
                res.send("success");
                return [3 /*break*/, 3];
            case 2:
                err_7 = _b.sent();
                console.log(err_7.message);
                return [2 /*return*/, err_7];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/adduser/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, address, phone, err_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                _a = req.body, name_1 = _a.name, address = _a.address, phone = _a.phone;
                console.log("//////////////////", req.body, "////////////////////");
                return [4 /*yield*/, entityManager.clear(User_1.User)];
            case 1:
                _b.sent();
                return [4 /*yield*/, entityManager.insert(User_1.User, { name: name_1, address: address, phone: phone })];
            case 2:
                _b.sent();
                res.status(200);
                res.send("success");
                return [3 /*break*/, 4];
            case 3:
                err_8 = _b.sent();
                console.log(err_8.message);
                return [2 /*return*/, err_8];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put("/products/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, brand, imageurl, price, rating, title, quantity, err_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 13, , 14]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                id = req.params.id;
                _a = req.body, brand = _a.brand, imageurl = _a.imageurl, price = _a.price, rating = _a.rating, title = _a.title, quantity = _a.quantity;
                console.log("**********************************", req.body, "***************************");
                if (!(brand != "")) return [3 /*break*/, 2];
                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { brand: brand })];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                if (!(imageurl != "")) return [3 /*break*/, 4];
                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { imageurl: imageurl })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                if (!(price != null)) return [3 /*break*/, 6];
                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { price: price })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                if (!(rating != null)) return [3 /*break*/, 8];
                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { rating: rating })];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8:
                if (!(title != "")) return [3 /*break*/, 10];
                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { title: title })];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10:
                if (!(quantity != "")) return [3 /*break*/, 12];
                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, id, { quantity: quantity })];
            case 11:
                _b.sent();
                _b.label = 12;
            case 12:
                res.send("Product updated successfully");
                return [3 /*break*/, 14];
            case 13:
                err_9 = _b.sent();
                console.log(err_9.message);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); });
app.put("/updateitem/:title", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, qty, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                title = req.params;
                qty = req.body.qty;
                console.log(req.body);
                return [4 /*yield*/, entityManager.update(Productsdetails_1.Productsdetails, title, { quantity: qty })];
            case 1:
                _a.sent();
                res.send("success");
                return [3 /*break*/, 3];
            case 2:
                err_10 = _a.sent();
                console.log(err_10.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put("/updatecart/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, qty, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                id = req.params;
                qty = req.body.qty;
                return [4 /*yield*/, entityManager.update(Cart_1.Cart, id, { cartquantity: qty })];
            case 1:
                _a.sent();
                res.send("success");
                return [3 /*break*/, 3];
            case 2:
                err_11 = _a.sent();
                console.log(err_11.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete("/deletecartitem/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                id = req.params;
                return [4 /*yield*/, entityManager.delete(Cart_1.Cart, id)];
            case 1:
                _a.sent();
                res.send("success");
                return [3 /*break*/, 3];
            case 2:
                err_12 = _a.sent();
                console.log(err_12.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete("/deletecart/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                return [4 /*yield*/, entityManager.clear(Cart_1.Cart)];
            case 1:
                _a.sent();
                res.send("success");
                return [3 /*break*/, 3];
            case 2:
                err_13 = _a.sent();
                console.log(err_13.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete("/products/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.setHeader("Access-Control-Allow-Headers", "content-type");
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
                id = req.params.id;
                return [4 /*yield*/, entityManager.delete(Productsdetails_1.Productsdetails, id)];
            case 1:
                _a.sent();
                res.send("Product deleted successfully");
                return [3 /*break*/, 3];
            case 2:
                err_14 = _a.sent();
                console.log(err_14.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
