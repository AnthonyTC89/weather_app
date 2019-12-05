import {setupHeader, setupMain, setupFooter} from './dom';

Promise.all([setupHeader(),setupMain(),setupFooter()])
  .then(result => console.log(result))
  .catch(error => console.log(`Error in executing ${error}`));