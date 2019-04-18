import axios from 'axios';
import cheerio from 'cheerio';

import { format } from 'util';
import { Message } from 'discord.js';
import { helpMessages, errorMessages } from '../constants';
import { BotCommand } from '../types';

const parseXkcdDataFromXkcdUrl = async (xkcdUrl: string) => {
    return axios.get(xkcdUrl).then((xkcdBody: any) => {
        const xkcdData = JSON.parse(xkcdBody);
        if (!xkcdData) {
            console.error(errorMessages.unprocessableXkcd);
            return;
        }

        return [
            '```diff',
            `Title: ${xkcdData.safe_title}`,
            `Alt Text: ${xkcdData.alt}`,
            '```',
            `${xkcdData.img}`
        ].join('\n');
    });
}

const parseXkcdUrlFromDuckDuckGo = (body: any) => {
    const parsedBody = cheerio.load(body);
    let xkcdUrl: string = '';

    if (!parsedBody) {
        console.error(errorMessages.duckDuckGoError);
        return xkcdUrl;
    }

    parsedBody('.result__a').each((_, link) => {
        const href = link.attribs.href;
        console.log(_, href);
        if (xkcdUrl || href.search(/^https?:\/\/(www\.)?xkcd\.com\/\d+/) === -1) return;
        xkcdUrl = `${href}info.0.json`;
    });

    if (!xkcdUrl) {
        console.error(errorMessages.noXkcdUrlFound);
        return xkcdUrl;
    }

    return xkcdUrl;
}

export const getXkcdComic = async (message: Message, args: string[]) => {
    if (!args.length) {
        message.reply(helpMessages[BotCommand.XKCD]);
        return;
    }

    const duckDuckGoHeaders = {
        'accept-language': 'en-US,en;q=0.8',
        'upgrade-insecure-requests': 1,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    };

    const duckDuckGoUrl = 'https://duckduckgo.com/html/?q=%s%20xkcd';

    const axiosParams = {
        method: 'get',
        url: format(duckDuckGoUrl, encodeURIComponent(args.join(' '))),
        headers: duckDuckGoHeaders
    };

    return axios(axiosParams)
        .then(parseXkcdUrlFromDuckDuckGo)
        .then(parseXkcdDataFromXkcdUrl);
};
