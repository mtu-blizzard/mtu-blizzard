/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:36 PM -- March 22nd, 2020.
 *	Project: mtu-blizzard
 */

/**
 * A Tweet!
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class Tweet {
	
	/**
	 * The body content of the tweet.
	 */
	private body: string;
	
	/**
	 * The username of the tweet's author.
	 *
	 * This is the thing after the '@' sign for users, i.e. the identifier that is used to login to Twitter.
	 *
	 * Ex: @mtu
	 */
	private userName: string;
	
	/**
	 * The screen name of the tweet's author.
	 *
	 * This is the 'other name' on the Twitter account, typically the person's actual given name.
	 *
	 * ex: Michigan Technological University
	 */
	private userScreenName: string;
	
	/**
	 * A timestamp for the time at which the tweet was created.
	 */
	private timestamp: string;
	
	/**
	 * Initializes a new Tweet by reading in the raw object obtained from the API.
	 *
	 * @param rawTweet The raw response given by the API.
	 */
	public constructor(rawTweet: any) {
	
		this.body = rawTweet?.full_text ?? "Failed to read tweet.";
		this.userName = rawTweet?.user?.name ?? "Failed to read user's name.";
		this.userScreenName = rawTweet?.user?.screen_name ?? "Failed to read user's screen name.";
		this.timestamp = rawTweet?.created_at ?? "";
	
	}
	
	/**
	 * Returns the body of the tweet.
	 *
	 * @return The body of the tweet.
	 */
	public getBody(): string {
		
		return this.body;
		
	}
	
	/**
	 * Returns the username of the tweet's author.
	 *
	 * @return The username of the tweet's author.
	 */
	public getUserName(): string {
		
		return this.userName;
		
	}
	
	/**
	 * Returns the screen name of the tweet's author.
	 *
	 * @return The screen name of the tweet's author.
	 */
	public getUserScreenName(): string {
		
		return this.userScreenName;
		
	}
	
	/**
	 * Returns the string timestamp for the tweet.
	 *
	 * @return The string timestamp for the tweet.
	 */
	public getTimestamp(): string {
		
		return this.timestamp;
		
	}
	
	/**
	 * Returns a representative string for the current tweet in the format:
	 *
	 * "John Smith (@jsmitty)
	 * Hey, this is a tweet!"
	 *
	 * @return A representative string for the current tweet.
	 */
	public toString(): string {
		
		return this.userName + " (@" + this.userScreenName + ")\n" +
			this.body;
		
	}
	
}
