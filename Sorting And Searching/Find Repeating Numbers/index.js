/* 
Given an array containing numbers 1 up to 32,000, console log all repeating numbers.
You only have 4 kilobytes of memory available.

Example
findRepeating([1, 2, 2, 3, 4, 5, 6, 6]) --> 2, 6
*/

function findRepeating(nums) {
  const booleanArray = new Array(32000).fill(false);
  for (const num of nums) {
    if (booleanArray[num] === false) {
      booleanArray[num] = true;
    } else {
      console.log(num);
    }
  }
}

findRepeating([1, 2, 2, 3, 4, 5, 6, 6]);
