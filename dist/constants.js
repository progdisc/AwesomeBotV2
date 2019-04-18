"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var types_1 = require("./types");
exports.DAY_IN_MILLIS = 1000 * 60 * 60 * 24;
exports.SUCCESS_REACTION = '✅';
exports.FAILURE_REACTION = '❌';
exports.errorMessages = {
    duckDuckGoError: 'Sorry, there was a problem with the DuckDuckGo query.',
    noXkcdUrlFound: 'Sorry, I could not find an XKCD comic.',
    unprocessableXkcd: 'Sorry, there was a problem retrieving the XKCD comic.'
};
exports.helpMessages = (_a = {
        invalidCommand: 'That command is invalid.',
        invalidFunction: 'Please tell a mod that `%s` tried to invoke an invalid function.'
    },
    _a[types_1.BotCommand.XKCD] = 'x|xkcd <keywords> - Finds a XKCD comic with relevant keywords.',
    _a);
