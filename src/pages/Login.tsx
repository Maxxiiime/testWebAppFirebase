import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, type User, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase"; 
  
export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);

    } catch (error: any) {
      console.error("Erreur lors de la connexion popup :", error.message);
    }
  };

const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    try {
      if (isRegistering) {
        // Mode Inscription
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        //Mode Connexion
        await signInWithEmailAndPassword(auth, email, password);
      }
  
    } catch (err: any) {
      console.error("Erreur d'authentification email:", err.code);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError("Cet email est déjà utilisé.");
          break;
        case 'auth/weak-password':
          setError("Le mot de passe doit comporter au moins 6 caractères.");
          break;
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
          setError("Aucun compte trouvé avec cet email.");
          break;
        case 'auth/wrong-password':
          setError("Mot de passe incorrect.");
          break;
        case 'auth/invalid-email':
          setError("Email invalide.");
          break;
        default:
          setError("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("onAuthStateChanged :", currentUser ? currentUser.displayName : "null");
      setUser(currentUser); 
      
      if (currentUser) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);


  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center", maxWidth: "400px", margin: "50px auto", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      {user ? (

        <div>
          <h2>Bienvenue, {user.displayName}</h2>
          <p>Email : {user.email}</p>
          {user.photoURL && <img src={user.photoURL} alt="Avatar" style={{ borderRadius: "50%", width: "80px", height: "80px" }} />}
          <br />
       
        </div>
      ) : (

        <div>
          <h2 style={{ color: "black" }}>{isRegistering ? "Inscription" : "Connexion"}</h2>
          

          <form onSubmit={handleEmailSubmit}>
            <div style={{ margin: "10px 0" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                style={{ width: "90%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
            </div>
            <div style={{ margin: "10px 0" }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                style={{ width: "90%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
            </div>
            
   
            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <button
              type="submit"
              style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", width: "100%", marginTop: "10px" }}
            >
              {isRegistering ? "S'inscrire" : "Se connecter"}
            </button>
          </form>

          {/* Séparateur "OU" */}
          <div style={{ display: "flex", alignItems: "center", margin: "20px 0", color: "#888" }}>
            <hr style={{ flex: 1, borderTop: "1px solid #ddd" }} />
            <span style={{ padding: "0 10px" }}>OU</span>
            <hr style={{ flex: 1, borderTop: "1px solid #ddd" }} />
          </div>

  
          <button
            onClick={handleGoogleSignIn}
            style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#4285F4", color: "white", border: "none", borderRadius: "5px", display: "flex", alignItems: "center", margin: "0 auto" }}
          >
            <svg style={{ marginRight: "10px" }} width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 5.2-6.4 9-12.3 9s-11.3-3.8-12.3-9H1.9C2.9 32.7 12.3 40 23 40c11.3 0 20.7-7.8 22.4-18.4H43.6z"/><path fill="#FF3D00" d="M6.3 14.7c3.1-6.1 9.7-10.4 17.7-10.4 6.3 0 12 2.8 15.9 7.4L34.1 17c-2.4-2.4-5.6-3.9-9.1-3.9-6.1 0-11.5 3.5-14.2 8.7L6.3 14.7z"/><path fill="#4CAF50" d="M24 48c11.9 0 21.9-8.6 23.6-19.9H1.9C3.6 39.4 13.1 48 24 48z"/><path fill="#1976D2" d="M43.6 20.1H24V20h19.6c.1.7.1 1.4.1 2.1 0 3.3-.8 6.4-2.2 9.2l.1-.1z"/></svg>
            Continuer avec Google
          </button>

     
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError(""); 
            }}
            style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", marginTop: "20px", fontSize: "14px" }}
          >
            {isRegistering ? "Vous avez déjà un compte ? Connectez-vous" : "Nouveau ? Créez un compte"}
          </button>
        </div>
      )}
    </div>
  );
}
