// Client ID and API key from the Developer Console
console.error("error")
var CLIENT_ID = '655575217025-1v0e1658o8lsk6gk3vhr5124i0il6cvv.apps.googleusercontent.com';
var apiKey = 'AIzaSyARv_7mLCF37h5mdIVraL5tBxIziElD99E';
var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);

}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  console.log("updateSigninStatus");
  if (isSignedIn) {
    $("#sms").show();
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listMessages();

  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    $("#sms").hide();
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
   $("#authorize-button").hide();
    console.log("loged in");
 // $("#sms").show();
  
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();

}


/**
 * Print all Labels in the authorized user's inbox. If no labels
 * are found an appropriate message is printed.
 */
 var ids = [];
function listMessages() {
  console.log("listMessages");

    gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'format': 'full'
    }).then(function(response){
      console.log("setting the ids");

       var sms = response.result.messages;
       console.log(JSON.parse(response.body));
       if(sms && sms.length >0){
        for(var j = 0; j<sms.length; j++){
          var MessageList = sms[j];
          //appendPre(JSON.stringify(MessageList));
         // appendPre(MessageList.id);
          //console.log(MessageList.id);
          //console.log(MessageList.name);
          ids[j] = MessageList.id;

        }
        for(var i = 0; i<5; i++){
          console.log("loop time out");
          getMessage(ids[i]);
        }


       }
    });

}
var query = 'from:mnazehat@gmail.com rfc822msgid: is:unread';

/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */
 var arrayEmail = [];
 function getMessage(id) {
  var promise = {};

  console.log("getMessage");
    console.log(ids[0]);
  var request = gapi.client.gmail.users.messages.get({
    'userId': 'me',
    'id': id,
    'format': 'full'
  });
  request.execute(function(resp){
  var msgSnippet = resp.messages;
      console.log(resp);
      if(resp){
         // appendPre(resp.snippet);

          console.log(resp.payload);
          // console.log(resp.payload.body);
          for(var i = 0; i<resp.payload.headers.length; i++){
            console.log(resp.payload.headers[i].name);
            var tr = $("<tr>");
            for(var i = 0; i<resp.payload.headers.length; i++){
              if(resp.payload.headers[i].name === "From"){
                tr.append('<td><b>'+(resp.payload.headers[i].value).split("<")[0]+'</b></td>');
                console.log((resp.payload.headers[i].value).split("<")[0]);
                $("#tbody").append(tr);
                promise.From = (resp.payload.headers[i].value).split("<")[0];
                // $("#sms").append("_");
              }
            }console.log(promise);
            for(var i = 0; i<resp.payload.headers.length; i++){
              if(resp.payload.headers[i].name === "Subject"){
               tr.append('<td><b>'+resp.payload.headers[i].value+'</b></td>');
               promise.Subject = resp.payload.headers[i].value;
               $("#tbody").append(promise.Subject);

              }
            }console.log(promise);
              console.log(arrayEmail);
              arrayEmail.push(promise);
              console.log(arrayEmail);
              // run through array of emails and append to
              // corresponding slide in DOM
              for (var i = 0; i < arrayEmail.length; i++) {
                var date = arrayEmail[i].Date;
                var from = arrayEmail[i].From;
                var subject = arrayEmail[i].Subject;
                var body = arrayEmail[i].body;
                console.log("Email " +i+ " from "+from);
                $('#slide_'+i+"_date").html(date);
                $('#slide_'+i+"_from").html(from);
                $('#slide_'+i+"_subject").html(subject);
                $('#slide_'+i+"_body").html(body);

              }
            for(var i = 0; i<resp.payload.headers.length; i++){
              if(resp.payload.headers[i].name === "Date"){

                var str = resp.payload.headers[i].value;
                // console.log(resp.payload.headers[i].value);
                var arr = str.substring(5,10);
                // console.log(arr);
                 tr.append('<td><b>'+arr+'</b></td>');
                 promise.Date = arr;
                 $("#tbody").append(promise.Date);
                  promise.Date = arr;
              }
            }
            var trbody = $("<tr>");
            trbody.attr("id", "trbody");
            promise.body =getBody(resp.payload);
            trbody.append(promise.body);
          //  $("#tbody").append(trbody);
          //  console.log(trbody);

          }
      }
      else{
          appendPre('no message found');
      }
  });
}

//getting body of the email
function getBody(message) {
  var encodedBody = '';
  if(typeof message.parts === 'undefined')
  {
    encodedBody = message.body.data;
  }
  else
  {
    encodedBody = getHTMLPart(message.parts);
  }
  encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
  return decodeURIComponent(escape(window.atob(encodedBody)));
}
function getHTMLPart(arr) {
  for(var x = 0; x <= arr.length; x++)
  {
    if(typeof arr[x].parts === 'undefined')
    {
      if(arr[x].mimeType === 'text/html')
      {
        return arr[x].body.data;
      }
    }
    else
    {
      return getHTMLPart(arr[x].parts);
    }
  }
  return '';
}
