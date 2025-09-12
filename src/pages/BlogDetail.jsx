import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";
const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(res => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Đang tải blog...</p>;
  if (!blog) return <p>Blog không tồn tại.</p>;

  return (
    <div className="u-s-p-y-90">
      <div className="detail-post">
        <div className="bp-detail">
          {/* Thumbnail */}
          {blog.imageUrl && (
            <div className="bp-detail__thumbnail">
              <div className="aspect aspect--bg-grey aspect--1366-768">
                <img className="aspect__img" src={`${process.env.REACT_APP_IMAGE_URL}${blog.imageUrl}`}
                  alt={blog.title} />
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bp-detail__info-wrap">
            <div className="bp-detail__stat">
              <span className="bp-detail__stat-wrap">
                <span className="bp-detail__publish-date">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </span>
              </span>
              <span className="bp-detail__stat-wrap">
                <span className="bp-detail__author">{blog.author}</span>
              </span>
              <span className="bp-detail__stat-wrap">
                <span className="bp-detail__category">
                  {blog.category && <a href="#">{blog.category}</a>}
                </span>
              </span>
            </div>

            {/* Title */}
            <span className="bp-detail__h1">
              <a href="#">{blog.title}</a>
            </span>

            {/* Tags */}
            <div className="blog-t-w">
              {blog.tags?.split(",").map((tag, index) => (
                <a key={index} className="gl-tag btn--e-transparent-hover-brand-b-2" href="#">{tag.trim()}</a>
              ))}
            </div>

            {/* Content */}
            <p className="bp-detail__p">{blog.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
