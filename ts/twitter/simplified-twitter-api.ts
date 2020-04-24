/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:29 PM -- March 22nd, 2020.
 *	Project: mtu-blizzard
 */

import Twitter from "twitter";
import { TwitterAccessInformation } from "./twitter-access-information";
import { SimplifiedTwitterAPIConfig } from "./simplified-twitter-api-config";
import { Tweet } from "./tweet";

/**
 * A simplified version of the Twitter API exposed by the 'twitter' NPM package.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class SimplifiedTwitterAPI {
	
	/**
	 * The Twitter client from the 'twitter' package that is used internally to make requests to their API.
	 */
	private internalClient: Twitter;
	
	/**
	 * A plain object used to store configuration information for the current instance.
	 */
	private config: SimplifiedTwitterAPIConfig;
	
	/**
	 * Initializes a new SimplifiedTwitterAPI instance with the provided access information and optional config object.
	 *
	 * If a config object is not included, the configuration is sourced from the
	 * {@link SimplifiedTwitterAPI#getDefaultConfig} static method, which provides default values for the config.
	 *
	 * @param accessInformation An object containing the identification information required to access the Twitter API.
	 * @param config Configuration information for this new SimplifiedTwitterAPI instance.
	 * @see SimplifiedTwitterAPIConfig
	 */
	public constructor(accessInformation: TwitterAccessInformation,
					   config: SimplifiedTwitterAPIConfig = SimplifiedTwitterAPI.getDefaultConfig()) {
	
		this.internalClient = new Twitter({
			consumer_key: accessInformation.consumerKey,
			consumer_secret: accessInformation.consumerSecret,
			access_token_key: accessInformation.accessTokenKey,
			access_token_secret: accessInformation.accessTokenSecret
		});
		
		this.config = config;
	
	}
	
	/**
	 * Returns a basic set of configuration defaults for instances of this class.
	 *
	 * @return A basic set of configuration defaults for instances of this class.
	 */
	public static getDefaultConfig(): SimplifiedTwitterAPIConfig {
		
		return {
			
			resultLimit: 5,
			
			language: "en"
			
		};
		
	}
	
	/**
	 * Performs a query on the Twitter API for a provided search string, asynchronously returning an array of relevant
	 * {@link Tweet} objects.
	 *
	 * Note that the number of returned tweets is conditionally dependent on the configuration object provided when the
	 * SimplifiedTwitterAPI instance was instantiated. The default number of returned tweets is 5.
	 *
	 * @param query The string query to perform on the Twitter API.
	 * @return A Promise which resolves to an array of Tweet objects.
	 */
	public async search(query: string): Promise<Array<Tweet>> {
	
		let results: Tweet[] = [];
	
		let rawResults: any = await this.internalClient.get(
			"search/tweets",
			{
				q: query,
				lang: this.config.language,
				count: this.config.resultLimit,
				tweet_mode: "extended"
			}
		);
		
		rawResults = rawResults?.statuses ?? [];
		
		for (let result of rawResults) results.push(new Tweet(result));
		
		return results;
	
	}
	
	/**
	 * Performs a query on the Twitter API for a provided username, asynchronously returning an array of relevant
	 * {@link Tweet} objects.
	 *
	 * Note that the number of returned tweets is conditionally dependent on the configuration object provided when the
	 * SimplifiedTwitterAPI instance was instantiated. The default number of returned tweets is 5.
	 *
	 * @param userScreenName The screen name for which to search for relevant tweets.
	 * @return A Promise which resolves to an array of Tweet objects.
	 */
	public async getTweetsByUserScreenName(userScreenName: string): Promise<Array<Tweet>> {
		
		userScreenName = userScreenName.trim();
		
		if (userScreenName.charAt(0) === "@") userScreenName = userScreenName.substring(1);
		
		let results: Tweet[] = [];
		
		let rawResults: any = await this.internalClient.get(
			"statuses/user_timeline",
			{
				screen_name: userScreenName,
				lang: this.config.language,
				count: this.config.resultLimit,
				tweet_mode: "extended"
			}
		);
		
		rawResults = rawResults ?? [];
		
		for (let result of rawResults) results.push(new Tweet(result));
		
		return results;
		
	}
	
}
