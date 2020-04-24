/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */
import {KBCommand} from "@elijahjcobb/keybase-bot-builder";

/**
 * An interface for an object that contains bot commands.
 */
export interface BlizzardCommands {

	/**
	 * Return an array of KBCommand objects.
	 */
	getCommands(): KBCommand[];

}