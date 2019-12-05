import {setupHeader, setupMain, setupFooter} from './dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';

Promise.all([setupHeader(),setupMain(),setupFooter()])
  .then(result => console.log(result))
  .catch(error => console.log(`Error in executing ${error}`));

