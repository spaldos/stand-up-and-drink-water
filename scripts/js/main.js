var minutes = 20;

function showNotification()
{
  var notification = new Notification('Stand up!', {
    body: 'Have a drink of water and go for a walk',
    icon: 'img/walk.png'
  });
}

function notification()
{
  var progress = $('#progress');
  progress.css("width", "100%");  

  showNotification();

  progress.animate({
      width: '0%'
  }, minutes * 60 * 1000, "linear", notification); 
}

function notify(msg)
{
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check if the user is okay to get some notification
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    notification();
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user is okay, let's create a notification
      if (permission === "granted") {
        notification();
      }
    });
  }
}

$(function(){

  var start = $('#start'),
      stop  = $('#stop');
  
  start.on('click', function(){
    notification();
    start.addClass('hidden');
    stop.removeClass('hidden');
  }); 

  stop.on('click', function(){
    stop.addClass('hidden');
    start.removeClass('hidden');
    $("#progress").stop();
  });

});