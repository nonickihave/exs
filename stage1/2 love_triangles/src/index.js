/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */
module.exports = function getLoveTrianglesCount(preferences = []) {
	// your implementation
	// to make indexes correspond to values positions (like in [2,3,1] 2 has the first position => [undefined, 2,3,1] has the first index
	preferences.unshift(undefined);

	// any love triangles (including duplicates)
	var loveTriangles = [];
	for (var i = 0, length = preferences.length; i < length; i++) {
		// if starting from the current position there's a love triangle, add it, null otherwise
		loveTriangles.push(getLoveTriangle(preferences, i));
	}
	// get rid of not loving triangles
	loveTriangles = loveTriangles.filter(elem=> elem != null);

	// get rid of duplicates
	loveTriangles = removeDuplicateTriangles(loveTriangles);

	return loveTriangles.length;
};

/**
 * Removes triangles treated as duplicate (in context of the current task)
 * @param triangles
 * @returns {Array} an array of triangles with no duplicates
 */
function removeDuplicateTriangles(triangles) {
	var result = [];
	while (triangles.length != 0) {
		var current = triangles.shift();
		result.push(current);
		triangles = triangles.filter(triangle => !areEqual(current, triangle));
	}

	return result;
}

/**
 * Identifies if two triangles (in context of the current task, love triangles) are equal.
 * Thus, [2,3,1] and [3,1,2] are equal (2 loves three, 3 loves one, 1 loves 2 in both arrays)
 * @param arr1
 * @param arr2
 * @returns {boolean}
 */
function areEqual (arr1, arr2)  {
	var bothAreEqual = true;
	for (var i = 0, length = arr1.length; i < length; i++) {
		var a = arr1[i],
			nextIndex = i + 1,
			b = arr1[nextIndex < length ? nextIndex : 0];
		if (!bLovesA(b, a, arr2)) {
			bothAreEqual = false;
			break;
		}
	}
	return bothAreEqual;
};

/**
 * Goes through who loves whom and checks if the third element in the triangles loves the first :D
 * @param arr array
 * @param pos position (shouldn't be index);
 * @returns {[] or null} a love triangle if it is, null otherwise
 */
function getLoveTriangle(arr, pos) {
	var whomLovesFirst = arr[pos],
		whomLovesSecond = arr[whomLovesFirst],
		whomLovesThird = arr [whomLovesSecond],
		allAreUnique = pos != whomLovesFirst && pos != whomLovesSecond && whomLovesFirst != whomLovesSecond,
		isLoveTriangle = allAreUnique && whomLovesThird == pos;
	return (allAreUnique && isLoveTriangle) ? [whomLovesFirst, whomLovesSecond, whomLovesThird] : null;
};

/**
 * In context of the current task, identifies if element  b loves element a in a given array
 * @param b value of element b
 * @param a value of element a
 * @param arr array containing b and a
 * @returns {boolean} true/false
 */
function bLovesA (b, a, arr) {
	var indexA = arr.indexOf(a),
		indexB = arr.indexOf(b),
		twoAreValid = indexA != -1 && indexB != -1,
		result = twoAreValid && (indexB == 0 ? (indexA == arr.length - 1) : (indexB - 1 == indexA));

	return result;
};