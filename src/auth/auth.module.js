"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var jwt_2 = require("@/constants/jwt");
var user_module_1 = require("@/user/user.module");
var config_1 = require("@nestjs/config");
var mongoose_1 = require("@nestjs/mongoose");
var user_entity_1 = require("@/user/entities/user.entity");
var auth_entity_1 = require("@/auth/entities/auth.entity");
var todo_entity_1 = require("@/todo/entities/todo.entity");
var activity_entity_1 = require("@/activity/entities/activity.entity");
var activity_audit_log_entity_1 = require("@/activity/entities/activity-audit-log.entity");
var hashing_1 = require("@/providers/hashing");
var local_strategy_1 = require("./local.strategy");
var auth_service_1 = require("./auth.service");
var auth_controller_1 = require("./auth.controller");
var jwt_strategy_1 = require("./jwt.strategy");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            providers: [
                auth_service_1.AuthService,
                local_strategy_1.LocalStrategy,
                jwt_strategy_1.JwtStrategy,
                hashing_1.HasingService,
            ],
            imports: [
                config_1.ConfigModule,
                mongoose_1.MongooseModule.forFeature([
                    { name: user_entity_1.UserModel.name, schema: user_entity_1.UserSchema },
                    { name: auth_entity_1.AuthModel.name, schema: auth_entity_1.AuthSchema },
                    { name: todo_entity_1.TodoModel.name, schema: todo_entity_1.TodoSchema },
                    { name: activity_entity_1.ActivityModel.name, schema: activity_entity_1.ActivitySchema },
                    { name: activity_audit_log_entity_1.ActivityAuditLogModel.name, schema: activity_audit_log_entity_1.ActivityAuditLogSchema },
                ]),
                jwt_1.JwtModule.register({
                    secret: jwt_2.jwtConstants.secret,
                    signOptions: { expiresIn: '60s' }
                }),
                user_module_1.UserModule,
                passport_1.PassportModule,
            ],
            exports: [
                auth_service_1.AuthService,
                jwt_1.JwtModule,
            ],
            controllers: [auth_controller_1.AuthController]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
