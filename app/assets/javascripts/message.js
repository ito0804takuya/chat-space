$(function(){
  function buildHTML(message){
    var image = (message.image !== null) ? `<img src= "${message.image}">` : '';
    var html = `<div class="wrapper__main__messages__message" data-message_id=${message.id}>
                  <div class="wrapper__main__messages__message__data">
                    <div class="wrapper__main__messages__message__data__user">
                      ${message.user_name}
                    </div>
                    <div class="wrapper__main__messages__message__data__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="wrapper__main__messages__message__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                  </div>
                  ${image}
                </div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      console.log(html);
      $('.wrapper__main__messages').append(html);
      $('.wrapper__main__messages').animate({scrollTop: $('.wrapper__main__messages')[0].scrollHeight}, 'fast');  
      $('form')[0].reset();
    })
    .fail(function(){
      alert('エラー');
    });
    return false;
  });

  // var buildMessageHTML = function(message) {
  //   var image = (message.image !== null) ? `<img src= "${message.image}">` : '';
  //   var html = `<div class="wrapper__main__messages__message" data-message_id=${message.id}>
  //                 <div class="wrapper__main__messages__message__data">
  //                   <div class="wrapper__main__messages__message__data__user">
  //                     ${message.user_name}
  //                   </div>
  //                   <div class="wrapper__main__messages__message__data__date">
  //                     ${message.created_at}
  //                   </div>
  //                 </div>
  //                 <div class="wrapper__main__messages__message__text">
  //                     <p class="lower-message__content">
  //                       ${message.content}
  //                     </p>
  //                 </div>
  //                 ${image}
  //               </div>`
  //   return html;
  // };

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.wrapper__main__messages__message:last').data("message_id");
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.wrapper__main__messages').append(insertHTML);
        });
        $('.wrapper__main__messages').animate({scrollTop: $('.wrapper__main__messages')[0].scrollHeight}, 'fast');  
      })
      .fail(function() {
        alert('エラー');
      });
    };
  }

  setInterval(reloadMessages, 5000);
});
