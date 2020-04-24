/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:03 PM -- April 22nd, 2020.
 *	Project: mtu-blizzard
 */

import { BlizzardCommands } from "../BlizzardCommands";
import { KBCommand, KBMessage, KBResponse } from "@elijahjcobb/keybase-bot-builder";
import { SimplifiedTwitterAPI } from "../twitter/simplified-twitter-api";
import { Tweet } from "../twitter/tweet";
import { MillenniumDate, MillenniumDateMath } from "millennium";
import { ACCESS_INFO } from "../../twitter-api-access-keys";

/*
 * All of this stuff up here is getting initialized at import-time so that it is not reinitialized every time a relevant
 * command is called.
 */

const client: SimplifiedTwitterAPI = new SimplifiedTwitterAPI(ACCESS_INFO);

/**
 * A static mapping from input queries to actual Twitter accounts.
 */
const twitterAccountTranslationMap: Map<string, string> = new Map([
	["", "michigantech"],
	["mtuhky", "mtuhky"],
	["hockey", "mtuhky"],
	["it", "michigantechit"],
	["mtuhuskies", "mtuhuskies"],
	["huskies", "mtuhuskies"],
	["sports", "mtuhuskies"]
]);

/**
 * Creates a human-readable string from a {@link Tweet} object.
 *
 * @param tweet The Tweet object for which to create a human-readable timestamp.
 * @return A human-readable string from a Tweet object.
 */
function parseReadableTimestampFromTweet(tweet: Tweet): string {
	
	const date: MillenniumDate = MillenniumDate.fromDate(new Date(tweet.getTimestamp()));
	
	let result: string = "";
	
	result += date.getMonth().toString();
	result += " " + date.getDayOfMonth() + MillenniumDateMath.getOrdinalIndicator(date.getDayOfMonth());
	result += " at " + date.getHourOfDay12Hour() + ":";
	
	const minuteOfHour: number = date.getMinuteOfHour();
	
	result += (minuteOfHour < 10 ? "0" + minuteOfHour : minuteOfHour.toString());
	result += date.get12HourPeriod().toString();
	
	return result;
	
}

export class TrevorCommands implements BlizzardCommands {

	public getCommands(): KBCommand[] {

		return [ this.getTwitterCommand() ];

	}
	
	public getTwitterCommand(): KBCommand {
		
		return {
			name: "twitter",
			description: "Get a digest of Tweets from various Michigan Tech related Twitter accounts.",
			usage: "!twitter mtuhky",
			handler: async (message: KBMessage, response: KBResponse): Promise<void> => {
				
				let queryItems: string[] = [];
				
				// Normalize the parameters.
				for (const param of message.getParameters()) {
					
					if (typeof param === "number") queryItems.push(param.toString());
					else queryItems.push(param.trim().toLowerCase());
					
				}
				
				// Ignore leading references to 'Michigan Tech'.
				if ((queryItems[0] === "mtu") || (queryItems[0] === "michigantech")) {
					
					queryItems = queryItems.splice(0, 1);
					
				} else if ((queryItems[0] === "michigan") && (queryItems[1] === "tech")) {
					
					queryItems = queryItems.splice(0, 2);
					
				}
				
				let query: string = (message.getParameters() as string[]).join(" ");
				
				if (query.startsWith("mtu")) query = query.substring("mtu".length);
				if (query.startsWith("michigantech")) query = query.substring("michigantech".length);
				
				if (twitterAccountTranslationMap.has(query)) {
					
					let result: string = "";
					
					for (const tweet of await client.getTweetsByUserScreenName(twitterAccountTranslationMap.get(query) as string)) {
						
						result += "> *" + tweet.getUserName() + " (@" + tweet.getUserScreenName() + ")*\n";
						result += "> " + tweet.getBody().replace(/[\n\r]/g, " ") + "\n";
						result += "> " + parseReadableTimestampFromTweet(tweet);
						result += "\n\n";
						
					}
					
					result = result.replace(/@/g, "\\@");
					
					await response.send(result);
					
				} else if (query === "list") {
					
					await response.send("Here's a list of Twitter accounts I know about:\n" +
						"    • *michigantech* - The official Twitter account for the Michigan Technological University.\n" +
						"    • *mtuhky* - For all that happens on the ice with the Michigan Tech Huskies.\n" +
						"    • *mtuhuskies* - The official Michigan Tech Sports account of MTU.\n" +
						"    • *michigantechit* - For news, updates, and events surrounding IT at Michigan Tech."
					);
					
				} else {
					
					await response.send("Sorry! It doesn't look like '" + message.getParameters().join(" ") +
						"' references a valid MTU-related Twitter account that I am aware of.\nIf you'd like to see a" +
						" list of valid accounts to check, use the command `!twitter list`.");
					
				}
			
			}
		};
		
	}

}
