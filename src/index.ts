import { Client, Message } from 'discord.js';

import { prefix, token } from './config.json';

import { ClientEvent } from './types';
import { commandMapping, commandAliases } from './mappings';
import { helpMessages, SUCCESS_REACTION, FAILURE_REACTION } from './constants';
import { format } from 'util';

const client = new Client();

client.once(ClientEvent.READY, () => {
    console.log(`Logged in as ${client.user.tag}.`);
});

client.on(ClientEvent.MESSAGE, async (message: Message) => {
    if (message.content[0] !== prefix || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/) || [''];
    let command = args.shift();
    if (!command) {
        await message.react(FAILURE_REACTION);
        message.reply(helpMessages.invalidCommand);
        return;
    }
    command = command.toLowerCase();

    const botCommand = commandAliases[command] || command;
    let functionsToRun = commandMapping[botCommand];
    if (!functionsToRun) {
        await message.react(FAILURE_REACTION);
        return;
    }

    functionsToRun = Array.isArray(functionsToRun) ? functionsToRun : [functionsToRun];
    if (!functionsToRun.every(functionToRun => typeof functionToRun === 'function')) {
        await message.react(FAILURE_REACTION);
        message.reply(format(helpMessages.invalidFunction, botCommand));
        return;
    };

    await message.react(SUCCESS_REACTION);

    functionsToRun.forEach(command => command(message, args));
});

client.login(token);
