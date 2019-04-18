import { BotCommand } from "./types";

export const DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

export const SUCCESS_REACTION = '✅';
export const FAILURE_REACTION = '❌';

export const errorMessages: Record<string, string> = {
    duckDuckGoError: 'Sorry, there was a problem with the DuckDuckGo query.',
    noXkcdUrlFound: 'Sorry, I could not find an XKCD comic.',
    unprocessableXkcd: 'Sorry, there was a problem retrieving the XKCD comic.'
};

export const helpMessages: Record<string, string> = {
    invalidCommand: 'That command is invalid.',
    invalidFunction: 'Please tell a mod that `%s` tried to invoke an invalid function.',
    [BotCommand.XKCD]: 'x|xkcd <keywords> - Finds a XKCD comic with relevant keywords.',
};
