import React, { useContext, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from './context/auth_context';
import { db } from './firebase';
import './home.css'
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function Home() {

  const { currentUser } = useContext(AuthContext);
  const docRef = doc(db, "users", currentUser.uid);
  useEffect(() => {
    console.log(currentUser.uid)
    const handleLogin = async (e) => {
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data())
    };
    handleLogin();
  }, []);
  function signout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        window.location.reload();
        // naviagte("/login");
      })
      .catch((error) => { });
  }


  return (
    <>
      <svg class="arc" height="800" width="800">
        <path d="M 400 0 Q 600 450 300 850" fill="none" stroke-width="2" stroke="#807f7e" />
      </svg>

      <div class="parent">
        <nav>

          <div class="navleft">SKIN CARE</div>
          <div class="navright">
            <ul>
              <li>Home</li>
              <li>History</li>
              <li> {currentUser && (
                <a onClick={signout}>
                  {" "}
                  Log out
                </a>
              )}</li>
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
            <button class="upload">
              Drop or pick an image 👉
            </button>

          </div>
          <div class="right">
            <form action="/submit" method="POST" enctype="multipart/form-data">
              <div class="container">

                <label for="fileInput" id="dropArea">
                  <input type="file" id="fileInput" accept="image/*" hidden name="image" />
                  <div id="img-view">
                    <p>Drag and drop or upload file</p>
                  </div>
                  <button type="submit">submit</button>

                </label>


              </div>
            </form>
          </div>
        </div>
      </div></>

  )
}
