"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateTransferAuditLogDto = void 0;
var class_validator_1 = require("class-validator");
var transfer_audit_log_entity_1 = require("../entities/transfer-audit-log.entity");
var CreateTransferAuditLogDto = /** @class */ (function () {
    function CreateTransferAuditLogDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateTransferAuditLogDto.prototype, "from");
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateTransferAuditLogDto.prototype, "to");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsEnum)(transfer_audit_log_entity_1.TransferType)
    ], CreateTransferAuditLogDto.prototype, "type");
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], CreateTransferAuditLogDto.prototype, "amount");
    return CreateTransferAuditLogDto;
}());
exports.CreateTransferAuditLogDto = CreateTransferAuditLogDto;
