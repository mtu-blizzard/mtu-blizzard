/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {BlizzardCommands} from "../../BlizzardCommands";
import {KBCommand, KBMessage, KBResponse} from "@elijahjcobb/keybase-bot-builder";
import {
	BusRoute,
	containStop,
	getBusRouteForInput,
	getOperationDay, getOperationHour, getReadableTime,
	getStopsFromBusRoute, getTimeForStops,
	loopRouteName
} from "./BusSchedules";

export class ZongCommands implements BlizzardCommands {

	private nameOfDay(input: number): string {
		switch (input) {
			case 1: {
				return "Monday";
			}
			case 2: {
				return "Tuesday";
			}
			case 3: {
				return "Wednesday";
			}
			case 4: {
				return "Thursday";
			}
			case 5: {
				return "Friday";
			}
			case 6: {
				return "Saturday";
			}
			case 7: {
				return "Sunday";
			}
			default: {
				return "everyday";
			}

		}
	}

	private dontTrackThatRoute(): string {
		return "Whoops! I don't track that route. I track the following routes: " +
			loopRouteName().join("--> ") + ".\n" + this.printHelp(false);
	}

	private routeExist(line: string): boolean {
		return getBusRouteForInput(line) !== undefined;	//get BusRoute associated with line
	}

	/**
	 * return route of the line
	 * @param routeName
	 */
	private getStops(routeName: string): string {
		const route: BusRoute | undefined = getBusRouteForInput(routeName);	// get BusRoute associated with line

		if (this.routeExist(routeName)) {
			// @ts-ignore
			return ("The route " + routeName + " goes through the following stops: \n" + getStopsFromBusRoute(route).join("-->") + ".");
		} else {
			return this.dontTrackThatRoute();
		}
	}

	/**
	 * array of BusRoute containing the specified stop
	 * @param stop
	 */
	private routesToStop(stop: string): string[] | undefined {
		let i: number;
		let answer: string[] = [];
		// tslint:disable-next-line:typedef
		let routes: string[];
		routes = loopRouteName();	// string of route names

		for (i = 0; i < routes.length; i++) {
			if (containStop(getBusRouteForInput(routes[i]), stop)) {
				// console.log("there are routes contain stop " + stop);
				// console.log(routes[i]);
				// @ts-ignore
				answer = answer.concat(routes[i]);
			}
		}
		console.log("array of BusRoute for routeToStop:" + answer);

		if (answer === []) {
			return undefined;
		} else {
			return answer;
		}
	}

	/**
	 * checks to see which routes stop by the stop
	 * @param stop
	 */
	private routeFromStop(stop: string): string {

		let answer: string | undefined;
		answer = this.routesToStop(stop)?.join(", ");
		console.log("routeFromStop " + answer);
		if (answer === undefined)	// no match, undefined
		{
			return "No routes passes through stop " + stop + "\n" + this.printHelp(false);
		} else {
			return "The following route(s) pass through stop " + stop + ":\n" + answer;
		}

	}

	/**
	 * return operation days in a week and time duration
	 * @param line
	 */
	private busHour(line: string): string {
		const route: BusRoute | undefined = getBusRouteForInput(line);	// get BusRoute associated with line

		if (this.routeExist(line))	// path exist
		{
			let i: number;
			let dayInWeek: string = "";
			const days: string[] | number[] = getOperationDay(route);
			for (i = 0; i < days.length; i++) {
				// @ts-ignore
				dayInWeek = dayInWeek + nameOfDay(days[i]) + ", ";
			}
			console.log(dayInWeek);
			// @ts-ignore
			return "The route " + line + " operates every " + dayInWeek +
				"from " + getReadableTime(getOperationHour(route)[0]) + " to " + getReadableTime(getOperationHour(route)[1]) + ".";
		} else {
			return this.dontTrackThatRoute();
		}
	}

	private stopHour(stop: string): string {
		//loops
		// inner loop
		// tslint:disable-next-line:typedef
		let i: number, j: number, answer: string;
		answer = "Buses go to stop " + stop + " every ";	// to return
		let routes: string[] | undefined;
		routes = this.routesToStop(stop);	//array of String route name

		// console.log(routes);
		if (!routes) 	// undefined?
		{
			return "No routes goes through stop " + stop + ".";
		}

		for (i = 0; i < routes.length; i++) // loop through all routes that go through the stop
		{
			let stops: string[] | number[];
			stops = getStopsFromBusRoute(getBusRouteForInput(routes[i]));
			console.log(stops);
			for (j = 0; j < stops.length; j++)	// loop through each stop of that route, string
			{
				// @ts-ignore
				if (stops[j].toLowerCase() === stop.toLowerCase())	// stop matched
				{
					console.log("get a match");
					// @ts-ignore
					console.log("what are we getting " + getTimeForStops(getBusRouteForInput(routes[i]))[j]);
					// @ts-ignore
					const time: number[] = getTimeForStops(getBusRouteForInput(routes[i]))[j];

					answer = answer.concat(time.join(", "));
				}
			}
			answer = answer.concat(" minutes every hour from " + getReadableTime(getOperationHour(getBusRouteForInput(routes[i]))[0]) +
				" to " + getReadableTime(getOperationHour(getBusRouteForInput(routes[i]))[1]) + " for " + routes[i] + "  line\n");
		}
		return answer;
	}

	/**
	 * list all commands or tell how to do so
	 * @param switcher
	 */
	private printHelp(switcher: boolean): string {
		let words: string;
		if (switcher) {
			words = "Here are a list of available commands for shuttle schedule:\n" +
				"\"!shuttle route *_name of route_*\" : list all stops of this shuttle line\n" +
				"\"!shuttle stop *_name of stop_*\" : list Route(s) going through said stop\n" +
				"\"!shuttle hour *_name of route_*\" : hour of operation for said Route\n" +
				"\"!shuttle time *_name of stop_*\" : time of day each shuttle line goes through said stop";
		} else {
			words = "For a list of available commands for shuttle schedule related function:\n" +
				"Please use the following command: *!shuttle help*";
		}
		return words;
	}

	public getCommands(): KBCommand[] {

		return [
			{
				name: "shuttle",
				description: "check shuttle",
				usage: "!shuttle route City Commuter",
				handler: async (msg: KBMessage, res: KBResponse): Promise<void> => {


					const params: (string | number)[] = msg.getParameters();

					console.log(params);

					if (params.length > 1)		// check valid length of command
					{
						if (typeof params[0] === "string")		//check string command
						{
							let wordsToReturn: string = "what now?";
							let location: string;
							location = params.slice(1, params.length).join(" ");
							console.log("location is: " + location);
							// params[0] = params.toString().toLowerCase();
							if (params[0] === "route") {
								console.log("I read route.");
								wordsToReturn = this.getStops(location);
							} else if (params[0] === "stop") {
								console.log("I read stop.");
								wordsToReturn = this.routeFromStop(location);
							} else if (params[0] === "hour") {
								console.log("I read hour.");
								wordsToReturn = this.busHour(location);
							} else if (params[0] === "time") {
								console.log("I read time.");
								wordsToReturn = this.stopHour(location);
							} else if (params[0] === "help") {
								console.log("I read help.");
								return await res.send(this.printHelp(true));
							} else {
								wordsToReturn = "Whoops! Sorry not sure I can help that " + this.printHelp(false);
							}

							await res.send(wordsToReturn);
						} else {
							await res.send("Please only use string as command. " + this.printHelp(false));
						}
					} else {	// not enough command arguments
						await res.send("Whoops! Sorry not sure I can help that " + this.printHelp(true));
					}

				}
			}
		];

	}

}