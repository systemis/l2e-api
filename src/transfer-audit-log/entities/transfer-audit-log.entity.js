"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransferAuditLogSchema = exports.TransferAuditLogModel = exports.TransferAuditLog = exports.TransferType = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var TransferType;
(function (TransferType) {
    TransferType["buyItem"] = "TRANSFERTYPE::BUYITEM";
    TransferType["reward"] = "TRANSFERTYPE::REWARD";
})(TransferType = exports.TransferType || (exports.TransferType = {}));
var TransferAuditLog = /** @class */ (function () {
    function TransferAuditLog() {
    }
    return TransferAuditLog;
}());
exports.TransferAuditLog = TransferAuditLog;
var TransferAuditLogModel = /** @class */ (function () {
    function TransferAuditLogModel() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ type: String, required: true })
    ], TransferAuditLogModel.prototype, "from");
    __decorate([
        (0, mongoose_1.Prop)({ type: String, required: true })
    ], TransferAuditLogModel.prototype, "to");
    __decorate([
        (0, mongoose_1.Prop)({ type: String, "enum": TransferType, required: true })
    ], TransferAuditLogModel.prototype, "type");
    __decorate([
        (0, mongoose_1.Prop)({ type: Number, required: true })
    ], TransferAuditLogModel.prototype, "amount");
    TransferAuditLogModel = __decorate([
        (0, common_1.Injectable)(),
        (0, mongoose_1.Schema)({ timestamps: true, autoIndex: true })
    ], TransferAuditLogModel);
    return TransferAuditLogModel;
}());
exports.TransferAuditLogModel = TransferAuditLogModel;
exports.TransferAuditLogSchema = mongoose_1.SchemaFactory.createForClass(TransferAuditLogModel);
;
