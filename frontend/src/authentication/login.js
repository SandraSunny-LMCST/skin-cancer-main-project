import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
function Login() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const naviage = useNavigate();

    const { dispatch } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user });
                console.log(user)
                notify();
                naviage("/");

            })
            .catch((errorMsg) => {
                const errorMsgCode = errorMsg.code;
                const errorMsgMessage = errorMsg.message;
                // ..
                const notifyError = () => toast.error(errorMsgMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                notifyError();

            });
    };

    const notify = () => toast.success('👍 Login successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    return (
        <>
            <div class="parent">
                <nav>

                    <div class="navleft">SKIN</div>
                    <div class="navright">
                        <ul>
                            <li>Home</li>
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
                        <Link to={"/signup"}>
                            <button class="upload">
                                Create an account here 📝
                            </button>
                        </Link>


                    </div>
                    <div class="right">
                        <form onSubmit={handleLogin}>
                            <input type="text" class="upload" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" class="upload" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                            <button class="upload" type="submit">
                                Login 🔓
                            </button>
                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default Login;
