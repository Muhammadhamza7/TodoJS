import { getAuth, onAuthStateChanged ,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { app} from "./firebase.js";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
    location.href="index.html";
    }
});
  window.history.replaceState(null, null, window.location.href);
window.onpopstate = function () {
  window.history.go(1);
};

const  form=document.querySelector("#login-form");
form.addEventListener("submit",async(ev)=>{
    ev.preventDefault();
    try{
        const formData= new FormData(ev.currentTarget);
        const email=formData.get("email");
        const password=formData.get("password");
        const userCredential=
        await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    console.log(user,"logged In");
    location.href = "index.html";
    // ...
  }
  catch(error){
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  }; 
});