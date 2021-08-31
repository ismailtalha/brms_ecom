// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { url } from "inspector";

export const environment = {
  production: false,
  // url: 'http://localhost:8080'
  // url:'http://192.168.100.4:1322/brmsapi/'
  // url:"http://192.168.10.168:12345/brmsapi/"
  // url:"http://backend.smokesinc.com.192-185-10-74.hgws14.hgwin.temp.domains/brmsapi/"  
   //url:'http://localhost:3675/brmsapi/'
   url :"https://backend.smokesinc.com/brmsapi/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
