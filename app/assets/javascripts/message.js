$(function() {
  function buildHTML(message) {
    let html_image = `<div class="message">
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
                  <img src="${message.image}">
                </div>`

    let html_no_image = `<div class="message">
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
                </div>`

    if (message.image != null) {
      return html_image
    } else {
      return html_no_image
    }
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
})