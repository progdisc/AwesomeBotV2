"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var types_1 = require("./types");
exports.getWeather = function () { };
exports.getXkcdComic = function () { };
exports.commandAliases = {
    'w': types_1.BotCommand.WEATHER,
    'x': types_1.BotCommand.XKCD
};
exports.commandMapping = (_a = {},
    _a[types_1.BotCommand.WEATHER] = exports.getWeather,
    _a[types_1.BotCommand.XKCD] = exports.getXkcdComic,
    _a);
