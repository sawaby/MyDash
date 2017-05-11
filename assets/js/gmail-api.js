           var CLIENT_ID = '655575217025-1v0e1658o8lsk6gk3vhr5124i0il6cvv.apps.googleusercontent.com';
           var apiKey = 'AIzaSyARv_7mLCF37h5mdIVraL5tBxIziElD99E';
           var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
           var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
           var ids = [];
           /**
            * Append a pre element to the body containing the given message
            * as its text node. Used to display the results of the API call.
            *
            * @param {string} message Text to be placed in pre element.
            */
           function appendPre(message) {
               var pre = document.getElementById('content');
               var textContent = document.createTextNode(message + '\n');
               pre.appendChild(textContent);
           }

           function initClient() {
               gapi.client.init({
                   discoveryDocs: DISCOVERY_DOCS,
                   clientId: CLIENT_ID,
                   scope: SCOPES
               }).then(function() {
                   // Listen for sign-in state changes.
                   gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                   // Handle the initial sign-in state.
                   updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
               });
           }

           function handleClientLoad() {
               gapi.load('client:auth2', initClient);

           }

           function updateSigninStatus(isSignedIn) {
               console.log("updateSigninStatus");
               //console.log(authorizeButton)
               if (isSignedIn) {
                   //console.log(authorizeButton)
                   // authorizeButton.style.display = 'none';
                   //signoutButton.style.display = 'block';
                   listLabels();

               } else {
                   console.log(authorizeButton)
                       //authorizeButton.style.display = 'block';
                       //signoutButton.style.display = 'none';
               }
           }

           function listLabels() {
               console.log("listLabels");

               gapi.client.gmail.users.messages.list({
                   'userId': 'me',
                   'format': 'full'
               }).then(function(response) {
                   console.log("setting the ids");
                   console.log(response);
                   var sms = response.result.messages;
                   if (sms && sms.length > 0) {
                       for (var j = 0; j < sms.length; j++) {
                           var MessageList = sms[j];
                           //appendPre(JSON.stringify(MessageList));
                           // appendPre(MessageList.id);
                           //console.log(MessageList.id);
                           ids[j] = MessageList.id;

                       }
                       for (var i = 0; i < 5; i++) {
                           getMessage(ids[i]);
                       }
                   }
               });

           }

           function getMessage(id) {
               console.log("getMessage");
               console.log(ids[0]);
               var request = gapi.client.gmail.users.messages.get({
                   'userId': 'me',
                   'id': id,
                   'format': 'full'
               });
               request.execute(function(resp) {
                   var msgSnippet = resp.messages;

                   if (resp.snippet) {
                       appendPre(resp.snippet);
                       $("#sms").append('<p>' + resp.snippet + '</p>');
                       console.log(resp.snippet);
                   } else {
                       appendPre('no message found');
                       console.log(resp.snippet);

                   }

               });
           }
           $(document).ready(function() { // Client ID and API key from the Developer Console
               console.log("hello everyone")

               var authorizeButton = $("#authorize-button");
               var signoutButton = $("#signout-button");
               authorizeButton.onclick = handleAuthClick;
               signoutButton.onclick = handleSignoutClick;
               /**
                *  On load, called to load the auth2 library and API client library.
                */
               /**
                *  Initializes the API client library and sets up sign-in state
                *  listeners.
                */

               /**
                *  Called when the signed in status changes, to update the UI
                *  appropriately. After a sign-in, the API is called.
                */


               /**
                *  Sign in the user upon button click.
                */
               function handleAuthClick(event) {
                   gapi.auth2.getAuthInstance().signIn();
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


               var query = 'from:mnazehat@gmail.com rfc822msgid: is:unread';

               /**
                * Get Message with given ID.
                *
                * @param  {String} userId User's email address. The special value 'me'
                * can be used to indicate the authenticated user.
                * @param  {String} messageId ID of Message to get.
                * @param  {Function} callback Function to call when the request is complete.
                */
               function getMessage(id) {
                   console.log("getMessage");
                   console.log(ids[0]);
                   var request = gapi.client.gmail.users.messages.get({
                       'userId': 'me',
                       'id': id,
                       'format': 'full'
                   });
                   request.execute(function(resp) {
                       var msgSnippet = resp.messages;

                       if (resp.snippet) {
                           appendPre(resp.snippet);
                           $("#sms").append('<p>' + resp.snippet + '</p>');
                           console.log(resp.snippet);
                       } else {
                           appendPre('no message found');
                           console.log(resp.snippet);

                       }

                   });
               }


           });
