/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {PdMethod, PdRequest, PdResponse} from "@element-ts/palladium";
import * as Path from "path";
import * as FS from "fs";

export class Wolfram {

	private static getWolframKey(): string {

		return FS.readFileSync(Path.resolve("./wolframkey.txt")).toString("utf8");

	}

	private static async getRawResponseForQuestion(query: string): Promise<string | undefined> {

		const req: PdRequest = new PdRequest();

		req.setUrl("https://api.wolframalpha.com/v1/result?i=" + encodeURIComponent(query) + "&appid=" + this.getWolframKey());
		req.setMethod(PdMethod.Get);

		const res: PdResponse = await req.request();
		if (res.statusCode !== 200) return undefined;

		return res.getString();

	}

	private static getRandomStartInfliction(): string {

		const inflictions: string[] = [
			"Interesting",
			"Smart",
			"That is a crazy-smart",
			"Intriguing"
		];

		return inflictions[Math.floor(Math.random() * inflictions.length)];

	}

	private static getRandomMiddleInfliction(): string {

		const inflictions: string[] = [
			"I am pretty sure",
			"I think",
			"people tell me",
			"a little bird once told me"
		];

		return inflictions[Math.floor(Math.random() * inflictions.length)];

	}

	private static getRandomErrorInfliction(): string {

		const inflictions: string[] = [
			"No one knows the answer to that.",
			"Wow, I actually don't know the answer to that.",
			"I don't know. Does it matter?",
			"Whose to say...",
			"Why do you ask me such hard questions?",
			"How am I supposed to know the answer to that?",
			"I am just a dog, I don't know all the answers to human problems.",
			"I am not sure. I bet Bonny knows though. You should ask her."
		];

		return inflictions[Math.floor(Math.random() * inflictions.length)];

	}

	public static async getAnswerForQuestion(query: string): Promise<string> {

		const res: string | undefined = await this.getRawResponseForQuestion(query);
		if (res === undefined) return this.getRandomErrorInfliction();
		const endChar: string = res.charAt(res.length - 1) === "." ? "" : ".";

		return `${this.getRandomStartInfliction()} question, ${this.getRandomMiddleInfliction()} ${res.toLocaleLowerCase()}${endChar}`;

	}

}