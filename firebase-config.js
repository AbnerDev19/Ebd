// ARQUIVO: firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ⚠️ NÃO ESQUEÇA DE COLOCAR SUAS CHAVES DO FIREBASE AQUI
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função de proteção de rotas
function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        const path = window.location.pathname;
        // Se NÃO tem usuário E não está na página de login, manda pro login
        if (!user && !path.includes('login.html')) { 
             window.location.href = "login.html";
        }
    });
}

export { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc, getDoc, setDoc, checkAuth };