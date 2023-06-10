import React, { useEffect, useState } from "react";
import Load from "../loader/Load";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import BookList from "../Book/Book";
export default function Home() {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);

  return (
    <>
      <ToastContainer />
      {load ? (
        <Load />
      ) : (
        <>
          <Navbar />
          <BookList />
        </>
      )}
    </>
  );
}
