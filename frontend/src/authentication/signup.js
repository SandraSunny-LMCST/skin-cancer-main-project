import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from "../firebase";
import React, { useContext, useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from '../firebase';
import { AuthContext } from '../context/auth_context';
import { useNavigate } from "react-router-dom";
import './login.css'
import { Link } from 'react-router-dom';
const Signup = ({ inputs }) => {

    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setuid] = useState();
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()





    const handleSignup = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), {
                    email: email,
                    name: name,
                    timestamp: serverTimestamp(),
                });
                toast('🦄 Successfully created account!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/login')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }


    return (
        <>
            <div class="parent">
                <nav>

                    <div class="navleft">SKIN CARE</div>
                    <div class="navright">
                        <ul>
                            <li>Home</li>
                            <li>History</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                </nav>
                <div class="child">

                    <svg class="semi" height="100" width="100">
                        <path d="M 0 99 C 0 22 99 22 99 99 " fill="none" stroke-width="2" stroke="#807f7e" />
                    </svg>
                    <div class="left">
                        <h3>Give me a skin image and i will look at it for you.</h3>
                        <br />
                        <h4>Did you know😲? Each inch of skin contains 19 million skin cells, 650 sweat glands, 20 blood
                            vessels,
                            and 1,000
                            nerve endings. The skin accounts for about 15% of the body weight and is our first line of defense
                            against irritants and allergens.</h4>
                        <br />
                        <br />
                        <Link to={'/login'}>
                            <button class="upload">
                                Login Here 🔓
                            </button>
                        </Link>


                    </div>
                    <div class="right">
                        <form onSubmit={handleSignup}>
                            <input type="text" class="upload" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input type="text" class="upload" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            <input type="password" class="upload" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                            <button class="upload" type="submit">
                                Create Account 📝
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}


export default Signup