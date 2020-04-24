/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:33 PM -- March 22nd, 2020.
 *	Project: mtu-blizzard
 */

/**
 * An interface representing a configuration object for a {@link SimplifiedTwitterAPI} instance.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface SimplifiedTwitterAPIConfig {
	
	/**
	 * The number of results to return for queries to the Twitter API that return some number of tweets as a result.
	 */
	resultLimit: number;
	
	/**
	 * The dialect of the transaction with the Twitter API.
	 */
	language: string;

}
