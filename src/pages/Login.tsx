import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Correction du chemin d'importation : "./utils/firebase" au lieu de "../utils/firebase"
// en supposant que Login.tsx est à la racine et firebase.ts est dans utils/
import { auth } from "../utils/firebase"; 
  
export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // 1. Logique d'authentification
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      console.log("Tentative de connexion avec popup...");
      // signInWithPopup va ouvrir le popup.
      // Si la connexion réussit, l'observateur onAuthStateChanged ci-dessous
      // sera déclenché automatiquement.
      await signInWithPopup(auth, provider);
      // Si la connexion réussit, l'useEffect gérera la navigation.
    } catch (error: any) {
      // C'est ici que l'erreur 'auth/popup-closed-by-user' sera capturée
      // si l'utilisateur FERME manuellement le popup.
      console.error("Erreur lors de la connexion popup :", error.message);
    }
  };

  // 2. Logique de déconnexion
  const handleLogout = async () => {
    try {
      await auth.signOut();
      // onAuthStateChanged sera également déclenché ici,
      // mettant 'currentUser' à 'null'.
      setUser(null);
      navigate("/login"); // Optionnel : rediriger vers la page de login
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  // 3. Écouteur d'état d'authentification (LA SOURCE DE VÉRITÉ)
  useEffect(() => {
    // onAuthStateChanged est le meilleur moyen de savoir si un utilisateur
    // est connecté, peu importe la méthode (popup, redirect, session).
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("onAuthStateChanged :", currentUser ? currentUser.displayName : "null");
      setUser(currentUser); // Met à jour l'état local
      
      if (currentUser) {
        // Si l'utilisateur est connecté, naviguer vers l'accueil
        navigate("/");
      }
    });

    // Nettoyer l'écouteur lorsque le composant est démonté
    return () => unsubscribe();
  }, [navigate]); // Ajouter 'navigate' aux dépendances

  // 4. Supprimé le useEffect avec getRedirectResult
  // Il n'est pas utilisé avec signInWithPopup.

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center", maxWidth: "400px", margin: "50px auto", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      {user ? (
        <div>
          <h2>Bienvenue, {user.displayName}</h2>
          <p>Email : {user.email}</p>
          {user.photoURL && <img src={user.photoURL} alt="Avatar" style={{ borderRadius: "50%", width: "80px", height: "80px" }} />}
          <br />
          <button
            onClick={handleLogout}
            style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#d9534f", color: "white", border: "none", borderRadius: "5px", marginTop: "20px" }}
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <div>
          <h2>Connexion</h2>
          <p>Veuillez vous connecter pour continuer.</p>
          <button
            onClick={handleGoogleSignIn}
            style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#4285F4", color: "white", border: "none", borderRadius: "5px", display: "flex", alignItems: "center", margin: "20px auto" }}
          >
            <svg style={{ marginRight: "10px" }} width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 5.2-6.4 9-12.3 9s-11.3-3.8-12.3-9H1.9C2.9 32.7 12.3 40 23 40c11.3 0 20.7-7.8 22.4-18.4H43.6z"/><path fill="#FF3D00" d="M6.3 14.7c3.1-6.1 9.7-10.4 17.7-10.4 6.3 0 12 2.8 15.9 7.4L34.1 17c-2.4-2.4-5.6-3.9-9.1-3.9-6.1 0-11.5 3.5-14.2 8.7L6.3 14.7z"/><path fill="#4CAF50" d="M24 48c11.9 0 21.9-8.6 23.6-19.9H1.9C3.6 39.4 13.1 48 24 48z"/><path fill="#1976D2" d="M43.6 20.1H24V20h19.6c.1.7.1 1.4.1 2.1 0 3.3-.8 6.4-2.2 9.2l.1-.1z"/></svg>
            Se connecter avec Google
          </button>
        </div>
      )}
    </div>
  );
}
