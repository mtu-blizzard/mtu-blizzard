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

	public static async getAnswerForQuestion(query: string): Promise<string | undefined> {

		const req: PdRequest = new PdRequest();

		req.setUrl("https://api.wolframalpha.com/v1/result?i=" + encodeURIComponent(query) + "&appid=" + this.getWolframKey());
		req.setMethod(PdMethod.Get);

		const res: PdResponse = await req.request();
		if (res.statusCode !== 200) return undefined;

		return res.getString();

	}

}