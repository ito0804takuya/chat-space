$(function(){
  var search_list = $("#user-search-result");
  var group_list = $("#user-group-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div id=add-btn class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }
  function appendErrMsgToHTML(msg){
    var html = `<li>
                  <div class='listview__element--right-icon'>${ msg }</div>
                </li>`
    search_list.append(html);
  }
  function groupUsers(name, id){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div id=delte-btn class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    group_list.append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('失敗');
    })
  });

  $(document).on("click", "#add-btn", function(){
    var id = $(this).data("user-id");
    var name = $(this).data("user-name");
    
    $(this).parent().remove();
    groupUsers(name, id);
  });

  $(document).on("click", "#delte-btn", function(){
    $(this).parent().remove();
  });

});