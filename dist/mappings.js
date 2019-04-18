"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var types_1 = require("./types");
var weather_1 = require("./functions/weather");
var xkcd_1 = require("./functions/xkcd");
exports.commandAliases = {
    'w': types_1.BotCommand.WEATHER,
    'x': types_1.BotCommand.XKCD
};
exports.commandMapping = (_a = {},
    _a[types_1.BotCommand.WEATHER] = weather_1.getWeather,
    _a[types_1.BotCommand.XKCD] = xkcd_1.getXkcdComic,
    _a);
