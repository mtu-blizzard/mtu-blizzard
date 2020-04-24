/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {KBBot, KBConversation, KBMessage, KBResponse} from "@elijahjcobb/keybase-bot-builder";
import {SiDatabase} from "@element-ts/silicon";
import {ElijahCommands} from "./commands/ElijahCommands";
import {ZongCommands} from "./commands/ZongCommands";
import {TrevorCommands} from "./commands/TrevorCommands";
import {KaiCommands} from "./commands/KaiCommands";
import {Wolfram} from "./commands/Wolfram";

(async (): Promise<void> => {

	// await SiDatabase.init({
	// 	address: "mongodb://localhost:27017",
	// 	database: "MTUBlizzard",
	// 	verbose: true
	// });

	const bot: KBBot = await KBBot.init("otto_bot", "./keybase-paperkey.txt", {
		debugging: true,
		logging: true
	});

	bot.onNewConversation(async (conv: KBConversation, res: KBResponse): Promise<void> => {

		await res.send(`Hello ${conv.getUserName()}! My name is Blizzard T. Husky. I am a bot built for MTU students by MTU students. You can ask me any question. Just ask away! Also so you know, you can invoke my commands by first typing \`!\` and my command will pop up!`);

	});

	bot.onNormalMessage(async (msg: KBMessage, res: KBResponse): Promise<void> => {

		const answer: string | undefined = await Wolfram.getAnswerForQuestion(msg.getContent());
		if (!answer) return await res.send(":books: Blizzard is smart but he doesn't know the answer to that.");

		await res.send(answer);

	});

	for (const cmd of (new ElijahCommands().getCommands())) bot.command(cmd);
	for (const cmd of (new TrevorCommands().getCommands())) bot.command(cmd);
	for (const cmd of (new ZongCommands().getCommands())) bot.command(cmd);
	for (const cmd of (new KaiCommands().getCommands())) bot.command(cmd);

	bot.start();

})().catch((err: any): void => console.error(err));