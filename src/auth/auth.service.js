"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var auth_entity_1 = require("./entities/auth.entity");
var mongoose_1 = require("@nestjs/mongoose");
var bcrypt = require("bcrypt");
var AuthService = /** @class */ (function () {
    function AuthService(connection, AuthDocument, userService, jwtService, hasingService) {
        this.connection = connection;
        this.AuthDocument = AuthDocument;
        this.userService = userService;
        this.jwtService = jwtService;
        this.hasingService = hasingService;
    }
    AuthService.prototype.generateAccessToken = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var jwtPayload;
            return __generator(this, function (_a) {
                jwtPayload = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };
                return [2 /*return*/, {
                        access_token: this.jwtService.sign(jwtPayload)
                    }];
            });
        });
    };
    AuthService.prototype.registerUser = function (registerUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, authEntity, _a, session;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userService.findByUsernameOrEmail(registerUserDto.username)];
                    case 1:
                        _a = (_b.sent());
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userService.findByUsernameOrEmail(registerUserDto.email)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            throw new common_1.BadRequestException('USER::EXISTS::USERNAME::EMAIL');
                        }
                        return [4 /*yield*/, this.connection.startSession()];
                    case 4:
                        session = _b.sent();
                        return [4 /*yield*/, session.withTransaction(function () { return __awaiter(_this, void 0, void 0, function () {
                                var hashPassword;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.userService.createUser({
                                                avatar: registerUserDto.avatar,
                                                email: registerUserDto.email,
                                                username: registerUserDto.username,
                                                roles: registerUserDto.roles,
                                                displayName: registerUserDto.displayName
                                            })];
                                        case 1:
                                            user = _a.sent();
                                            return [4 /*yield*/, bcrypt.hashSync(registerUserDto.credential.password, auth_entity_1.HashingAlgorithm.BCrypt)];
                                        case 2:
                                            hashPassword = _a.sent();
                                            return [4 /*yield*/, this.createAuthEntity({
                                                    userId: user._id,
                                                    credential: {
                                                        password: hashPassword,
                                                        algorithm: auth_entity_1.HashingAlgorithm.BCrypt
                                                    }
                                                })];
                                        case 3:
                                            authEntity = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, session.endSession()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, {
                                user: user,
                                authEntity: authEntity
                            }];
                }
            });
        });
    };
    AuthService.prototype.updatePassword = function (userId, updatePasswordDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user_1, session, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.verifyPassword(userId, updatePasswordDto.oldPassword)];
                    case 1:
                        user_1 = (_a.sent()).user;
                        return [4 /*yield*/, this.AuthDocument.deleteOne({ userId: user_1._id })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.connection.startSession()];
                    case 3:
                        session = _a.sent();
                        return [4 /*yield*/, session.withTransaction(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.createAuthEntity({
                                                userId: user_1._id,
                                                credential: {
                                                    algorithm: auth_entity_1.HashingAlgorithm.BCrypt,
                                                    password: updatePasswordDto.newPassword
                                                }
                                            })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, session.endSession()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        if (err_1 instanceof common_1.UnauthorizedException) {
                            throw new common_1.BadRequestException('UPDATEPASSWORD::FAILED:INCORRECT::OLDPASSWORD');
                        }
                        throw err_1;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.verifyPassword = function (userId, rawPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var user, auth, credential, hasher, isHashValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.NotFoundException();
                        return [4 /*yield*/, this.findAuthEntityWithUserId(user.id)];
                    case 2:
                        auth = _a.sent();
                        if (!auth)
                            throw new common_1.UnauthorizedException();
                        credential = auth.credential;
                        if (credential.algorithm !== auth_entity_1.HashingAlgorithm.BCrypt)
                            throw new common_1.UnauthorizedException();
                        hasher = this.hasingService.getHasher(credential.algorithm);
                        return [4 /*yield*/, hasher.compare(rawPassword, credential.password)];
                    case 3:
                        isHashValid = _a.sent();
                        if (!isHashValid)
                            throw new common_1.UnauthorizedException();
                        return [2 /*return*/, { user: user }];
                }
            });
        });
    };
    AuthService.prototype.createAuthEntity = function (createAuthDto) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, newAuth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = new this.AuthDocument(createAuthDto);
                        return [4 /*yield*/, auth.save()];
                    case 1:
                        newAuth = _a.sent();
                        return [2 /*return*/, newAuth];
                }
            });
        });
    };
    AuthService.prototype.findAuthEntityWithUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.AuthDocument.findOne({
                        userId: userId
                    })];
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectConnection)()),
        __param(1, (0, mongoose_1.InjectModel)(auth_entity_1.AuthModel.name))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
