var libarary = [BookOne, BookTwo]

var BookOne = {
    title: "Javascript for Beginners",
    body: ['You have to know how to use console', 'Better be good at using Google', 'Table tennis is also a good skill'],
}

var BookTwo = {
    title: "Javascript for Nerds",
    body: ['It\'s not that hard', 'You don\'t have to be a nerd', 'Now you\'re a legend'],
}

function readBook(BookNumber) {
    console.log('Title: ' + BookNumber.title)
    for (i = 0; i < BookNumber.body.length; i++ ) {
        console.log('Page ' + (i + 1) + ': ' + BookNumber.body[i])
    }
}


readBook(BookTwo)
readBook(BookOne)


// function readBook(BookNumber) {
//     console.log('Title: ' + BookNumber.title)
//     for (var key in BookNumber.body) {
//         var PageNumber = eval(key) + 1
//         console.log('Page ' + PageNumber + ': ' + BookNumber.body[key])
//     }
// }
