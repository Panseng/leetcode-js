## [402. 移掉 K 位数字](https://leetcode-cn.com/problems/remove-k-digits/)
给你一个以字符串表示的非负整数 num 和一个整数 k ，移除这个数中的 k 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。

> 示例 1 ：
> 输入：num = "1432219", k = 3
> 输出："1219"
> 解释：移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219 。
> 
> 示例 2 ：
> 输入：num = "10200", k = 1
> 输出："200"
> 解释：移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
> 
> 示例 3 ：
> 输入：num = "10", k = 2
> 输出："0"
> 解释：从原数字移除所有的数字，剩余为空就是 0 。
> 
> 示例 4 ：
> 输入：num = "115", k = 1
> 输出："11"

思路：贪心+单调栈
```javascript
removeKdigits = function(num, k){
  const stack = []
  for (const digit of num){
    while (stack.length > 0 && stack[stack.length-1] > digit && k){ // 保证前值 正向排序
      stack.pop()
      k--
    }
    stack.push(digit)
  }
  for (; k > 0; k--){
    stack.pop()
  }
  let ans = ""
  let isFirstZero = true
  for(const digit of stack){
    if (isFirstZero && digit === "0"){ // 跳过前值为0
      continue
    }
    isFirstZero = false
    ans += digit
  }
  return ans === "" ? "0" : ans
}
```
~~思路：比较首2位~~
有BUG：115，113移除1位
```javascript
var removeKdigits = function(num, k) {
  if (k >= num.length){
    return "0"
  }
  // 没办法考虑数位小，删除头尾有差异的值
  // 如 112，删除1位
  for (;k > 0 && num.length > 0;k--){
    if (num.match(/^[0-9]0+/)){
      num = num.replace(/^[0-9]0+/, "")
      continue
    }
    if (num[0]-0 >= num[1]-0){
      num = num[1] === "0" ? num.substring(2) : num.substring(1)
    } else {
      num = num[0] + num.substring(2)
    }
  }
  if (k > 0 || num === ""){
    return "0"
  }
  return num
};
```

## [456. 132 模式](https://leetcode-cn.com/problems/132-pattern/)
给你一个整数数组 nums ，数组中共有 n 个整数。132 模式的子序列 由三个整数 nums[i]、nums[j] 和 nums[k] 组成，并同时满足：i < j < k 和 nums[i] < nums[k] < nums[j] 。 \
如果 nums 中存在 132 模式的子序列 ，返回 true ；否则，返回 false 。

> 示例 1： \
> 输入：nums = [1,2,3,4] \
> 输出：false \
> 解释：序列中不存在 132 模式的子序列。
> 
> 示例 2： \
> 输入：nums = [3,1,4,2] \
> 输出：true \
> 解释：序列中有 1 个 132 模式的子序列： [1, 4, 2] 。
> 
> 示例 3： \
> 输入：nums = [-1,3,2,0] \
> 输出：true \
> 解释：序列中有 3 个 132 模式的的子序列：[-1, 3, 2]、[-1, 3, 0] 和 [-1, 2, 0] 。

思路：枚举1
- 题目要求满足132模式，132模式的规律是： nums [i, ..., j..., k] i < k < j
- 如果要达到132模式，至少得满足得存在三个数字 分别为 min， max， mid，而且是min， max， mid这个顺序不能调换
- 我们从右向左遍历，用单调栈，具体来说是单调递增栈，每个元素入栈，在入栈之前只要栈顶元素比当前元素小就出栈，这样保证了栈的单调递增性
- 为什么要用单调栈呢，因为我们要找到132模式中的次大者，单调栈中栈顶元素永远是最大值，这时，如果再遇到一个元素比栈顶元素还大，那栈顶元素是不是就是次大者
- 这时，如果再遇到一个比次大者还小的元素，是不是就满足了132模式。而且我们是按照数组从右到左遍历的顺序
```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
    const stack = []
    // 存放132模式中的次大者
    let maxK = -Number.MAX_SAFE_INTEGER
    for (let i = nums.length-1; i >= 0; i--){
        // 单调栈情况下找到了次大者，再找到比次大者小的元素则满足了132模式
        if (nums[i] < maxK){
            return true
        }
        // 如果栈中有值，并且栈顶的值还小于当前元素
        // 只要栈顶比当前元素小就出栈，保证了栈内元素是升序的，栈顶是【栈中】最大值
        while(stack.length > 0 && nums[i] > stack[stack.length-1]){
            // 保存次大值
            maxK = stack.pop()
        }
        // 每个元素都入栈
        stack.push(nums[i])
    }
    return false
};
```

