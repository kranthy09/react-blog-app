import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBBHnhha6c79ikWEOiYll9gtaKhc_-94zI",
  authDomain: "my-react-blog-541c1.firebaseapp.com",
  projectId: "my-react-blog-541c1",
  storageBucket: "my-react-blog-541c1.appspot.com",
  messagingSenderId: "29813682515",
  appId: "1:29813682515:web:39120303edd1dfee0f31a6"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
