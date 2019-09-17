$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="wrapper__main__messages__message" data-message-id=${message.id}>
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
                    <img src=${message.image}>
                  </div>`
      return html; 
    } else {
      var html = `<div class="wrapper__main__messages__message" data-message-id=${message.id}>
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
                </div>`
      return html; 
    };
  }
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
      $('.wrapper__main__messages').append(html);
      $('.wrapper__main__messages').animate({scrollTop: $('.wrapper__main__messages')[0].scrollHeight}, 'fast');  
      $('.form__message').val('');
    })
    .fail(function(){
      alert('エラー');
    });
    return false;
  });
});
