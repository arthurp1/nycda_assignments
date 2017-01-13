
/*Part 1*/

function findSum (a,b) {
	return (a + b )
}

function findProduct(c,d) {
	return (c * d )
}

/*Part 2*/

function threeOperation (x,operation) {
	console.log(operation(x,3))
}

/*Part 3*/

threeOperation (4,findSum) //7
threeOperation (5,findSum) //8
threeOperation (4,findProduct) //12
threeOperation (5,findProduct) //15
