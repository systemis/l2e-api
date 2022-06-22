"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ActivitySchema = exports.ActivityModel = exports.Activity = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var Activity = /** @class */ (function () {
    function Activity() {
    }
    return Activity;
}());
exports.Activity = Activity;
var ActivityModel = /** @class */ (function () {
    function ActivityModel() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], ActivityModel.prototype, "title");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], ActivityModel.prototype, "decs");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: Number })
    ], ActivityModel.prototype, "credit");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], ActivityModel.prototype, "author");
    ActivityModel = __decorate([
        (0, common_1.Injectable)(),
        (0, mongoose_1.Schema)({ timestamps: true, autoIndex: true })
    ], ActivityModel);
    return ActivityModel;
}());
exports.ActivityModel = ActivityModel;
exports.ActivitySchema = mongoose_1.SchemaFactory.createForClass(ActivityModel);
