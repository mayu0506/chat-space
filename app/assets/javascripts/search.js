$(function() {
 
  var search_list = $("#user-search-result");

  function appendUserName(user) {
    var html = `<div class = "chat-group-user clearfix">
                  <p class = "chat-group-user__name">${user.name}</p>
                </div>`
    search_list.append(html);
  }

  function appendNoUserName(msg) {
    var html = `<div class = "chat-group-user clearfix">
                  <p class = "chat-group-user__name">${msg}</p>
  　            </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-field").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUserName(user);
        });
      }
      else {
        appendNoUserName("一致する名前はありません");
      }
    })
    .fail(function(){
      alert('名前検索に失敗しました');
    })
  });
});
