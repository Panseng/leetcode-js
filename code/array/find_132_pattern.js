/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
  let n = nums.length;
  if (n < 3){
    return  false
  }
  // 小到大
  tails = nums[n-1] < nums[n-2] ? [nums[n-1], nums[n-2]]: [nums[n-2], nums[n-1]];
  for (let i = n-3; i >= 0; i--){
    if (nums[i] > tails[0] && nums[i] < tails[1]) return true
  }
};