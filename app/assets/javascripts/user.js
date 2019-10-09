$(function(){
  let user_list = $('#user-search-result');

  function buildHTML(user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    user_list.append(html);
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
        console.log(users.length);
      } else {
        alert('該当するユーザーがいません');
      }
    })

    .fail(function(users) {
      alert('ユーザー検索に失敗しました')
    })
  })
})