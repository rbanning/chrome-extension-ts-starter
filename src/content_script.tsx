chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  if (msg.color) {
    document.body.style.backgroundColor = msg.color;
    sendResponse("Changed background color to " + msg.color);
  }
});
