import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqhxdr_vaqwGup-LXmefwQFxMJErawlvw",
  authDomain: "restaurant-qr-ordering-fdf9b.firebaseapp.com",
  projectId: "restaurant-qr-ordering-fdf9b",
  storageBucket: "restaurant-qr-ordering-fdf9b.firebasestorage.app",
  messagingSenderId: "907571024375",
  appId: "1:907571024375:web:796894f82f2cae4d7b9ef2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  size: "normal"
});

// Send OTP
window.sendOTP = async function () {
  const mobile = document.getElementById("mobile").value.trim();

  if (mobile.length !== 10) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

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

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Verify OTP
window.verifyOTP = async function () {
  const otp = document.getElementById("otp").value;

  try {
    await window.confirmationResult.confirm(otp);

    alert("Login Successful");

    window.location.href = "index.html";

  } catch (error) {
    alert("Invalid OTP");
  }
};