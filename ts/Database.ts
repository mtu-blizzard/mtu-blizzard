/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {SiObject, SiQuery} from "@element-ts/silicon";
import {KBMessage} from "@elijahjcobb/keybase-bot-builder";

export interface UserProps<T extends object> {
	username: string;
	storage: T;
}

export class User<T extends object> extends SiObject<UserProps<T>> {

	public constructor() {
		super("user");
	}

}

export class Database {

	public static async fetch<T extends object>(message: KBMessage): Promise<User<T>> {

		const username: string = message.getUsername();

		const query: SiQuery<User<T>, UserProps<T>> = new SiQuery<User<T>, UserProps<T>>(User, {username});
		let obj: User<T> | undefined = await query.getFirst();

		if (obj === undefined) {

			obj = new User<T>();
			obj.props.username = username;
			await obj.create();

		}

		return obj;

	}

}