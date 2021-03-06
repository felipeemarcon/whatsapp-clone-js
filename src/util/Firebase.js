const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

  constructor() {

    this._config = {
        apiKey: "AIzaSyCngg36S776M7B0mMZpBlm_aqQI14LGClo",
        authDomain: "whatsapp-clone-ceaff.firebaseapp.com",
        databaseURL: "https://whatsapp-clone-ceaff.firebaseio.com",
        projectId: "whatsapp-clone-ceaff",
        storageBucket: "gs://whatsapp-clone-ceaff.appspot.com/",
        messagingSenderId: "996878560033"
    }

    this.init();

  }

  init(){

    if (!window._initializedFirebase) {

      firebase.initializeApp(this._config);

      firebase.firestore().settings({
        timestampsInSnapshots: true
      });

      window._initializedFirebase = true;

    }

  }

  static db(){

    return firebase.firestore();

  }

  static hd(){

    return firebase.storage();

  }

  initAuth(){

    return new Promise((s, fn) => {

      let provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider)
        .then(result => {

          let token = result.credential.accessToken;
          let user = result.user;

          s({
            user, 
            token
          });

        }).catch(err => {

          console.error(err);

        });

    });

  }

}