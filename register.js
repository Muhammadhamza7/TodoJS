import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { app,db} from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const auth = getAuth(app);
document.onload = () => {
onAuthStateChanged(auth, (user) => {
  if (user) {
    location.href="index.html";
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
   
    // ...
  } 
});
};
window.history.replaceState(null, null, window.location.href);
window.onpopstate = function () {
  window.history.go(1);
};

  
  const form = document.querySelector("#registeration-form");
form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  try {
    const formData = new FormData(ev.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password );
    const user = userCredential.user;
    console.log(user.uid);
    await setDoc(doc(db, "users", user.uid), {
      email,
      password,
    });
    location.href = "index.html";
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  }
});