"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserDto = void 0;
var user_entity_1 = require("@/user/entities/user.entity");
var class_validator_1 = require("class-validator");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsUrl)({
            require_protocol: true,
            require_valid_protocol: true
        })
    ], CreateUserDto.prototype, "avatar");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(64)
    ], CreateUserDto.prototype, "displayName");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEmail)()
    ], CreateUserDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsEnum)(user_entity_1.UserRole, { each: true }),
        (0, class_validator_1.ArrayUnique)()
    ], CreateUserDto.prototype, "roles");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsAlphanumeric)(),
        (0, class_validator_1.MaxLength)(32)
    ], CreateUserDto.prototype, "username");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
