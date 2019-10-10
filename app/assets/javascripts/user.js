$(function(){
  let user_list = $('#user-search-result');
  let user_add_list = $('#user-add-result');

  function buildHTML(user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    user_list.append(html);
  }

  function add_chat_member(name, id) {
    let html_add = `<div class='chat-group-user'>
                      <input name='group[user_ids][]' type='hidden' value='${id}'>
                      <p class='chat-group-user__name'>${name}</p>
                      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                    </div>`
    user_add_list.append(html_add);
  }


  $('#user-search-field').on("keyup", function() {
    let input = $("#user-search-field").val();

    $.ajax({
      url: '/users',
      type: 'GET',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users) {
      user_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          buildHTML(user)
        });
      } else {
        alert('該当するユーザーがいません');
      }
    })

    .fail(function(users) {
      alert('ユーザー検索に失敗しました')
    })
  })

  $(user_list).on("click", '.chat-group-user__btn--add', function() {
    let id = $(this).attr('data-user-id');
    let name = $(this).siblings('.chat-group-user__name').text();
    add_chat_member(name, id);
    $(this).parent().remove();
  })
  
  $(user_add_list).on("click", '.js-remove-btn', function() {
    $(this).parent().remove();
  })
})