$(document).ready(function(){
  console.log('jquery working')

  $('.comment_form').on('submit', function(e) {
    e.preventDefault()
    console.log('login submit')
    var $messageId = $('.message_id').val()
    var $commentInput = $('.comment_input').val()
    var $commentForm = {
      messageId: $messageId,
      comment: $commentform
    }
    $.post({
      url: '/ajaxcomment'
      data: $commentForm
    })

  })

  //
  // $('#post_btn').on('click', function(e) {
  //   console.log('button pressed')
  //   $.post('/form', function(data, status){
  //       console.log("data: " + data + 'whatever' + status)
  //     })
  //   })
  //
  // $('#login_form').on('submit', function(e){
  //   e.preventDefault()
  //   console.log('login submit')
  //   var $user = $('#user_name').val()
  //   var $password = $('#password').val()
  //   var formInput = {
  //     user: $user,
  //     password: $password
  //   }
  //   $.post({
  //     url: '/loginhandler',
  //     data: formInput,
  //     success: function(data) {
  //       console.log(data)
  //       }
  //     })
  // })
})

//     $('#message_form').on('submit', function(e){
//       // e.preventDefault()
//       var $creator = $('#first_name').val()
//       var $title = $('#title').val()
//       var $body = $('#textarea').val()
//       var formInput = {
//         creator: $creator,
//         title: $title,
//         body: $body
//       }
//       console.log(formInput)
//       $.post({
//         url: '/',
//         data: formInput,
//         success: (data) => {console.log(data)}
//         })
//
//     })
// })


// var statusMessage = function(text) {
//   console.log('statusmessagecalled')
//   setTimeout(function () {
//     $('h1').append('blablabla')
//   }, 300);
// }
  //
  // post on button click
  // $('#searchSubmit').on('click', function(e){
  //   query = $('input')
  //   e.preventDefault()
  //   $.post({
  //     url: '/searchresult',
  //     data: query,
  //     success: function (data) {
  //       $('div.results').html(data)
  //     }
  //   })
  // })

// })
