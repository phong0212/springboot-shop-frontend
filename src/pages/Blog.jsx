import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
const Blog = () => {
  const [blogs, setBlogs] = useState([]); // ✅ Khởi tạo là [] thay vì undefined
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/blogs")
      .then((res) => {
        setBlogs(res.data); // đảm bảo backend trả về mảng
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="u-s-p-y-60">
      <div className="container">
        <div className="blog-m">
          <div className="row blog-m-init">
            {Array.isArray(blogs) && blogs.map((blog) => (
              <div className="blog-m__element" key={blog.id}>
                <div className="bp-mini bp-mini--img">
                  <div className="bp-mini__thumbnail">
                    <a className="aspect aspect--bg-grey aspect--1366-768 u-d-block" href={`/blogs/${blog.blogId}`}>
                      <img
                        className="aspect__img"
                        src={`${process.env.REACT_APP_IMAGE_URL}${blog.imageUrl}`}
                        alt={blog.title}
                      />                    </a>
                  </div>
                  <div className="bp-mini__content">
                    <div className="bp-mini__stat">
                      <span className="bp-mini__stat-wrap">
                        <span className="bp-mini__publish-date">
                          <span>{blog.publishDate}</span>
                        </span>
                      </span>
                      <span className="bp-mini__stat-wrap">
                        <span className="bp-mini__preposition">By </span>
                        <span className="bp-mini__author">{blog.author}</span>
                      </span>
                    </div>
                    <div className="bp-mini__category">
                      {blog.categories?.map((cat, index) => (
                        <a key={index} href="#">{cat}</a>
                      ))}
                    </div>
                    <span className="bp-mini__h1">
                      <a href={`/blogs/${blog.id}`}>{blog.title}</a>
                    </span>
                    <p className="bp-mini__p">{blog.shortDescription}</p>
                  </div>
                </div>
              </div>
            ))}
            {blogs.length === 0 && (
              <p>Chưa có blog nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
