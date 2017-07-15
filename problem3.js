/*
Problem : 3
=========================================================================================================

Write a program to find pairs of positive integers (A,B) whose sum is equal to the input number N (N < 10 power 6).

The conditions to be satisfied by A & B are:
● A has at least two digits and starts with a non-zero digit 
● B always has one digit less than A 
● B can start with 0 
● B is obtained from A by leaving out one digit.

The output should also indicate the number of such pairs. For example, if we input 1002 to the program, the output should be as follows: 

4 pairs found: 
906 + 96 = 1002 
911 + 91 = 1002 
951 + 51 = 1002 
1001 + 001 = 1002

--------------------------------------------------------------------------

Assuming input is provided in testdata.in with the following contents:
2
1002
11

Line 1: Number of test cases
Line 2 Onwards: The Number itself

Print the output in the following format.
---------------------------------------------------------------------------
TEST #1
4 pairs found
906 + 96 = 1002
911 + 91 = 1002
951 + 51 = 1002
TEST #2
1 pair found
10 + 1 = 11

Link to test file: https://dl.dropboxusercontent.com/s/fb85x5m8ycenpgb/testdata.in?dl=

*/

var fs = require('fs');

var printAnswer = function(answer, t, n) {
	console.log("Test #" + t);
	if(answer.length == 1) {
		console.log(answer.length + " pair found");
	} else {
		console.log(answer.length + " pairs found");
	}
	for(var l = 0; l < answer.length; l++) {
		console.log(answer[l].a + " + " + answer[l].b + " = " + n)
	}
}

var findPairs = function(n, t) {
	var count = 0;
	var answers = [];
	var tpair = {};
	for(var i = 0;;i++) {
		var divisor = 11 * Math.pow(10, i);
		var D;
		var ABC;
		if(divisor != 11 && n % 2 == 1) {
			break;
		}
		if(Math.floor(n / divisor) == 0) {
			count++;
			if(count > 1)
				break;
			divisor = Math.pow(10, i);
			var prev = Math.floor(n / divisor);
			var rear;
			var A;
			if(prev == 10) {
				if(n != 10) {
					A = 9;
					rear = Math.floor((n - 9 * divisor) / 2);
					tpair.x = A * divisor + rear;;
					tpair.y = rear;
					if(!answers.filter(function(x){return x.a == tpair.x})[0]) {
						answers.push({a: tpair.x, b: tpair.y});
					}
				}
				
				A = 1;
				rear = Math.floor((n - 10 * divisor) / 2);
				
				tpair.x = A * divisor * 10 + rear;
				tpair.y = rear;
				if(!answers.filter(function(x){return x.a == tpair.x})[0]) {
					answers.push({a: tpair.x, b: tpair.y});
				}
			} else {
				if(prev != 1){
					A = prev-1;
					rear = Math.floor((n - A * divisor) / 2);
					tpair.x = A * divisor + rear;
					tpair.y = rear;
					if(!answers.filter(function(x){return x.a == tpair.x})[0]) {
						answers.push({a: tpair.x, b: tpair.y});
					}
				}
				A = prev;
				rear = Math.floor((n - A * divisor) / 2);
				tpair.x = A * divisor + rear;
				tpair.y = rear;
				if(!answers.filter(function(x){return x.a == tpair.x})[0]) {
					answers.push({a: tpair.x, b: tpair.y});
				}
			}
		} else {
			if(divisor == 11) {
				ABC = Math.floor(n / divisor);
				D = n % divisor;
				tpair.x = ABC * 10 + D;
				tpair.y = ABC;
				if(!answers.filter(function(x){return x.a == tpair.x})[0]) {
					answers.push({a: tpair.x, b: tpair.y});
				}
			} else {
				ABC = Math.floor(n / divisor);
				var n2 = n % divisor;
				divisor = Math.pow(10, i);
				var prev2 = Math.floor(n2 / divisor);
				var rear2;
				var A2;
				if(prev2 == 10){
					A2 = 9;
					rear2 = Math.floor((n2 - 9 * divisor) / 2);
					tpair.x =ABC * divisor * 10 + A2 * divisor + rear2;
					tpair.y= ABC * divisor + rear2;
					if(!answers.filter(function(x){return x.a == tpair.x})[0]) {
						answers.push({a: tpair.x, b: tpair.y});
					}
					
					A2 = 1;
					rear2 = Math.floor((n2 - 10 * divisor) / 2);
					tpair.x = ABC * divisor * 10 + A2 * divisor * 10 + rear2;
					tpair.y = ABC * divisor + rear2;
					if(!answers.filter(function(x){return x.a == tpair.x})[0]) {
						answers.push({a: tpair.x, b: tpair.y});
					}
				} else {
					
					A2 = prev2 - 1;
					rear2 = Math.floor((n2 - A2 * divisor) / 2);
					tpair.x = ABC * divisor * 10 + A2 * divisor + rear2;
					tpair.y = ABC * divisor + rear2;
					if(!answers.filter(function(x){return x.a == tpair.x})[0]) {
						answers.push({a: tpair.x, b: tpair.y});
					}
					A2 = prev2;
					rear2 = Math.floor((n2 - A2 * divisor) / 2);
					tpair.x = ABC * divisor * 10 + A2 * divisor + rear2;
					tpair.y = ABC * divisor + rear2;
					if(!answers.filter(function(x){return x.a == tpair.x})[0]) {
						answers.push({a: tpair.x, b: tpair.y});
					}
				}
			}
		}
	}

	printAnswer(answers, t, n);
}

var readInputsAndFindPairs = function() {
	var inputs = fs.readFileSync('./input3.txt', 'utf-8')
    .split('\r\n')
    .filter(Boolean);

    var n = inputs[0] - 0;

    for(var i = 1; i <= n; i++) {
    	findPairs(inputs[i] - 0, i);
    }
}

readInputsAndFindPairs();
