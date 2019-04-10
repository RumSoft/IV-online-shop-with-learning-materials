import React from 'react';


export class FacebookLoginComponent {



 launchFbLogin() {
    // launch facebook login dialog
    this.authWindow = window.open('https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&client_id=1528751870549294&display=popup&redirect_uri=http://localhost:5000/facebook-auth.html&scope=email',null,'width=600,height=400');    
}
}