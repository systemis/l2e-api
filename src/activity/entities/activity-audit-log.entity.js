"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ActivityAuditLogSchema = exports.ActivityAuditLogModel = exports.ActivityAuditLog = exports.ActivityAuditLogStatus = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var ActivityAuditLogStatus;
(function (ActivityAuditLogStatus) {
    ActivityAuditLogStatus["joining"] = "AUDITLOG::STATUS::JOINING";
    ActivityAuditLogStatus["done"] = "AUDITLOG::STATUS::DONE";
})(ActivityAuditLogStatus = exports.ActivityAuditLogStatus || (exports.ActivityAuditLogStatus = {}));
var ActivityAuditLog = /** @class */ (function () {
    function ActivityAuditLog() {
    }
    return ActivityAuditLog;
}());
exports.ActivityAuditLog = ActivityAuditLog;
var ActivityAuditLogModel = /** @class */ (function () {
    function ActivityAuditLogModel() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], ActivityAuditLogModel.prototype, "activityId");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], ActivityAuditLogModel.prototype, "userId");
    __decorate([
        (0, mongoose_1.Prop)({ type: String, "enum": ActivityAuditLogStatus, "default": ActivityAuditLogStatus.joining })
    ], ActivityAuditLogModel.prototype, "status");
    ActivityAuditLogModel = __decorate([
        (0, common_1.Injectable)(),
        (0, mongoose_1.Schema)({ timestamps: true, autoIndex: true })
    ], ActivityAuditLogModel);
    return ActivityAuditLogModel;
}());
exports.ActivityAuditLogModel = ActivityAuditLogModel;
exports.ActivityAuditLogSchema = mongoose_1.SchemaFactory.createForClass(ActivityAuditLogModel);
