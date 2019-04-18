"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
var util_1 = require("util");
var constants_1 = require("../constants");
var types_1 = require("../types");
var parseXkcdDataFromXkcdUrl = function (xkcdUrl) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, axios_1.default.get(xkcdUrl).then(function (_a) {
                var data = _a.data;
                if (!data) {
                    console.error(constants_1.errorMessages.unprocessableXkcd);
                    return;
                }
                return [
                    '```diff',
                    "Title: " + data.safe_title,
                    "Alt Text: " + data.alt,
                    '```',
                    "" + data.img
                ].join('\n');
            })];
    });
}); };
var parseXkcdUrlFromDuckDuckGo = function (_a) {
    var data = _a.data;
    var parsedBody = cheerio_1.default.load(data);
    var xkcdUrl = '';
    if (!parsedBody) {
        console.error(constants_1.errorMessages.duckDuckGoError);
        return xkcdUrl;
    }
    parsedBody('.result__a').each(function (_, link) {
        var href = decodeURIComponent(link.attribs.href);
        var matches = (href || '').match(/(https?\:\/\/(www\.)?xkcd\.com\/\d+\/)/g);
        if (xkcdUrl || !matches)
            return;
        xkcdUrl = matches[0] + "info.0.json";
    });
    if (!xkcdUrl) {
        console.error(constants_1.errorMessages.noXkcdUrlFound);
        return xkcdUrl;
    }
    return xkcdUrl;
};
exports.getXkcdComic = function (message, args) { return __awaiter(_this, void 0, void 0, function () {
    var duckDuckGoHeaders, duckDuckGoUrl, axiosParams, xkcdComic;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!args.length) {
                    message.reply(constants_1.helpMessages[types_1.BotCommand.XKCD]);
                    return [2 /*return*/];
                }
                duckDuckGoHeaders = {
                    'User-Agent': 'Emacs Restclient'
                };
                duckDuckGoUrl = 'https://duckduckgo.com/html/?q=%s%20xkcd';
                axiosParams = {
                    method: 'get',
                    url: util_1.format(duckDuckGoUrl, encodeURIComponent(args.join(' '))),
                    headers: duckDuckGoHeaders
                };
                return [4 /*yield*/, axios_1.default(axiosParams)
                        .then(parseXkcdUrlFromDuckDuckGo)
                        .then(parseXkcdDataFromXkcdUrl)];
            case 1:
                xkcdComic = _a.sent();
                message.channel.send(xkcdComic);
                return [2 /*return*/];
        }
    });
}); };
