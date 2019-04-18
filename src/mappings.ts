import { BotCommand } from './types';
import { getWeather } from './functions/weather';
import { getXkcdComic } from './functions/xkcd';

export const commandAliases: Record<string, BotCommand> = {
    'w': BotCommand.WEATHER,
    'x': BotCommand.XKCD
}

export const commandMapping: Record<string, Function | Function[]> = {
    [BotCommand.WEATHER]: getWeather,
    [BotCommand.XKCD]: getXkcdComic
}
