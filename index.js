import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { app, db } from "./firebase.js";
import {
  collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, query,
  where,orderBy
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

let userId;
const todoList = document.querySelector("#todoList ul");
const todoForm = document.querySelector("#todoForm");
const todoInput =document.querySelector("#todo-input");

todoForm.addEventListener("submit", async (ev) => {
  try {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const des = formData.get("des");
    const docRef = await addDoc(collection(db, "todos"), {
      des,
      createdAt: serverTimestamp(),
      isDone: false,
      createdBy: userId
    });
    const li = `
      <li> ${des}</li>
      `;
    todoList.innerHTML += li;
    console.log("Todo added with ID:", docRef.id);
    todoInput.value="";
    getTodos();
   
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
const getTodos = async () => {
  console.log("User ID before query:", userId);  // Log userId to check if it's set correctly
  
  try {
    todoList.innerHTML = '';
    const q = query(collection(db, "todos"), where("createdBy", "==", userId), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("No todos found for the current user.");
      return;
    }
    
   /* if (!userId) {
      console.log("User is not authenticated or userId is not set.");
      return;
    }
    
    const q = query(collection(db, "todos"), where("createdBy", "==", userId));
    const querySnapshot = await getDocs(q);*/


    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      const { des, isDone,createdAt } = doc.data();
      const dateObj = createdAt.toDate();
      console.log(des, isDone);
      const li = `<li id=${doc.id}> ${des} : ${dateObj.toLocaleDateString()} </li> `;
      todoList.innerHTML += li;
    });
    todoList.querySelectorAll("li").forEach((li) => {
      const docID = li.id;
      li.addEventListener("click", () => deleteTodos(docID))
    })
  } catch (e) {
    console.log(e);
  }
};

const deleteTodos = async (docID) => {
  try {
    const docRef = await deleteDoc(doc(db, "todos", docID));
    getTodos();
    console.log("document deleted=>", docRef);
  }
  catch (e) {
    console.log(e);
  }
};


const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html";
    return;
    // ...
  } else {
    userId = user.uid;
    console.log("User ID:", userId);
    getTodos();
  }

});
window.history.replaceState(null, null, window.location.href);
window.onpopstate = function () {
  window.history.go(1);
};
const logoutBtn = document.querySelector("#logout");
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
});