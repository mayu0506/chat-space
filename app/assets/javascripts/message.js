$(function(){
  // メッセージ送信情報を追加していく
  function buildHTML(message){
    var content = message.content ? `${message.content}` : '';
    var image = message.image.url ? `<img src='${message.image.url}'>` : '';

    var html =  `<div class = "message">
                  <div class = "upper-info">
                    <div class = "upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class = "upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class = "lower-message"> 
                    <p class = "lower-message__content">
                      ${content}
                      ${image}
                    </p>
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    // HTMLでの送信をキャンセル
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
    // サーバーから値が正しく返ってきた場合
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight});
      $('.form__message').val('');
      $(".form__submit").removeAttr("disabled");
    })
    // 正しく返ってこなかった場合
    .fail(function(){
      alert('メッセージを送信できません');
    });
  });
});
