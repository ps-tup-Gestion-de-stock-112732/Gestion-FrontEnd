// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:8080/",
  baseUrlPayment: "http://localhost:3000/",
  firebaseConfig: {
    apiKey: "AIzaSyDi2Yx0Q5Rk4U_Gk0tvOswQsHDNgApakWA",
    authDomain: "programming-stuff-fbe0c.firebaseapp.com",
    projectId: "programming-stuff-fbe0c",
    storageBucket: "programming-stuff-fbe0c.appspot.com",
    messagingSenderId: "856969903991",
    appId: "1:856969903991:web:8dbb57aeea324f607eeb72"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
