// The Prototype

function emailList (name) {
	this.name = name
	this.list = []
	this.addEmail = function (emailaddress) {
		this.list.push(emailaddress)
	}
	this.sendEmailToAll = function (emailtext) {
		console.log("Email content: " + emailtext)
		console.log("Sending email to: " + this.list)
	}
}


// Testing
var list1 = new emailList ('arthur_database')
var list2 = new emailList ('gijs_database')

console.log(list1.name) //arthur_database
console.log(list2.name) //gijs_database


list1.addEmail('arthur.poot1@gmail.com')
list1.addEmail('gijs@nycda.com')

console.log(list1.list) // [ 'arthur.poot1@gmail.com', 'gijs@nycda.com' ]

list1.sendEmailToAll ("yo man, ik kom te laat")




// Write a function that returns the area of a circle, given the radius. Hints: The area of a circle is "pi r 2". For pi, use Math.PI.

function areaCircle (radius) {
	console.log(Math.PI * radius * 2)
}

areaCircle(2)

// Given a string, create a function that returns the last character in that string. example: "cattywampus" --> "s"

function lastChar (string) {
	return string.charAt(string.length - 1)
}

console.log(lastChar('party'))

// Write a function that takes in one parameter "length" and prints out that many stars. example: 3 --> *** 5 --> *****

function printStars (length) {
	console.log('*'.repeat(length))
}

// function printStarsExplicit (length) {
// 	'*'
// 	console.log ()
// }

printStars(5)
printStars(2)


// Now, write a function that takes in one parameter "length" and prints out a square of stars. examples:
// 3 --> *** *** ***

function printSqStars (lenght) {
	var stars = '*'.repeat(lenght) + ' '
	console.log(stars.repeat(lenght))
}

printSqStars(5)
printSqStars(2)

// Given an array of integers, write a function that finds the average and returns it.


function findAverage (nummers) {
	var total = 0
	for (var i = nummers.length - 1; i >= 0; i--) {
		total = total + nummers[i]
		n = nummers.length
	}
	console.log(total)
}

function findAverageExpress (nummers) {
	var sum = nummers.reduce(function(a, b) { return a + b; }, 0)
	num = nummers.length
	console.log("express: " + (sum/num))

}

findAverage([10,2,3])
findAverage([1,2,3])
findAverageExpress([5,10,15])


// OPTIONAL CHALLENGE
// Write a function that takes in two arrays of integers and returns the largest common integer. If there are no common integers, return 'undefined'.


var array1 = [10,4,22,8,1,9]
var array2 = [13,10,5,3,12,22]

function largestPair (array1, array2) {
	var largestInt = 0
	var pairFound = false
	//sort array1 decending order 
	array1.sort(function(a, b){return b-a});

	//take highest array1 value and compare against all array2 values
	for (var i = 0; i < array1.length; i++) {
		if (pairFound == false) {
			for (var j = 0; j < array2.length; j++) {
				if (array1[i] == array2[j]) {
					console.log("largest pair is " + array2[j])
					pairFound = true
				}
			}
		}
	} //if in the end no pair is found print: no pair found
	if (pairFound == false) {
		console.log("No pairs found")
	}
}

largestPair(array1, array2)

