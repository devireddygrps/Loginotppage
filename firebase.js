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

window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  size: "normal"
});
window.recaptchaVerifier.render () {
window.sendOTP = async function () {
  const mobile = document.getElementById("mobile").value.trim();

  const phoneNumber = "+91" + mobile;

  const appVerifier = window.recaptchaVerifier;

  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );

    window.confirmationResult = confirmationResult;

    alert("OTP Sent!");

    document.getElementById("mobileSection").style.display = "none";
    document.getElementById("otpSection").style.display = "block";

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}
};

window.verifyOTP = async function () {
  const code = document.getElementById("otp").value;

  try {
    await window.confirmationResult.confirm(code);

    alert("Login Successful");

  } catch (error) {
    alert("Wrong OTP");
  }
};
