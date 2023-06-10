import React, { useState, useEffect } from "react";
import "./Book.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "react-scroll-progress-bar";

const BookList = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [sortType, setSortType] = useState("");
  useEffect(() => {
    loadBooks();
  }, []);

  const handleCart = (book) => {
    toast.success("Added to cart", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });

    const cartBook = {
      id: book.id,
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks?.smallThumbnail || "",
      price: book.saleInfo?.listPrice?.amount || "999",
      author: book.volumeInfo.authors?.join(", ")
    };

    const existingCartBooks =
      JSON.parse(localStorage.getItem("cartBooks")) || [];
    const updatedCartBooks = [...existingCartBooks, cartBook];
    localStorage.setItem("cartBooks", JSON.stringify(updatedCartBooks));
    window.dispatchEvent(new Event("cartUpdated"));
    console.log(localStorage.getItem("authur"));

    // Disable the button for the added book
  };

  const loadBooks = async () => {
    setLoading(true);

    try {
      let url = "https://www.googleapis.com/books/v1/volumes?maxResults=30";

      if (searchTerm === "") {
        url += `&q=${encodeURIComponent("book")}`;
      } else if (searchTerm !== "") {
        url += `&q=${encodeURIComponent(searchTerm)}`;
      }

      if (startIndex > 0) {
        url += `&startIndex=${startIndex}`;
      }

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        if (data.items) {
          setBooks((prevBooks) => [...prevBooks, ...data.items]);
          setTotalCount(data.totalItems); // Set total count here
          setStartIndex(startIndex + 20);
        } else {
          console.log("No book items found in the API response.");
        }
      } else {
        console.log("Bad Request:", response.status);
      }
    } catch (error) {
      console.log("Error fetching books:", error);
    }

    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setBooks([]);
    setStartIndex(0);
    loadBooks();
  };

  const handleLoadMore = () => {
    loadBooks();
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setBooks([]);
    setStartIndex(0);
    loadBooks();
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortBooks(e.target.value);
  };

  const sortBooks = (sortType) => {
    let sortedBooks = [...books];
    switch (sortType) {
      case "title":
        sortedBooks.sort((a, b) =>
          a.volumeInfo.title.localeCompare(b.volumeInfo.title)
        );
        break;
      case "author":
        sortedBooks.sort((a, b) => {
          const authorA = a.volumeInfo.authors?.[0] || "";
          const authorB = b.volumeInfo.authors?.[0] || "";
          return authorA.localeCompare(authorB);
        });
        break;
      case "subject":
        sortedBooks.sort((a, b) => {
          const subjectA = a.volumeInfo.categories?.[0] || "";
          const subjectB = b.volumeInfo.categories?.[0] || "";
          return subjectA.localeCompare(subjectB);
        });
        break;
      case "publish-date":
        sortedBooks.sort((a, b) =>
          a.volumeInfo.publishedDate.localeCompare(b.volumeInfo.publishedDate)
        );
        break;
      default:
        break;
    }

    setBooks(sortedBooks);
  };

  return (
    <>
      <div>
        <ProgressBar height="8px" bgcolor="#F43059" duration="1" />
      </div>
      <div className="container">
        <div>
          <div className="header_content flex flex-c text-center text-white">
            <div>
              <h2 className="header_title text-capitalize">
                Find your book of choice
              </h2>
            </div>
            <br />
            <div>
              <input
                type="text"
                className="form-control search_box"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for books"
              />
            </div>
            <div className="mt-5">
              <p className="header_text blockquote">
                "Books and doors are the same thing. You open them, and you go
                through into another world."
                <span className="blockquote-footer">
                  <cite>Jeanette Winterson</cite>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 ">
          <h2 className="title recom_text">Recommended Books</h2>
          <div className="line"></div>
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label htmlFor="filter">
                  <b>Filter By:</b>
                </label>
                <select
                  id="filter"
                  className="form-control mt-2"
                  value={filterType}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="subject">Subject</option>
                  <option value="publish-date">Publish Date</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="form-group">
                <label htmlFor="sort">
                  <b> Sort By:</b>
                </label>
                <select
                  id="sort"
                  className="form-control mt-2"
                  value={sortType}
                  onChange={handleSortChange}
                >
                  <option value="">None</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="subject">Subject</option>
                  <option value="publish-date">Publish Date</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <p class="title">
            <b>Total Books </b>:
            <span style={{ color: "red" }}>&nbsp; {totalCount}</span>{" "}
          </p>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 mt-4">
          {books.map((book) => (
            <div className="col mb-3" key={book.id}>
              <div className="card h-100 d-flex flex-column book_card">
                <img
                  src={book.volumeInfo.imageLinks?.smallThumbnail || ""}
                  className="card-img-top img-fluid"
                  alt={book.volumeInfo.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.volumeInfo.title}</h5>
                  <p className="card-text">
                    Author: {book.volumeInfo.authors?.join(", ") || "N/A"}
                  </p>
                  <p className="card-text">
                    Published Year: {book.volumeInfo.publishedDate}
                  </p>
                  <p className="card-text">
                    Price: {book.saleInfo?.listPrice?.amount || "999"}$ only
                  </p>
                  {book.saleInfo?.saleability === "FOR_SALE" ? (
                    <p className="card-text text-success">Available</p>
                  ) : (
                    <p className="card-text text-danger">Not Available</p>
                  )}
                  {book.saleInfo?.saleability === "FOR_SALE" && (
                    <p className="card-text">
                      Copies available:{" "}
                      {book.saleInfo?.availableQuantity || "5"}
                    </p>
                  )}
                  <button
                    disabled={book.saleInfo.saleability !== "FOR_SALE"}
                    className="btn btn-primary"
                    onClick={() => handleCart(book)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <p className="text-center">
            <div
              className="spinner-border spinner-border-sm"
              role="status"
            ></div>
          </p>
        )}

        {!loading && books.length > 0 && (
          <div className="text-center">
            <button className="load-more" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BookList;
