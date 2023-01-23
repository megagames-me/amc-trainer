/**
 * Gets initials from name 
 *
 * Usage:
 * ```ts
 * initials("Anvay Mathur") = "AM";
 * initials("Donald John Banana Lol Trump") = "DT";
 * ```
 */
export function initials(name: string): string {
	let nameArr = name.split(" ");
	if (nameArr.length == 0) return "?";
	if (nameArr.length == 1) return nameArr[0][0];
	else return nameArr[0][0] + nameArr[nameArr.length - 1][0];
}