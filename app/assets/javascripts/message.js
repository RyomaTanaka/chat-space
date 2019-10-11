$(function() {
  function buildHTML(message) {
    let image = ""

    image = message.image ? `<img src="${message.image}">` : ""

    let html = `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.time}
                    </p>
                  </div>
                  <p class="message__text">
                    ${message.text}
                  </p>
                    ${image}
                </div>`
    return html
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      let html = buildHTML(data);

      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.submit-btn').removeAttr('disabled');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
    })
    
    .fail(function(data){
      alert('メッセージの送信に失敗しました');
      $('.submit-btn').removeAttr('disabled');
    })
  })

  let reloadMessages = function() {
    last_message_id = 
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(message) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    })
  }
})