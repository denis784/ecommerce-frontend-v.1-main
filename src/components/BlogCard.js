import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">24 Feb, 2023</p>
        <h5 className="title">Biashara kwa Go Soko Kenya</h5>
        <p className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quaerat
          accusamus officia
        </p>
        <Link to="/blog/:id" className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
