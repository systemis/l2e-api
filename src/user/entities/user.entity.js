"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.UserModel = exports.User = exports.UserRole = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var UserRole;
(function (UserRole) {
    UserRole["user"] = "UserRole::User";
    UserRole["admin"] = "UserRole::SystemAdmin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ type: String })
    ], UserModel.prototype, "username");
    __decorate([
        (0, mongoose_1.Prop)({ type: String })
    ], UserModel.prototype, "email");
    __decorate([
        (0, mongoose_1.Prop)({ type: String })
    ], UserModel.prototype, "displayName");
    __decorate([
        (0, mongoose_1.Prop)({ type: String })
    ], UserModel.prototype, "avatar");
    __decorate([
        (0, mongoose_1.Prop)({ type: Array, "enum": UserRole, "default": [UserRole.user] })
    ], UserModel.prototype, "roles");
    UserModel = __decorate([
        (0, common_1.Injectable)(),
        (0, mongoose_1.Schema)({ timestamps: true, autoIndex: true })
    ], UserModel);
    return UserModel;
}());
exports.UserModel = UserModel;
;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(UserModel);
