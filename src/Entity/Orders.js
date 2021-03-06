"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Orders = /** @class */ (function () {
    function Orders() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], Orders.prototype, "uniqueorder", void 0);
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Orders.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true }),
        __metadata("design:type", String)
    ], Orders.prototype, "brand", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true }),
        __metadata("design:type", String)
    ], Orders.prototype, "imageurl", void 0);
    __decorate([
        (0, typeorm_1.Column)('numeric', { nullable: true }),
        __metadata("design:type", Number)
    ], Orders.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)('numeric', { nullable: true }),
        __metadata("design:type", Number)
    ], Orders.prototype, "rating", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Orders.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)('numeric', { nullable: true }),
        __metadata("design:type", Number)
    ], Orders.prototype, "quantity", void 0);
    __decorate([
        (0, typeorm_1.Column)('numeric', { nullable: true }),
        __metadata("design:type", Number)
    ], Orders.prototype, "cartquantity", void 0);
    __decorate([
        (0, typeorm_1.Column)('timestamp'),
        __metadata("design:type", Date)
    ], Orders.prototype, "ordereddate", void 0);
    __decorate([
        (0, typeorm_1.Column)('numeric', { nullable: true }),
        __metadata("design:type", Number)
    ], Orders.prototype, "totalamt", void 0);
    __decorate([
        (0, typeorm_1.Column)('text', { nullable: true }),
        __metadata("design:type", String)
    ], Orders.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.orders; }),
        __metadata("design:type", User_1.User)
    ], Orders.prototype, "user", void 0);
    Orders = __decorate([
        (0, typeorm_1.Entity)()
    ], Orders);
    return Orders;
}());
exports.Orders = Orders;
