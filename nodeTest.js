// run    node nodeTest.js     to test it.
// const reg = /^(http(s)?:\/\/)?(www\.youtube\.com|youtube\.com|youtu\.be)\/.*[\?\&]v=([\d\w]+)[\&]?/i;
const reg = /^(http(s)?:\/\/)?(((www\.youtube\.com|youtube\.com)\/.*[\?\&]v=([\d\w]+)[\&]?)|(youtu\.be\/([\d\w]+)))/i;
const st1 = 'https://www.youtube.com/watch?v=f1SZ5GaAp3g';
const st2 = 'https://youtu.be/f1SZ5GaAp3g';
const st3 = 'youtu.be/f1SZ5GaAp3g';
const st4 = 'https://www.youtube.com/watch?a=bb&v=f1SZ5GaAp3g&b=ccc';
const st5 = 'https://www.youtube.com/watch?v=f1SZ5GaAp3g&b=ccc';
var result = reg.exec(st4);
console.log(result[0]);
console.log(result[1]);
console.log(result[2]);
console.log(result[3]);
console.log(result[4]);
console.log(result[5]);
console.log(result[6]);
console.log(result[7]);
console.log(result[8]);
console.log(result[6]||result[8])
result = reg.exec(st2);
console.log(result[8]);
result = reg.exec(st3);
console.log(result[8]);
console.log(result.length);
console.log(reg.test(st1));
console.log(reg.test(st2));
console.log(reg.test(st3));
console.log(reg.test(st4));
console.log(reg.test(st5));
