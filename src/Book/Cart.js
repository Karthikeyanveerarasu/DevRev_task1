import React, { useState, useEffect } from "react";
import { Badge, Button, Offcanvas, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  const [show, setShow] = useState(false);
  const [cartBooks, setCartBooks] = useState([]);

  useEffect(() => {
    const updateCartItems = () => {
      // Load cart books from localStorage
      const storedBooks = JSON.parse(localStorage.getItem("cartBooks"));
      if (storedBooks) {
        setCartBooks(storedBooks);
      }
    };

    // Listen for the custom event to update the cart items
    window.addEventListener("cartUpdated", updateCartItems);

    // Load the initial cart items
    updateCartItems();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("cartUpdated", updateCartItems);
    };
  }, []);
  const workonprogress = () => {
    toast.info("Sorry 🥺 work on progress !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };
  const removeFromCart = (bookId) => {
    const index = cartBooks.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      const updatedBooks = [...cartBooks];
      updatedBooks.splice(index, 1);
      setCartBooks(updatedBooks);
      localStorage.setItem("cartBooks", JSON.stringify(updatedBooks));
      // Dispatch the custom event to notify other components about the cart update
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  return (
    <>
      <ToastContainer />
      <Button
        variant="danger"
        className="rounded btn"
        onClick={() => setShow(!show)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <Badge pill bg="light text-dark mb-2">
          {cartBooks.length}
        </Badge>
      </Button>
      <Offcanvas show={show} onHide={() => setShow(!show)} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="text-center text-uppercase">
              <h4>Your Cart</h4>
            </div>
            <hr />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="pb-4">
          {cartBooks.length === 0 ? (
            <p class="title">
              Your cart is empty{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="20"
                fill="currentColor"
                class="bi bi-emoji-frown"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
              </svg>
            </p>
          ) : (
            cartBooks.map((book) => (
              <div
                class="card mb-3"
                style={{ maxWidth: "540px" }}
                key={book.id}
              >
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      src={book.image}
                      class="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{book.title}</h5>
                      <p class="card-text">Author: {book.author}</p>

                      <p class="card-text">
                        <small class="text-muted">
                          Price: {book.price}$ only
                        </small>
                      </p>
                      <div class="text-center">
                        <Button
                          variant="warning"
                          onClick={() => removeFromCart(book.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-dash-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                          </svg>{" "}
                          &nbsp; Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="text-center">
            <Button
              variant="danger"
              className="w-100"
              onClick={workonprogress}
              disabled={cartBooks.length === 0}
              style={{ marginTop: "-10px" }}
            >
              {" "}
              <span>Buy now</span>
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
