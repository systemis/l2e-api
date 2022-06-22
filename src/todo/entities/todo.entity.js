"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TodoSchema = exports.TodoModel = exports.Todo = exports.TodoStatus = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var TodoStatus;
(function (TodoStatus) {
    TodoStatus["done"] = "TODO::STATUS::DONE";
    TodoStatus["processing"] = "TODO::STATUS::PROCESSING";
    TodoStatus["archive"] = "TODO::STATUS::ARCHIVE";
})(TodoStatus = exports.TodoStatus || (exports.TodoStatus = {}));
var Todo = /** @class */ (function () {
    function Todo() {
    }
    return Todo;
}());
exports.Todo = Todo;
var TodoModel = /** @class */ (function () {
    function TodoModel() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], TodoModel.prototype, "title");
    __decorate([
        (0, mongoose_1.Prop)({ type: String })
    ], TodoModel.prototype, "desc");
    __decorate([
        (0, mongoose_1.Prop)({ required: true, type: String })
    ], TodoModel.prototype, "userId");
    __decorate([
        (0, mongoose_1.Prop)({ type: String, "enum": TodoStatus, "default": TodoStatus.processing })
    ], TodoModel.prototype, "status");
    TodoModel = __decorate([
        (0, common_1.Injectable)(),
        (0, mongoose_1.Schema)({ timestamps: true, autoIndex: true })
    ], TodoModel);
    return TodoModel;
}());
exports.TodoModel = TodoModel;
exports.TodoSchema = mongoose_1.SchemaFactory.createForClass(TodoModel);
