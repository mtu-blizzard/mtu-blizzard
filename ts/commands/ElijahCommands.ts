/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {BlizzardCommands} from "../BlizzardCommands";
import {KBCommand, KBMessage, KBResponse} from "@elijahjcobb/keybase-bot-builder";
import * as Path from "path";
import * as FS from "fs";
import {DarkSky, DarkSkyReportCurrently} from "@elijahjcobb/dark-sky";
import {Wolfram} from "./Wolfram";

interface User {
	username: string;
	firstName: string;
	lastName: string;
}

export class ElijahCommands implements BlizzardCommands {

	private darkSky: DarkSky;
	private users: User[];

	public constructor() {

		const darkSkyKeyPath: string = Path.resolve("./dark-sky-secret.txt");
		const darkSkyKeyData: Buffer = FS.readFileSync(darkSkyKeyPath);
		const darkSkyKey: string = darkSkyKeyData.toString("utf8");
		this.darkSky = new DarkSky(darkSkyKey, 47.121231, -88.564461);

		const pathToUsers: string = Path.resolve("./users.json");
		const dataForUsers: Buffer = FS.readFileSync(pathToUsers);
		const stringForUsers: string = dataForUsers.toString("utf8");
		this.users = JSON.parse(stringForUsers) as User[];


	}

	private getWindDirectionString(bearing: number): string {
		if (bearing > 350 && bearing < 10) return "N";
		else if (bearing > 10 && bearing < 80) return "NE";
		else if (bearing > 80 && bearing < 100) return "E";
		else if (bearing > 100 && bearing < 170) return "SE";
		else if (bearing > 170 && bearing < 190) return "S";
		else if (bearing > 190 && bearing < 260) return "SW";
		else if (bearing > 260 && bearing < 280) return "W";
		else if (bearing > 280 && bearing < 350) return "NW";
		else return "sky";
	}

	private findUser(input: string): User | undefined {
		return this.users.find((value: User): boolean => {
			if (input.toLowerCase() === value.firstName.toLowerCase() + " " + value.lastName.toLowerCase()) return true;
			if (input.toLowerCase() === value.username.toLowerCase()) return true;
			return false;
		});
	}

	public getCommands(): KBCommand[] {

		return [
			{
				name: "weather",
				description: "Get the current weather.",
				handler: async(msg: KBMessage, res: KBResponse): Promise<void> => {

					const report: DarkSkyReportCurrently = await this.darkSky.getCurrently();

					await res.send(`It is currently ${report.currently.summary.toLowerCase()} and feels like ${report.currently.apparentTemperature.toFixed(0)}°F. The real temperature is ${report.currently.temperature.toFixed(0)}°F. There is wind coming from the ${this.getWindDirectionString(report.currently.windBearing)} at ${report.currently.windSpeed.toFixed(0)} mph. The cloud coverage is ${(report.currently.cloudCover * 100).toFixed(0)}% with a UV index of ${report.currently.uvIndex}.`);
				}
			},
			{
				name: "canvas",
				description: "Get a link for canvas.",
				handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {
					await res.send("https://mtu.instructure.com");
				}
			},
			{
				name: "banweb",
				description: "Get a link for banweb.",
				handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {
					await res.send("https://banweb.mtu.edu");
				}
			},
			{
				name: "directory",
				description: "Search for a student, faculty, or employee of MTU.",
				usage: "!directory Elijah Cobb",
				handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {

					const user: User | undefined = this.findUser(msg.getParameters().join(" "));
					if (!user) return await res.send("Whoops! I can't find that user, try by searching with their username, or their first name and last name!");
					await res.send(`I think I found someone that matches your specs, their name is ${user.firstName}. ${user.firstName} ${user.lastName}'s email address at MTU is: ${user.username}@mtu.edu.`);

				}
			},
			{
				name: "time",
				description: "Get the current time on campus.",
				handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {

					await res.send(new Date().toLocaleTimeString());

				}
			},
			{
				name: "date",
				description: "Get the current date on campus.",
				handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {

					await res.send(new Date().toLocaleDateString());

				}
			},
			{
				name: "isItCarnival",
				description: "Is Winter Carnival occurring right now?",
				handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {

					await res.send("not yet :slightly_frowning_face:...");

				}
			}
		];

	}

}