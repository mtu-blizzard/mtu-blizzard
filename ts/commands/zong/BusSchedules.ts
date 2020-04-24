/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

export interface BusRoute {
	days: number[];
	hours: number[];
	routes: {
		[key: string]: number[]
	};
}


export type BusRouteNames =
	"husky-campus-daily"
	| "husky-campus-nightly"
	| "city-commuter"
	| "daniel-heights"
	| "shopping-weekdays"
	| "shopping-saturday";

export type BusRoutes = { [key in BusRouteNames]: BusRoute; };

export function getReadableTime(time: number): string {

	let timeAsString: string = time + "";
	if (timeAsString.length === 3) timeAsString = "0" + timeAsString;

	const hourAsString: string = timeAsString.substr(0, 2);
	const minuteAsString: string = timeAsString.substr(2, 2);

	const hours: number = parseInt(hourAsString);
	const minutes: number = parseInt(minuteAsString);

	if (Number.isNaN(hours) || Number.isNaN(minutes)) return "" + time;

	const date: Date = new Date(2016, 11, 17, hours, minutes, 0, 0);

	return date.toLocaleTimeString().replace(RegExp(":00", "g"), "");
}

export const possibleNamesForRoute: { [possibleInput: string]: BusRouteNames } = {
	"husky-campus-day": "husky-campus-daily",
	"husky-campus-during-day": "husky-campus-daily",
	"campus-daily": "husky-campus-daily",
	"campus-day": "husky-campus-daily",
	"husky-campus-night": "husky-campus-nightly",
	"husky-campus-during-night": "husky-campus-nightly",
	"campus-nightly": "husky-campus-nightly",
	"campus-night": "husky-campus-nightly",
	"city-commuter": "city-commuter",
	"city": "city-commuter",
	"daniel-heights": "daniel-heights",
	"shopping-weekdays": "shopping-weekdays",
	"shopping": "shopping-weekdays",
	"shopping-saturday": "shopping-saturday"



	// add more here where the left hand side is something someone could type in
	// and the right hand side is one of the types from "BusRouteNames".
	// make sure to make them lower case and use "-" instead of space so the parser can find them.

};

const names: BusRouteNames[] = [
	"husky-campus-daily",
	"husky-campus-nightly",
	"city-commuter",
	"daniel-heights",
	"shopping-weekdays",
	"shopping-saturday"
	// put the rest in here
];

export function loopRouteName(): string[] {
	return names.map((name: string): string => {
		return name.replace(RegExp("-", "g"), " ");
	});
}

/**
 * Get the route names.
 */
export function getBusRouteNames(): string[] {

	return Object.keys(possibleNamesForRoute).map((key: string): string => {

		return key.replace(RegExp("-", "g"), " ");

	});

}

/**
 * Helper method to specified information from BusRoute
 * @param route	BusRoute key-value pair
 * @param switcher	key or value
 * @param switcher2	which item
 */
function getRouteInfo(route: BusRoute | undefined, switcher: boolean, switcher2: number): string[] | number[] {
	// @ts-ignore
	const items: object[] = Object.values(route);	// get value of BusRoute

	if (switcher)	// true is key
	{
		return Object.keys(items[switcher2]);
	}
	return Object.values(items[switcher2]);
}

// /**
//  * Get value of BusRoute objects: Day, time, and stops
//  * @param input BusRoute key-value pair
//  */
// export function getBusRouteValues(input: BusRoute): object[]
// {
// 	return Object.values(input);
// }

/**
 * Get day of operation in number array
 * @param input
 */
export function getOperationDay(input: BusRoute | undefined): string[] | number[] {
	// const items:object[] = Object.values(input);	// get values of object array BusRoute
	//
	// return Object.values(items[0]);
	return getRouteInfo(input, false, 0);
}

/**
 * Get hour of operation in number array
 * @param input
 */
export function getOperationHour(input: BusRoute | undefined): number[] {
	return getRouteInfo(input, false, 1) as number[];
}

/**
 * get string array of stops
 * must make sure input is actually BusRoute object rather than undefined ( AKA don't exist)
 * @param input BusRoute object
 */
export function getStopsFromBusRoute(input: BusRoute | undefined): string[] | number[] {
	// const items:object[] = Object.values(input);	// get the values of object array BusRoute
	//
	// return Object.keys(items[2]);					// return array of stop names
	return getRouteInfo(input, true, 2);
}

