"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterUserDto = void 0;
var class_validator_1 = require("class-validator");
var user_entity_1 = require("@/user/entities/user.entity");
var RegisterUserDto = /** @class */ (function () {
    function RegisterUserDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], RegisterUserDto.prototype, "username");
    __decorate([
        (0, class_validator_1.IsString)()
    ], RegisterUserDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsEnum)(user_entity_1.UserRole),
        (0, class_validator_1.ArrayUnique)()
    ], RegisterUserDto.prototype, "roles");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], RegisterUserDto.prototype, "avatar");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], RegisterUserDto.prototype, "displayName");
    __decorate([
        (0, class_validator_1.ValidateNested)()
    ], RegisterUserDto.prototype, "credential");
    return RegisterUserDto;
}());
exports.RegisterUserDto = RegisterUserDto;
