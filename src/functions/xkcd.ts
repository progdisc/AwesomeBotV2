import axios from 'axios';
import cheerio from 'cheerio';

import { format } from 'util';
import { Message } from 'discord.js';
import { helpMessages, errorMessages } from '../constants';
import { BotCommand } from '../types';

const parseXkcdDataFromXkcdUrl = async (xkcdUrl: string) => {
    return axios.get(xkcdUrl).then(({ data }: any) => {
        if (!data) {
            console.error(errorMessages.unprocessableXkcd);
            return;
        }

        return [
            '```diff',
            `Title: ${data.safe_title}`,
            `Alt Text: ${data.alt}`,
            '```',
            `${data.img}`
        ].join('\n');
    });
}

const parseXkcdUrlFromDuckDuckGo = ({ data }: any) => {
    const parsedBody = cheerio.load(data);
    let xkcdUrl: string = '';

    if (!parsedBody) {
        console.error(errorMessages.duckDuckGoError);
        return xkcdUrl;
    }

    parsedBody('.result__a').each((_, link) => {
        const href = decodeURIComponent(link.attribs.href);
        const matches = (href || '').match(/(https?\:\/\/(www\.)?xkcd\.com\/\d+\/)/g);
        if (xkcdUrl || !matches) return;
        xkcdUrl = `${matches[0]}info.0.json`;
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
        'User-Agent': 'Emacs Restclient'
    };

    const duckDuckGoUrl = 'https://duckduckgo.com/html/?q=%s%20xkcd';

    const axiosParams = {
        method: 'get',
        url: format(duckDuckGoUrl, encodeURIComponent(args.join(' '))),
        headers: duckDuckGoHeaders
    };

    const xkcdComic = await axios(axiosParams)
        .then(parseXkcdUrlFromDuckDuckGo)
        .then(parseXkcdDataFromXkcdUrl);

    message.channel.send(xkcdComic);
};
