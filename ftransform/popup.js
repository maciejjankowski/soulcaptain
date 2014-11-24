document.addEventListener('DOMContentLoaded', function () {

  chrome.extension.sendMessage({"msg":"getOptions"}, function(response){
    //send options to tab
    console.info("got options!", response);

    $('#apiKey').val(response.options.apiKey);
    $('#host').val(response.options.host);
    $('#clientId').val(response.options.clientId);
  });

  $("#hostH" ).on("click", function(){
    $('#host').val('test host')
  });

  $("#clientIdH" ).on("click", function(){
    $('#clientId').val('demo')
  });

  $("#apiKeyH" ).on("click", function(){
    $('#apiKey').val('952aa,a9b%^.R-!;]-4f90Rcc13')
  });

  $("#setOptions" ).on("click", function(){
    chrome.extension.sendMessage({
      "msg":"saveOptions",
      "options":{
        "host": $('#host').val(),
        "apiKey":$('#apiKey').val(),
        "clientId":$('#clientId').val()
      }
    } );
    console.info("saved");
    
    $('#saved' ).fadeIn().fadeOut();
    
    if (!localStorage['dbg'])
      window.close();
  });

});

