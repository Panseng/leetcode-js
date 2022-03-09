
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
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

numStr = "1432219"
k = 3
console.log(removeKdigits(numStr, k))

numStr = "10200"
k = 2
console.log(removeKdigits(numStr, k))

numStr = "10"
k = 2
console.log(removeKdigits(numStr, k))

numStr = "5438219"
k = 3
console.log(removeKdigits(numStr, k))

numStr = "100000432219"
k = 3
console.log(removeKdigits(numStr, k))