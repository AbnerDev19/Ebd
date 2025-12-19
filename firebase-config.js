// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ⚠️ SUBSTITUA PELAS SUAS CHAVES DO CONSOLE FIREBASE
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função auxiliar para proteger rotas (Auth Guard)
function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        const path = window.location.pathname;
        if (!user && !path.includes('index.html') && !path.endsWith('/')) { 
            // Permite index.html como login ou redireciona
            // Ajuste conforme o nome do seu arquivo de login
             if (!path.includes('login')) window.location.href = "index.html";
        }
    });
}

// Exporta tudo que vamos usar nos outros arquivos
export { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc, getDoc, setDoc, checkAuth };