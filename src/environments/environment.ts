// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// export const environment = {
//     production: false,
//     hmr       : false
// };
export const environment = {
  production: false,
  hmr       : false,
  firebase: {
    apiKey: "AIzaSyC7kgi3oktI3qgR5o5HN12YHuOOdv0Abcs",
    authDomain: "rmoodle-dev.firebaseapp.com",
    databaseURL: "https://rmoodle-dev.firebaseio.com",
    projectId: "rmoodle-dev",
    storageBucket: "rmoodle-dev.appspot.com",
    messagingSenderId: "382805982295"
  }
};
