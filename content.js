var receiver = function(request, sender, sendResponse) {
  var html, notice, closer;

  html = 'You got here from <a href="' + request.url + '"><img src="' + request.favicon + '">' + request.title + '</a>.<span id="open_with_context_close">&times;</span>';
  notice = document.createElement("div");
  notice.id = "open_with_context";
  notice.innerHTML = html;
  document.body.appendChild(notice);

  closer = document.getElementById("open_with_context_close");
  closer.addEventListener("click", function(event){
    document.body.removeChild(notice);
  });
};

chrome.extension.onMessage.addListener(receiver);