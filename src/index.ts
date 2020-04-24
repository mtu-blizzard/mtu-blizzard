/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {KBBot, KBConversation, KBMessage, KBResponse} from "@elijahjcobb/keybase-bot-builder";
import {SiDatabase} from "@element-ts/silicon";
import {ElijahCommands} from "./commands/elijah/elijah";
import {ZongCommands} from "./commands/zong/zong";
import {TrevorCommands} from "./commands/trevor/trevor";
import {KaiCommands} from "./commands/kai/kai";
import {Wolfram} from "./commands/elijah/Wolfram";
import {KBLogger} from "@elijahjcobb/keybase-bot-builder/dts/KBLogger";

(async (): Promise<void> => {

	const bot: KBBot = await KBBot.init("blizzard_t_husky", "./keybase-paperkey.txt", {
		debugging: true,
		logging: true
	});

	bot.onNewConversation(async (conv: KBConversation, res: KBResponse): Promise<void> => {

		await res.send(`Hello ${conv.getUserName()}! My name is Blizzard T. Husky. I am a bot built for MTU students by MTU students. You can ask me any question. Just ask away! Also so you know, you can invoke my commands by first typing \`!\` and my command will pop up!`);

	});

	bot.onNormalMessage(async (msg: KBMessage, res: KBResponse): Promise<void> => {

		console.log(msg.getUsername() + " asked: \"" + msg.getContent() + "\"");
		await res.send(await Wolfram.getAnswerForQuestion(msg.getContent()));

	});

	for (const cmd of (new ElijahCommands().getCommands())) bot.command(cmd);
	for (const cmd of (new TrevorCommands().getCommands())) bot.command(cmd);
	for (const cmd of (new ZongCommands().getCommands())) bot.command(cmd);

	/*
	No point in looping over empty array.
	 */
	// for (const cmd of (new KaiCommands().getCommands())) bot.command(cmd);

	bot.start();

})().catch((err: any): void => console.error(err));