/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {BlizzardCommands} from "../../BlizzardCommands";
import {KBCommand, KBMessage, KBResponse} from "@elijahjcobb/keybase-bot-builder";
import * as FS from "fs";
import * as HTTP from "http";
import * as Crypto from "crypto";
import * as OS from "os";
import * as Path from "path";

export class KaiCommands implements BlizzardCommands {

	public getCommands(): KBCommand[] {

		return [
			{
				name: "breakfast",
				description: "Send today's breakfast menu",
				usage: "!breakfast [hall_name]",
				handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {

					const hallName: (number | string) = msg.getParameters()[0];
					const day: (number | string) = msg.getParameters()[1];
					// tslint:disable-next-line:typedef
					let menuJSON = null;
					let menu: string = "Menu not found.";
					switch (hallName) {
						case "mcnair":
							menuJSON = KaiCommands.getObjectFromJSONFile("./McNair-FA19.json");
							if (day == null) {
								// @ts-ignore
								menu = "Today's breakfast:\n\t" + menuJSON.month?.[0].days[0].breakfast;
							} else if (day === "Saturday" || day === "Sunday") {
								menu = "Sorry, McNair Dining Hall is closed on Saturday and Sunday.";
							} else {
								// @ts-ignore
								for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
									// @ts-ignore
									if (menuJSON.month?.[0].days[i].dayName === day) {
										// @ts-ignore
										menu = day + "'s breakfast:\n\t" + menuJSON.month?.[0].days[i].breakfast;
										break;
									}
								}
							}
							break;
						case "wads":
							menuJSON = KaiCommands.getObjectFromJSONFile("./Wads-FA19.json");
							if (day == null) {
								// @ts-ignore
								menu = "Today's breakfast:\n\t" + menuJSON.month?.[0].days[0].breakfast;
							} else {
								// @ts-ignore
								for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
									// @ts-ignore
									if (menuJSON.month?.[0].days[i].dayName === day) {
										// @ts-ignore
										menu = day + "'s breakfast:\n\t" + menuJSON.month[0].days[i].breakfast;
										break;
									}
								}
							}
							break;
						case "dhh":
							menuJSON = KaiCommands.getObjectFromJSONFile("./DHH-FA19.json");
							if (day == null) {
								// @ts-ignore
								menu = "Today's breakfast:\n\t" + menuJSON.month?.[0].days[0].breakfast;
							} else if (day === "Saturday" || day === "Sunday") {
								menu = "Sorry, DHH Dining Hall is closed on Saturday and Sunday.";
							} else {
								// @ts-ignore
								for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
									// @ts-ignore
									if (menuJSON.month?.[0].days[i].dayName === day) {
										// @ts-ignore
										menu = day + "'s breakfast:\n\t" + menuJSON.month[0].days[i].breakfast;
										break;
									}
								}
							}
							break;
					}

					await res.send(menu);

				}
			},
			{
				name: "lunch",
				description: "Send today's lunch menu",
				usage: "!lunch [hall_name]",
				handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {
					const hallName: (number | string) = msg.getParameters()[0];
					const day: (number | string) = msg.getParameters()[1];
					// tslint:disable-next-line:typedef
					let menuJSON = null;
					let menu: string = "Menu not found.";
					switch (hallName) {
						case "mcnair":
							menuJSON = KaiCommands.getObjectFromJSONFile("./McNair-FA19.json");
							if (day == null) {
								// @ts-ignore
								menu = "Today's lunch:\n\t" + menuJSON.month?.[0].days[0].lunch;
							} else if (day === "Saturday" || day === "Sunday") {
								menu = "Sorry, McNair Dining Hall is closed on Saturday and Sunday.";
							} else {
								// @ts-ignore
								for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
									// @ts-ignore
									if (menuJSON.month?.[0].days[i].dayName === day) {
										// @ts-ignore
										menu = day + "'s lunch:\n\t" + menuJSON.month[0].days[i].lunch;
										break;
									}
								}
							}
							break;
						case "wads":
							menuJSON = KaiCommands.getObjectFromJSONFile("./Wads-FA19.json");
							if (day == null) {
								// @ts-ignore
								menu = "Today's lunch:\n\t" + menuJSON.month?.[0].days[0].lunch;
							} else {
								// @ts-ignore
								for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
									// @ts-ignore
									if (menuJSON.month?.[0].days[i].dayName === day) {
										// @ts-ignore
										menu = day + "'s lunch:\n\t" + menuJSON.month[0].days[i].lunch;
										break;
									}
								}
							}
							break;
						case "dhh":
							menuJSON = KaiCommands.getObjectFromJSONFile("./DHH-FA19.json");
							if (day == null) {
								// @ts-ignore
								menu = "Today's lunch:\n\t" + menuJSON.month?.[0].days[0].lunch;
							} else if (day === "Saturday" || day === "Sunday") {
								menu = "Sorry, DHH Dining Hall is closed on Saturday and Sunday.";
							} else {
								// @ts-ignore
								for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
									// @ts-ignore
									if (menuJSON.month?.[0].days[i].dayName === day) {
										// @ts-ignore
										menu = day + "'s lunch:\n\t" + menuJSON.month?.[0].days[i].lunch;
										break;
									}
								}
							}
							break;
					}

					await res.send(menu);
				}
			},
			{
				name: "dinner",
				description: "Send today's dinner menu",
				usage: "!dinner [hall_name]",
				handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {
					const hallName: (number | string) = msg.getParameters()[0];
					const day: (number | string) = msg.getParameters()[1];
					// tslint:disable-next-line:typedef
					let menuJSON = null;
					let menu: string = "Menu not found.";
					switch (hallName) {
						case "mcnair":
							menuJSON = KaiCommands.getObjectFromJSONFile("./McNair-FA19.json");
							if (day == null) {
								// @ts-ignore
								menu = "Today's dinner:\n\t" + menuJSON.month?.[0].days[0].dinner;
							} else if (day === "Saturday" || day === "Sunday") {
								menu = "Sorry, McNair Dining Hall is closed on Saturday and Sunday.";
							} else {
								// @ts-ignore
								for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
									// @ts-ignore
									if (menuJSON.month?.[0].days[i].dayName === day) {
										// @ts-ignore
										menu = day + "'s dinner:\n\t" + menuJSON.month[0].days[i].dinner;
										break;
									}
								}
							}
							break;
						case "wads":
							menuJSON = KaiCommands.getObjectFromJSONFile("./Wads-FA19.json");
							if (day == null) {
								// @ts-ignore
								menu = "Today's dinner:\n\t" + menuJSON.month?.[0].days[0].dinner;
							} else {
								// @ts-ignore
								for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
									// @ts-ignore
									if (menuJSON.month?.[0].days[i].dayName === day) {
										// @ts-ignore
										menu = day + "'s dinner:\n\t" + menuJSON.month[0].days[i].dinner;
										break;
									}
								}
							}
							break;
						case "dhh":
							menu = "Sorry, DHH Dining Hall doesn't serve dinner.";
							break;
					}

					await res.send(menu);
				}
			},

			/*

			 Not sure how this is supposed to work in production as it is referencing a local file...

			 */
			// {
			// 	name: "menuPDF",
			// 	description: "Send this week's menu PDF link",
			// 	usage: "!menuPDF [hall_name]",
			// 	handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {
			// 		const hallName: (number | string) = msg.getParameters()[0];
			// 		if (hallName === "mcnair") {
			// 			await res.sendFile("C:/Users/Kai/Desktop/Classes/19-20 Spring/CS3141 - Team Software Project/Project files/menu_pdf/oct28-nov3.pdf");
			// 		} else {
			// 			await res.send("Sorry, not found.");
			// 		}
			// 	}
			// },
			{
				name: "webcam",
				description: "Fetch a still frame from the specified webcam.",
				usage: "!webcam name or !webcam list",
				handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {

					const camName: (number | string) = msg.getParameters()[0];

					if (camName === "list") {

						const camList: (string) =
							"Available webcams:\n" +
							"\taerial\n" +
							"\thuskystatue\n" +
							"\tmid\n" +
							"\twalker\n" +
							"\tsdc\n" +
							"\tclocktower\n" +
							"\tcollegeave\n" +
							"\tbridge\n" +
							"\tripley-ski\n" +
							"\tripley\n" +
							"\ttrails1\n" +
							"\ttrails2\n" +
							"\tportage-north\n" +
							"\tportage-west\n" +
							"\tportage-east\n" +
							"\tpressbox\n\n" +
							"Reply '!webcam [name]' to view one.";

						return await res.send(camList);

					}

					let image: string | undefined;
					// Switch statement for camera link
					switch (camName) {
						// Campus cams
						case "aerial":
							image = "http://webcams.mtu.edu/webcam16/webcam16.jpg";
							break;
						case ("huskystatue"):
							image = "http://webcams.mtu.edu/images/webcam26.jpg";
							break;
						case "mid":
							image = "http://webcams.mtu.edu/webcam7/webcam7.jpg";
							break;
						case "walker":
							image = "http://webcams.mtu.edu/webcam31/webcam31.jpg";
							break;
						case "sdc":
							image = "http://webcams.mtu.edu/webcam4/webcam4.jpg";
							break;
						case "clocktower":
							image = "http://webcams.mtu.edu/webcam25/webcam25.jpg";
							break;
						case "collegeave":
							image = "http://webcams.mtu.edu/webcam15/webcam15.jpg";
							break;
						case "bridge":
							image = "http://webcams.mtu.edu/webcam11/webcam11.jpg";
							break;
						case "ripley-ski":
							image = "http://webcams.mtu.edu/webcam30/webcam30.jpg";
							break;
						case "ripley":
							image = "http://webcams.mtu.edu/webcam21/webcam21.jpg";
							break;
						case "trails1":
							image = "http://webcams.mtu.edu/webcam14/webcam14.jpg";
							break;
						case "trails2":
							image = "http://webcams.mtu.edu/webcam13/webcam13.jpg";
							break;
						case "portage-north":
							image = "http://webcams.mtu.edu/images/webcam27.jpg";
							break;
						case "portage-west":
							image = "http://webcams.mtu.edu/images/webcam29.jpg";
							break;
						case "portage-east":
							image = "http://webcams.mtu.edu/images/webcam28.jpg";
							break;
						case "pressbox":
							image = "http://webcams.mtu.edu/images/webcam35.jpg";
							break;
						case "test":
							image = "TESTING";
							break;
					}

					if (image === undefined) return await res.send("Whoops! I don't know that webcam. Call `!webcam list` for the cameras I support.");

					const filePath: string = KaiCommands.getValidPathForNewImageFile();
					const writeStream: FS.WriteStream = FS.createWriteStream(filePath);
					HTTP.get(image, (imageDataStream: HTTP.IncomingMessage): void => {
						const downloadStream: FS.WriteStream = imageDataStream.pipe(writeStream);
						downloadStream.on("finish", async(): Promise<void> => {

							await res.sendFile(filePath);
							FS.unlinkSync(filePath);

						});
					});
				}
			}
		];

	}

	private static getObjectFromJSONFile(relativePath: string): object | undefined {

		const path: string = Path.resolve(relativePath);

		if (!FS.existsSync(path)) return undefined;

		try {
			const data: Buffer = FS.readFileSync(path);
			const str: string = data.toString("utf8");
			return JSON.parse(str);
		} catch (e) { console.error(e); }

		return undefined;

	}

	private static generateRandomPath(): string {

		return Path.join(OS.tmpdir(), "blizzard_t_husky_webcam_" + Crypto.randomBytes(8).toString("hex") + "jpg");

	}

	private static getValidPathForNewImageFile(): string {

		let path: string = this.generateRandomPath();
		while (FS.existsSync(path)) path = this.generateRandomPath();

		return path;

	}

}