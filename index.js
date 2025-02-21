
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

  //import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
  //import {getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

  //Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAD37t_mlsdrtt1X7uyvSJJlappTxSC9t0",
    authDomain: "codecrussaders.firebaseapp.com",
    projectId: "codecrussaders",
    storageBucket: "codecrussaders.firebasestorage.app",
    messagingSenderId: "806653513715",
    appId: "1:806653513715:web:d665c2f92f5acdd89dcc86"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

   // Password validation
   const password = document.getElementById('password');
   const lengthCheck = document.getElementById('length-check');
   const uppercaseCheck = document.getElementById('uppercase-check');
   const numberCheck = document.getElementById('number-check');
   const specialCheck = document.getElementById('special-check');

   password.addEventListener('input', function() {
       const value = this.value;
       
       // Check length
       if (value.length >= 8) {
           lengthCheck.classList.add('valid');
       } else {
           lengthCheck.classList.remove('valid');
       }
       
       // Check uppercase
       if (/[A-Z]/.test(value)) {
           uppercaseCheck.classList.add('valid');
       } else {
           uppercaseCheck.classList.remove('valid');
       }
       
       // Check number
       if (/[0-9]/.test(value)) {
           numberCheck.classList.add('valid');
       } else {
           numberCheck.classList.remove('valid');
       }
       
       // Check special character
       if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
           specialCheck.classList.add('valid');
       } else {
           specialCheck.classList.remove('valid');
       }
   });

   document.getElementById('register-form').addEventListener('submit', async function(e) {
       e.preventDefault();
       //alert(5);
       const name = document.getElementById('name').value;
       const email = document.getElementById('email').value;
       const password = document.getElementById('password').value;
       const errorMessage = document.getElementById('error-message');
       
       // Validate password requirements
       if (password.length < 8 || 
           !/[A-Z]/.test(password) || 
           !/[0-9]/.test(password) || 
           !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
           errorMessage.textContent = 'Please meet all password requirements.';
           errorMessage.classList.add('visible');
           return;
       }
       
       try {
           const userCredential = await createUserWithEmailAndPassword(auth, email, password);
           const user = userCredential.user;
           alert("Creating Account");
           /*
           // Update profile with name
           await updateProfile(user, {
               displayName: name
           });
           
           // Store user info in localStorage
           localStorage.setItem('isLoggedIn', 'true');
           localStorage.setItem('username', name);
           localStorage.setItem('uid', user.uid);
           
           // Redirect to home page */
           
           window.location.href = 'index.html';
       } catch (error) {
           errorMessage.textContent = getErrorMessage(error.code);
           errorMessage.classList.add('visible');
           alert("Not working yet");
       }
   });

  
/*
  document.getElementById('login-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      alert("Im working");
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorMessage = document.getElementById('error-message');
      
      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          // Store user info in localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', user.email.split('@')[0]);
          localStorage.setItem('uid', user.uid);
          
          // Redirect to home page
          window.location.href = 'login.html';
      } catch (error) {
          errorMessage.textContent = getErrorMessage(error.code);
          errorMessage.classList.add('visible');
      }
  });*/

  function getErrorMessage(errorCode) {
      switch (errorCode) {
          case 'auth/invalid-email':
              return 'Invalid email address.';
          case 'auth/user-disabled':
              return 'This account has been disabled.';
          case 'auth/user-not-found':
              return 'No account found with this email.';
          case 'auth/wrong-password':
              return 'Incorrect password.';
          default:
              return 'An error occurred. Please try again.';
      }
  }
