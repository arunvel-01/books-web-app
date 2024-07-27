import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: "",
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    // Fetch the current book details to pre-fill the form
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/books/${bookId}`);
        setBook(res.data);
      } catch (err) {
        console.error("Error fetching book details:", err);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || "" : value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
        value={book.title}
      />
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="desc"
        value={book.desc}
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
        value={book.price || ""}
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
        value={book.cover}
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
