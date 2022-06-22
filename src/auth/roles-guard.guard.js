"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleGaurd = void 0;
var common_1 = require("@nestjs/common");
var RoleGaurd = /** @class */ (function () {
    function RoleGaurd(reflector) {
        this.reflector = reflector;
    }
    RoleGaurd.prototype.canActivate = function (context) {
        var roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        var request = context.switchToHttp().getRequest();
        var session = request;
        return (roles.filter(function (role) { return session.user.roles.indexOf(role); }).length > 0);
    };
    RoleGaurd = __decorate([
        (0, common_1.Injectable)()
    ], RoleGaurd);
    return RoleGaurd;
}());
exports.RoleGaurd = RoleGaurd;