export function getTimeForStops(input: BusRoute | undefined): number[]
{
	return getRouteInfo(input, false, 2) as number[];
}
export function getBusRouteForInput(input: string): BusRoute | undefined {

	input = input.replace(RegExp(" ", "g"), "-");
	input = input.toLowerCase();

	if (busRoutes.hasOwnProperty(input)) return busRoutes[(input as BusRouteNames)];

	const possibleName: BusRouteNames | undefined = possibleNamesForRoute[input];
	if (possibleName) return busRoutes[possibleName];

	return undefined;

}

/**
 * return if the route contains said stop
 * @param route	BUsRoute
 * @param stop	string name of stop
 */
export function containStop(route: BusRoute | undefined, stop: string): boolean {
	const stops: string[] | number[] = getStopsFromBusRoute(route);
	let i: number;

	for (i = 0; i < stops.length; i++) {
		// console.log("stops[i]= "+stops[i].toLowerCase()+ " stop= "+stop.toLowerCase());
		// @ts-ignore
		if (stops[i].toLowerCase() === stop.toLowerCase()) {
			// console.log("true");
			return true;
		}
	}
	return false;
}

export const busRoutes: BusRoutes = {
	"husky-campus-daily": {
		days: [1, 2, 3, 4, 5],
		hours: [730, 1745],
		routes: {
			"MUB": [10, 30, 50],
			"Forestry Building (Lot 21/26 Sidewalk)": [12, 32, 52],
			"Forestry Building (Read Parking Lot)": [13, 33, 53],
			"SDC": [15, 35, 55],
			"Gates Tennis Center Front Door": [16, 36, 56],
			"Lot 32 (St. Ai's)": [18, 38, 58],
			"Woodland (Behind Wads)": [21, 41, 1],
			"Library": [24, 44, 4],
		}
	},
	"husky-campus-nightly": {
		days: [1, 2, 3, 4, 5],
		hours: [1830, 2125],
		routes: {
			"MUB": [10, 30, 50],
			"SDC": [15, 35, 55],
			"Upper Heights": [18, 38, 58],
			"Lower Heights (Stop Sign)": [20, 40, 0],
			"Woodland (behind Wads)": [21, 41, 1],
			"Library": [24, 44, 4],
		}
	},
	"city-commuter": {
		days: [1, 2, 3, 4, 5],
		hours: [705, 1730],
		routes: {
			// you cannot have duplicate keys in an object so I removed the second "MUB"
			// and put its values right here in the first one.
			"MUB": [5, 35, 30, 0],
			"City Center": [8, 38],
			"Econo Foods": [11, 41],
			"Walmart": [17, 47],
			"Razorback Stop": [18, 48],
			"Houghton Ave & 4th Street": [21, 51],
			"Houghton Ave & Bridge Street": [22, 52],
			"Houghton County Courthouse": [23, 52],
			"Houghton Ave & Portage Street": [24, 54],
			"Houghton Ave & Franklin Street": [25, 55],
			"Houghton Ave &  Agate Street": [26, 56],
			"Houghton Ave & Emerald Street": [27, 57]
		}
	},
	"daniel-heights": {
		days: [1, 2, 3, 4, 5],
		hours: [720, 1800],
		routes: {
			"MUB": [0, 20, 40],
			"SDC": [5, 25, 45],
			"Upper Heights": [10, 30, 50],
			"Lower Heights": [14, 34, 54],
			"Library": [17, 37, 57]
		}
	},
	"shopping-weekdays": {
		days: [3, 4, 5],
		hours: [1815, 2130],
		routes: {
			"Upper Heights": [15, 100, 145, 230, 315],
			"Lower Heights": [20, 105, 150, 235, 320],
			"Behind Wads": [23, 108, 153, 238, 323],
			"Library": [28, 113, 158, 243, 328],
			"MUB": [30, 115, 200, 245, 330],
			"Econo": [40, 125, 210, 255],
			"WalMart": [50, 135, 220, 305]
		}
	},
	"shopping-saturday": {
		days: [6],
		hours: [1200, 1645],
		routes: {
			"Upper Heights": [0, 45, 130, 215, 300, 345, 430],
			"Lower Heights": [5, 50, 135, 220, 305, 350, 435],
			"Behind Wads": [8, 53, 138, 223, 308, 353, 438],
			"Library": [13, 58, 143, 228, 313, 358, 343],
			"MUB": [15, 100, 145, 230, 315, 400, 445],
			"Econo": [25, 110, 155, 240, 325, 410],
			"WalMart": [35, 120, 205, 250, 335, 420]
		}
	}
};