$(function() {
  function buildHTML(message) {
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
                  <img src="${message.image}">  
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
      console.log('success!');
      console.log(data);
      console.log(data.image);
      let html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message').val('');
    })

    .fail(function(data){
      alert('メッセージの送信に失敗しました。');
    })
  })
})