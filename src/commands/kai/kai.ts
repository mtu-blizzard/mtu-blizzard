/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {BlizzardCommands} from "../../BlizzardCommands";
import {KBCommand} from "@elijahjcobb/keybase-bot-builder";

/*
Imports from Kai's code that is not being used.
 */
// import * as FS from "fs";
// import * as HTTP from "http";
// import * as Crypto from "crypto";
// import * as OS from "os";
// import * as Path from "path";
// import {IncomingMessage} from "http";



/*
Upon merging Kai's code, of the 2 parts he was tasked with implementing, both did not work. In his webcam command
he was referencing his C drive which obviously is not going to work in production. It was a little messy so I just
rewrote all of it real quick so that it would 1. work, 2. manage files correctly, 3. be easier to use as the end user.
His dining commands did not work as he did not even finish entering in the meal data.

Because of this, I have included his source code that does not work so I highlighted it out and took it upon myself to
do it the day this semester long project is due because he has yet to complete one single piece of working code.

Feel free to contact me (ejcobb@mtu.edu) or Trevor Sears (ttsears@mtu.edu) for any questions or concerns with the
issues stated above.
 */


export class KaiCommands implements BlizzardCommands {

	public getCommands(): KBCommand[] {

		return [

			/*
			None of the following commands are complete. They have no data with them.
			 */

			// {
			// 	name: "breakfast",
			// 	description: "Send today's breakfast menu",
			// 	usage: "!breakfast [hall_name]",
			// 	handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {
			//
			// 		const hallName: (number | string) = msg.getParameters()[0];
			// 		const day: (number | string) = msg.getParameters()[1];
			// 		// tslint:disable-next-line:typedef
			// 		let menuJSON = null;
			// 		let menu: string = "Menu not found.";
			// 		switch (hallName) {
			// 			case "mcnair":
			// 				menuJSON = KaiCommands.getObjectFromJSONFile("./McNair-FA19.json");
			// 				if (day == null) {
			// 					// @ts-ignore
			// 					menu = "Today's breakfast:\n\t" + menuJSON.month?.[0].days[0].breakfast;
			// 				} else if (day === "Saturday" || day === "Sunday") {
			// 					menu = "Sorry, McNair Dining Hall is closed on Saturday and Sunday.";
			// 				} else {
			// 					// @ts-ignore
			// 					for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
			// 						// @ts-ignore
			// 						if (menuJSON.month?.[0].days[i].dayName === day) {
			// 							// @ts-ignore
			// 							menu = day + "'s breakfast:\n\t" + menuJSON.month?.[0].days[i].breakfast;
			// 							break;
			// 						}
			// 					}
			// 				}
			// 				break;
			// 			case "wads":
			// 				menuJSON = KaiCommands.getObjectFromJSONFile("./Wads-FA19.json");
			// 				if (day == null) {
			// 					// @ts-ignore
			// 					menu = "Today's breakfast:\n\t" + menuJSON.month?.[0].days[0].breakfast;
			// 				} else {
			// 					// @ts-ignore
			// 					for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
			// 						// @ts-ignore
			// 						if (menuJSON.month?.[0].days[i].dayName === day) {
			// 							// @ts-ignore
			// 							menu = day + "'s breakfast:\n\t" + menuJSON.month[0].days[i].breakfast;
			// 							break;
			// 						}
			// 					}
			// 				}
			// 				break;
			// 			case "dhh":
			// 				menuJSON = KaiCommands.getObjectFromJSONFile("./DHH-FA19.json");
			// 				if (day == null) {
			// 					// @ts-ignore
			// 					menu = "Today's breakfast:\n\t" + menuJSON.month?.[0].days[0].breakfast;
			// 				} else if (day === "Saturday" || day === "Sunday") {
			// 					menu = "Sorry, DHH Dining Hall is closed on Saturday and Sunday.";
			// 				} else {
			// 					// @ts-ignore
			// 					for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
			// 						// @ts-ignore
			// 						if (menuJSON.month?.[0].days[i].dayName === day) {
			// 							// @ts-ignore
			// 							menu = day + "'s breakfast:\n\t" + menuJSON.month[0].days[i].breakfast;
			// 							break;
			// 						}
			// 					}
			// 				}
			// 				break;
			// 		}
			//
			// 		await res.send(menu);
			//
			// 	}
			// },
			// {
			// 	name: "lunch",
			// 	description: "Send today's lunch menu",
			// 	usage: "!lunch [hall_name]",
			// 	handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {
			// 		const hallName: (number | string) = msg.getParameters()[0];
			// 		const day: (number | string) = msg.getParameters()[1];
			// 		// tslint:disable-next-line:typedef
			// 		let menuJSON = null;
			// 		let menu: string = "Menu not found.";
			// 		switch (hallName) {
			// 			case "mcnair":
			// 				menuJSON = KaiCommands.getObjectFromJSONFile("./McNair-FA19.json");
			// 				if (day == null) {
			// 					// @ts-ignore
			// 					menu = "Today's lunch:\n\t" + menuJSON.month?.[0].days[0].lunch;
			// 				} else if (day === "Saturday" || day === "Sunday") {
			// 					menu = "Sorry, McNair Dining Hall is closed on Saturday and Sunday.";
			// 				} else {
			// 					// @ts-ignore
			// 					for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
			// 						// @ts-ignore
			// 						if (menuJSON.month?.[0].days[i].dayName === day) {
			// 							// @ts-ignore
			// 							menu = day + "'s lunch:\n\t" + menuJSON.month[0].days[i].lunch;
			// 							break;
			// 						}
			// 					}
			// 				}
			// 				break;
			// 			case "wads":
			// 				menuJSON = KaiCommands.getObjectFromJSONFile("./Wads-FA19.json");
			// 				if (day == null) {
			// 					// @ts-ignore
			// 					menu = "Today's lunch:\n\t" + menuJSON.month?.[0].days[0].lunch;
			// 				} else {
			// 					// @ts-ignore
			// 					for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
			// 						// @ts-ignore
			// 						if (menuJSON.month?.[0].days[i].dayName === day) {
			// 							// @ts-ignore
			// 							menu = day + "'s lunch:\n\t" + menuJSON.month[0].days[i].lunch;
			// 							break;
			// 						}
			// 					}
			// 				}
			// 				break;
			// 			case "dhh":
			// 				menuJSON = KaiCommands.getObjectFromJSONFile("./DHH-FA19.json");
			// 				if (day == null) {
			// 					// @ts-ignore
			// 					menu = "Today's lunch:\n\t" + menuJSON.month?.[0].days[0].lunch;
			// 				} else if (day === "Saturday" || day === "Sunday") {
			// 					menu = "Sorry, DHH Dining Hall is closed on Saturday and Sunday.";
			// 				} else {
			// 					// @ts-ignore
			// 					for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
			// 						// @ts-ignore
			// 						if (menuJSON.month?.[0].days[i].dayName === day) {
			// 							// @ts-ignore
			// 							menu = day + "'s lunch:\n\t" + menuJSON.month?.[0].days[i].lunch;
			// 							break;
			// 						}
			// 					}
			// 				}
			// 				break;
			// 		}
			//
			// 		await res.send(menu);
			// 	}
			// },
			// {
			// 	name: "dinner",
			// 	description: "Send today's dinner menu",
			// 	usage: "!dinner [hall_name]",
			// 	handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {
			// 		const hallName: (number | string) = msg.getParameters()[0];
			// 		const day: (number | string) = msg.getParameters()[1];
			// 		// tslint:disable-next-line:typedef
			// 		let menuJSON = null;
			// 		let menu: string = "Menu not found.";
			// 		switch (hallName) {
			// 			case "mcnair":
			// 				menuJSON = KaiCommands.getObjectFromJSONFile("./McNair-FA19.json");
			// 				if (day == null) {
			// 					// @ts-ignore
			// 					menu = "Today's dinner:\n\t" + menuJSON.month?.[0].days[0].dinner;
			// 				} else if (day === "Saturday" || day === "Sunday") {
			// 					menu = "Sorry, McNair Dining Hall is closed on Saturday and Sunday.";
			// 				} else {
			// 					// @ts-ignore
			// 					for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
			// 						// @ts-ignore
			// 						if (menuJSON.month?.[0].days[i].dayName === day) {
			// 							// @ts-ignore
			// 							menu = day + "'s dinner:\n\t" + menuJSON.month[0].days[i].dinner;
			// 							break;
			// 						}
			// 					}
			// 				}
			// 				break;
			// 			case "wads":
			// 				menuJSON = KaiCommands.getObjectFromJSONFile("./Wads-FA19.json");
			// 				if (day == null) {
			// 					// @ts-ignore
			// 					menu = "Today's dinner:\n\t" + menuJSON.month?.[0].days[0].dinner;
			// 				} else {
			// 					// @ts-ignore
			// 					for (let i: number = 0; i < menuJSON.month?.[0].days.length; i++) {
			// 						// @ts-ignore
			// 						if (menuJSON.month?.[0].days[i].dayName === day) {
			// 							// @ts-ignore
			// 							menu = day + "'s dinner:\n\t" + menuJSON.month[0].days[i].dinner;
			// 							break;
			// 						}
			// 					}
			// 				}
			// 				break;
			// 			case "dhh":
			// 				menu = "Sorry, DHH Dining Hall doesn't serve dinner.";
			// 				break;
			// 		}
			//
			// 		await res.send(menu);
			// 	}
			// },

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

			/*

			Was not saving correctly because it was provided in writer's C drive...

			 */
			// {
			// 	name: "fetchCam",
			// 	description: "Fetch a still frame from the specified webcam.",
			// 	usage: "!fetchCam camera_name <# of hours into past>",
			// 	handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {
			//
			// 		const camName: (number | string) = msg.getParameters()[0];
			// 		let image: string = "[ERROR: Webcam not found]";
			// 		// Switch statement for camera link
			// 		switch (camName) {
			// 			// Campus cams
			// 			case "aerial":
			// 				image = "http://webcams.mtu.edu/webcam16/webcam16.jpg";
			// 				break;
			// 			case ("huskystatue"):
			// 				image = "http://webcams.mtu.edu/images/webcam26.jpg";
			// 				break;
			// 			case "mid":
			// 				image = "http://webcams.mtu.edu/webcam7/webcam7.jpg";
			// 				break;
			// 			case "walker":
			// 				image = "http://webcams.mtu.edu/webcam31/webcam31.jpg";
			// 				break;
			// 			case "sdc":
			// 				image = "http://webcams.mtu.edu/webcam4/webcam4.jpg";
			// 				break;
			// 			case "clocktower":
			// 				image = "http://webcams.mtu.edu/webcam25/webcam25.jpg";
			// 				break;
			// 			case "collegeave":
			// 				image = "http://webcams.mtu.edu/webcam15/webcam15.jpg";
			// 				break;
			// 			case "bridge":
			// 				image = "http://webcams.mtu.edu/webcam11/webcam11.jpg";
			// 				break;
			// 			case "ripley-ski":
			// 				image = "http://webcams.mtu.edu/webcam30/webcam30.jpg";
			// 				break;
			// 			case "ripley":
			// 				image = "http://webcams.mtu.edu/webcam21/webcam21.jpg";
			// 				break;
			// 			case "trails1":
			// 				image = "http://webcams.mtu.edu/webcam14/webcam14.jpg";
			// 				break;
			// 			case "trails2":
			// 				image = "http://webcams.mtu.edu/webcam13/webcam13.jpg";
			// 				break;
			// 			case "portage-north":
			// 				image = "http://webcams.mtu.edu/images/webcam27.jpg";
			// 				break;
			// 			case "portage-west":
			// 				image = "http://webcams.mtu.edu/images/webcam29.jpg";
			// 				break;
			// 			case "portage-ecommandsast":
			// 				image = "http://webcams.mtu.edu/images/webcam28.jpg";
			// 				break;
			// 			case "pressbox":
			// 				image = "http://webcams.mtu.edu/images/webcam35.jpg";
			// 				break;
			// 			case "test":
			// 				image = "TESTING";
			// 				break;
			// 		}
			//
			// 		console.log("Requested " + camName);
			//
			// 		const http = require('http');
			// 		const fs = require('fs');
			//
			// 		const datestamp = Date.now().toString();
			// 		console.log("Datestamp before: " + datestamp);
			// 		const file = fs.createWriteStream("C:/Users/Kai/Desktop/Classes/19-20 Spring/CS3141 - Team Software Project/Project files/webcam_img/image" + datestamp + ".jpg");
			// 		const request = http.get(image, function(response: IncomingMessage) {
			// 			const imgStream = response.pipe(file);
			// 			imgStream.on('finish', function () {
			// 				res.sendFile("C:/Users/Kai/Desktop/Classes/19-20 Spring/CS3141 - Team Software Project/Project files/webcam_img/image" + datestamp + ".jpg");
			// 			})
			// 		});
			//
			// 		// const pathString =
			//
			// 		// console.log("Datestamp after: " + datestamp);
			//
			// 		// await res.sendFile("C:/Users/Kai/Desktop/Classes/19-20 Spring/CS3141 - Team Software Project/Project files/webcam_img/image" + datestamp + ".jpg");
			//
			// 		// For testing only:
			// 		// await res.sendFile("C:/Users/Kai/Desktop/Classes/19-20 Spring/CS3141 - Team Software Project/Project files/webcam_img/test.jpg");
			// 		// await res.sendFile("C:/Users/Kai/Desktop/Classes/19-20 Spring/CS3141 - Team Software Project/Project files/webcam_img/image1585730977239.jpg");
			//
			// 	}
			// }

			/*
			Because main webcam command needed to be re-written, I (Elijah) just added the listing functionality into
			the new command !webcam.
			 */

			// {
			// 	name: "listCam",
			// 	description: "List available webcams.",
			// 	usage: "!listCam -r [region]",
			// 	handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {
			//
			// 		const camList: (string) =
			// 			"Available webcams:\n" +
			// 			"\taerial\n" +
			// 			"\thuskystatue\n" +
			// 			"\tmid\n" +
			// 			"\twalker\n" +
			// 			"\tsdc\n" +
			// 			"\tclocktower\n" +
			// 			"\tcollegeave\n" +
			// 			"\tbridge\n" +
			// 			"\tripley-ski\n" +
			// 			"\tripley\n" +
			// 			"\ttrails1\n" +
			// 			"\ttrails2\n" +
			// 			"\tportage-north\n" +
			// 			"\tportage-west\n" +
			// 			"\tportage-east\n" +
			// 			"\tpressbox\n\n" +
			// 			"Reply '!fetchCam [name]' to view one.";
			//
			// 		console.log("Listing available webcams...");
			// 		await res.send(camList);
			// 	}

		];

	}

	/*
	Helper method Elijah wrote for Kai but is no longer used because his menu commands were not done.
	 */
	// private static getObjectFromJSONFile(relativePath: string): object | undefined {
	//
	// 	const path: string = Path.resolve(relativePath);
	//
	// 	if (!FS.existsSync(path)) return undefined;
	//
	// 	try {
	// 		const data: Buffer = FS.readFileSync(path);
	// 		const str: string = data.toString("utf8");
	// 		return JSON.parse(str);
	// 	} catch (e) { console.error(e); }
	//
	// 	return undefined;
	//
	// }

}