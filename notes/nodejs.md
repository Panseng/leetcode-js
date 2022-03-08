
## 模块化编程
javascript模块规范有两种：CommonJS 和 ES6 modules
- CommonJS中,暴露模块使用module.exports和exports，加载模块使用require()。
- ES6 module，以export指令导出接口，以import引入模块。
- 在我们一贯的node模块中，我们依然采用的是CommonJS规范，使用require引入模块，使用module.exports导出接口。

命名式导出每个模块可以多个，而默认导出每个模块仅一个。
```javascript
// 命名式导出
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var
export let name1 = …, name2 = …, …, nameN; // also var, const
 
// 默认导出（定义式导出）
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };
 
export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```
更详细的参考：https://blog.csdn.net/p3118601/article/details/100150075
