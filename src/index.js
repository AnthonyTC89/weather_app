/* eslint-disable */
import { setupHeader, setupMain, setupFooter } from './dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';

Promise.all([setupHeader(), setupMain(), setupFooter()])
  .then().catch();
