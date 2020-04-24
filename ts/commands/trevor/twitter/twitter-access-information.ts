/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	4:25 PM -- March 22nd, 2020.
 *	Project: mtu-blizzard
 */

/**
 * A interface representing the information required to access the Twitter API via this package.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface TwitterAccessInformation {
	
	consumerKey: string;
	
	consumerSecret: string;
	
	accessTokenKey: string;
	
	accessTokenSecret: string;

}
