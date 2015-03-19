var loop = null,
    timer = null;

function notification(t)
{
  var notification = new Notification('Stand up!', {
    body: 'Have a drink of water and go for a walk',
    icon: 'img/walk.png'
  });
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
  
  $('#start').on('click', function(){
    loop = setInterval(function(){
      notify('Stand up!');
    }, 1200000);

    $(this).addClass('hidden');
    $('#stop').removeClass('hidden');

    var time_width = 100;
    timer = setInterval(function(){
      time_width = time_width - (100/1200);
      if(time_width < 0)
      {
        time_width = 100;
      }
      $('#time-bar').css('width', time_width + '%');
    }, 1000);

  }); 

  $('#stop').on('click', function(){
    clearInterval(loop); 
    clearInterval(timer);
    $(this).addClass('hidden');
    $('#start').removeClass('hidden');
    $('#time-bar').css('width', '100%');
  });

});