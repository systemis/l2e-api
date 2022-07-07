"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var mongoose_1 = require("@nestjs/mongoose");
var user_service_1 = require("./user.service");
var user_controller_1 = require("./user.controller");
var todo_entity_1 = require("@/todo/entities/todo.entity");
var user_entity_1 = require("@/user/entities/user.entity");
var auth_entity_1 = require("@/auth/entities/auth.entity");
var activity_entity_1 = require("@/activity/entities/activity.entity");
var activity_audit_log_entity_1 = require("@/activity/entities/activity-audit-log.entity");
var activity_service_1 = require("@/activity/activity.service");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule,
                mongoose_1.MongooseModule.forFeature([
                    { name: user_entity_1.UserModel.name, schema: user_entity_1.UserSchema },
                    { name: todo_entity_1.TodoModel.name, schema: todo_entity_1.TodoSchema },
                    { name: auth_entity_1.AuthModel.name, schema: auth_entity_1.AuthSchema },
                    { name: activity_entity_1.ActivityModel.name, schema: activity_entity_1.ActivitySchema },
                    { name: activity_audit_log_entity_1.ActivityAuditLogModel.name, schema: activity_audit_log_entity_1.ActivityAuditLogSchema },
                ]),
            ],
            providers: [
                user_service_1.UserService,
                activity_service_1.ActivityService
            ],
            exports: [user_service_1.UserService],
            controllers: [user_controller_1.UserController]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
