"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthSchema = exports.AuthModel = exports.Auth = exports.HashingAlgorithm = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var common_1 = require("@nestjs/common");
var HashingAlgorithm;
(function (HashingAlgorithm) {
    HashingAlgorithm[HashingAlgorithm["BCrypt"] = 10] = "BCrypt";
})(HashingAlgorithm = exports.HashingAlgorithm || (exports.HashingAlgorithm = {}));
var Auth = /** @class */ (function () {
    function Auth() {
    }
    return Auth;
}());
exports.Auth = Auth;
var AuthModel = /** @class */ (function () {
    function AuthModel() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ type: String })
    ], AuthModel.prototype, "userId");
    __decorate([
        (0, mongoose_1.Prop)({ type: Object })
    ], AuthModel.prototype, "credential");
    AuthModel = __decorate([
        (0, common_1.Injectable)(),
        (0, mongoose_1.Schema)({ timestamps: true, autoIndex: true })
    ], AuthModel);
    return AuthModel;
}());
exports.AuthModel = AuthModel;
exports.AuthSchema = mongoose_1.SchemaFactory.createForClass(AuthModel);
