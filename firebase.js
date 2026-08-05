alert("firebase.js loaded");
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyAqhxdr_vaqwGup-lXmefwQFxMJErawlvw",
  authDomain: "restaurant-qr-ordering-fdf9b.firebaseapp.com",
  projectId: "restaurant-qr-ordering-fdf9b",
  storageBucket: "restaurant-qr-ordering-fdf9b.firebasestorage.app",
  messagingSenderId: "907571024375",
  appId: "1:907571024375:web:796894f82f2cae4d7b9ef2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Create reCAPTCHA
window.sendOTP = async function () {

  try {

    if (!window.recaptchaVerifier) {

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal"
        }
      );

      await window.recaptchaVerifier.render();

    }


    const mobile = document.getElementById("mobile").value.trim();

    if (mobile.length !== 10) {
      alert("Enter valid 10 digit mobile number");
      return;
    }


    const phoneNumber = "+91" + mobile;


    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );


    window.confirmationResult = confirmationResult;

    alert("OTP Sent Successfully");


  } catch(error) {

    console.log(error);
    alert(error.message);

  }

};

  const mobile = document.getElementById("mobile").value.trim();

  const phoneNumber = "+91" + mobile;


  try {

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );

    window.confirmationResult = confirmationResult;

    alert("OTP Sent Successfully");

  } catch(error) {

    console.log(error);
    alert(error.message);

  }

};


// Send OTP
window.sendOTP = async function () {
  console.log("Send otp clicked");

  const mobile = document.getElementById("mobile").value.trim();

  const phoneNumber = "+91" + mobile;

  try {

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );

    window.confirmationResult = confirmationResult;

    alert("OTP Sent Successfully");

    document.getElementById("mobileSection").style.display = "none";
    document.getElementById("otpSection").style.display = "block";


  } catch(error){

    console.error(error);
    alert(error.message);

  }

};


// Verify OTP
window.verifyOTP = async function () {

  const code = document.getElementById("otp").value.trim();

  try {

    await window.confirmationResult.confirm(code);

    alert("Login Successful");

  } catch(error){

    console.error(error);
    alert("Wrong OTP");

  }

};
document.getElementById(sendBtn").addEventListener("click",sendOTP);
