import React, { useEffect, useState } from "react";
import Load from "../loader/Load";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
export default function Signup() {
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const [email, Setemail] = useState("");
  const [Password, SetPass] = useState("");
  const [CPassword, SetCPass] = useState("");
  // for demo purpose due to time factor use temp database array
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    setLoad(false);
  }, []);
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  function Change(e) {
    e.preventDefault();
    let num = /[0-9]/;
    let u = /^[A-Za-z\s]*$/g;
    let regex = /[^((0-9)|(a-z)|(A-Z)|\s)]/g;
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == "" || Password == "" || CPassword == "") {
      toast.error("invalid data!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else if (!res.test(email)) {
      toast.error("Enter a valid Email !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else if (Password.length < 8) {
      toast.error("Password must greater than 8 character", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else if (!num.test(Password)) {
      toast.error("Password must contain atleast one number", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else if (!regex.test(Password)) {
      toast.error("Password must contain atleast one special character", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else if (Password !== CPassword) {
      toast.error("Password mismatch!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else {
      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        toast.error("user already exist!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      } else {
        //const newUser = { email, Password };
        // Add the new user to the database
        const newUser = {
          email,
          Password
        };

        setUsers([...users, newUser]);
        Setemail("");
        SetPass("");
        // console.log(users);
        toast.success("Register successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
        console.log(users);
        localStorage.setItem("users", JSON.stringify(users));
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  }

  return (
    <>
      <ToastContainer />
      {load ? (
        <>
          <Load />
        </>
      ) : (
        <>
          <div class="wrapper">
            <form class="form">
              <div class="title">
                Hello,
                <br />
                <span>Please Login to enter</span>
              </div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                class="input"
                onChange={(e) => Setemail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                class="input"
                onChange={(e) => SetPass(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="password"
                class="input"
                onChange={(e) => SetCPass(e.target.value)}
              />
              <div class="login-with">
                <div class="button-log">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-apple"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                  </svg>
                </div>
                <div class="button-log">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-google"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                </div>
                <div class="button-log">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </div>
              </div>
              <div class="title text-center">
                <p
                  class="text-muted new_user"
                  onClick={() => navigate("/login")}
                >
                  {" "}
                  Already an user ? Login now
                </p>
              </div>
              <button class="button-confirm" onClick={Change}>
                Sign up →
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
