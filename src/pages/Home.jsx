import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeroSlider from "../components/HomeSlider";
import api from "../api/axios";
const Home = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState("*");
    const [feaProduct, setFeaProduct] = useState([]);
    const [specialProducts, setSpecialProducts] = useState([]);
    const [weeklyProducts, setWeeklyProducts] = useState([]);
    const [flashProducts, setFlashProducts] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/blogs")
            .then(res => {
                setBlogs(res.data); // API trả về mảng blog
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Homepage products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products/homepage");
                setProducts(res.data); // res.data là mảng ProductListResponse từ backend
            } catch (err) {
                console.error("Error fetching products", err);
            }
        };

        fetchProducts();
    }, []);

    // Filter theo category
    const filteredProducts =
        filter === "*"
            ? products
            : products.filter((p) => p.categoryName === filter);

    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const res = await api.get("/products/new");

                setNewArrivals(res.data);
            } catch (err) {
                console.error("Error fetching new arrivals", err);
            }
        };
        fetchNewArrivals();
    }, []);

    // Featured products
    useEffect(() => {
        api.get("/products/featured")
            .then(res => setFeaProduct(res.data))
            .catch(err => console.log("Error fetching featured products:", err));
    }, []);

    // Special, weekly, flash products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [specialRes, weeklyRes, flashRes] = await Promise.all([
                    api.get("/products/special"),
                    api.get("/products/weekly"),
                    api.get("/products/flash"),
                ]);

                setSpecialProducts(specialRes.data);
                setWeeklyProducts(weeklyRes.data);
                setFlashProducts(flashRes.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);


    return (
        <div id="app">


            <div className="app-content">

                <HeroSlider />



                <div className="u-s-p-b-60">
                    {/* Introduce */}
                    <div className="section__intro u-s-m-b-16">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section__text-wrap">
                                        <h1 className="section__heading u-c-secondary u-s-m-b-12">SẢN PHẨM XU HƯỚNG</h1>

                                        <span className="section__span u-c-silver">CHỌN DANH MỤC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="section__content">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="filter-category-container">
                                        <button onClick={() => setFilter("*")} className="btn filter__btn filter__btn--style-1 js-checked">ALL</button>
                                        <button onClick={() => setFilter("Nam")} className="btn filter__btn filter__btn--style-1">NAM</button>
                                        <button onClick={() => setFilter("Quần")} className="btn filter__btn filter__btn--style-1">QUẦN</button>
                                        <button onClick={() => setFilter("Áo bé trai")} className="btn filter__btn filter__btn--style-1">ÁO BÉ TRAI</button>
                                        <button onClick={() => setFilter("Áo bé gái")} className="btn filter__btn filter__btn--style-1">ÁO BÉ GÁI</button>
                                    </div>
                                    <div className="filter__grid-wrapper u-s-m-t-30">
                                        <div className="row">
                                            {filteredProducts.map((product) => (
                                                <div key={product.id} className={`col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item ${product.categoryName.toLowerCase()}`}>
                                                    <div className="product-o product-o--hover-on product-o--radius">
                                                        <div className="product-o__wrap">
                                                            <a className="aspect aspect--bg-grey aspect--square u-d-block" href={`/product/${product.id}`}>
                                                                <img
                                                                    src={product.productImage?.trim()
                                                                        ? `${process.env.REACT_APP_IMAGE_URL}/images/${product.productImage.trim()}`
                                                                        : "/fallback-image.png"}
                                                                    alt={product.productName}
                                                                />
                                                            </a>
                                                            <span className="product-o__category">
                                                                <a href="/shop">{product.categoryName}</a>
                                                            </span>
                                                            <span className="product-o__name">
                                                                <a href={`/product/${product.id}`}>{product.productName}</a>
                                                            </span>
                                                            <span className="product-o__price">
                                                                {product.productPrice.toLocaleString()} VNĐ
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
                <div className="u-s-p-b-60">

                    <div className="section__intro u-s-m-b-46">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section__text-wrap">
                                        <h1 className="section__heading u-c-secondary u-s-m-b-12">SẢN PHẨM MỚI</h1>

                                        <span className="section__span u-c-silver">GET UP FOR NEW ARRIVALS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="section__content">
                        <div className="container">
                            <div className="row">
                                {newArrivals.map(item => (
                                    <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
                                        {console.log("Related item image:", item.productImage)}

                                        <div className="product-o product-o--hover-on u-h-100">
                                            <div className="product-o__wrap">
                                                <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                                                    <img
                                                        className="aspect__img"
                                                        src={
                                                            item.productImage && item.productImage.trim()
                                                                ? `${process.env.REACT_APP_IMAGE_URL}/images/${item.productImage.trim()}`
                                                                : "/fallback-image.png"
                                                        }
                                                        alt={item.productName || ""}
                                                    />


                                                </a>
                                                <div className="product-o__action-wrap">
                                                    <ul className="product-o__action-list">
                                                        <li>
                                                            <a data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick View">
                                                                <i className="fas fa-search-plus"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a data-modal="modal" data-modal-id="#add-to-cart" data-tooltip="tooltip" data-placement="top" title="Add to Cart">
                                                                <i className="fas fa-plus-circle"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist">
                                                                <i className="fas fa-heart"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="signin.html" data-tooltip="tooltip" data-placement="top" title="Email me When the price drops">
                                                                <i className="fas fa-envelope"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <span className="product-o__category">
                                                <a href="shop-side-version-2.html">{item.categoryName}</a>
                                            </span>

                                            <span className="product-o__name">
                                                <a href="product-detail.html">{item.productName}</a>
                                            </span>

                                            <div className="product-o__rating gl-rating-style">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                                <span className="product-o__review">({item.review})</span>
                                            </div>

                                            <span className="product-o__price">
                                                {item.productPrice.toLocaleString("vi-VN")} VNĐ
                                                {item.discount && (
                                                    <span className="product-o__discount">{item.discount.toLocaleString("vi-VN")} VNĐ</span>
                                                )}
                                            </span>

                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
                {/* Featured Products */}
                <div className="u-s-p-y-60">

                    <div className="section__intro u-s-m-b-46">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section__text-wrap">
                                        <h1 className="section__heading u-c-secondary u-s-m-b-12">SẢN PHẨM NỔI BẬT</h1>

                                        <span className="section__span u-c-silver">FIND NEW FEATURED PRODUCTS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section__content">
                        <div className="container">
                            <div className="row">
                                {feaProduct.map(item => (
                                    <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
                                        <div className="product-o product-o--hover-on u-h-100">
                                            <div className="product-o__wrap">
                                                <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                                                    <img
                                                        className="aspect__img"
                                                        src={item.productImage?.trim()
                                                            ? `${process.env.REACT_APP_IMAGE_URL}/images/${item.productImage.trim()}`
                                                            : "/fallback-image.png"}
                                                        alt={item.productName}
                                                    />
                                                </a>
                                                <div className="product-o__action-wrap">
                                                    <ul className="product-o__action-list">
                                                        <li>
                                                            <a data-modal="modal" data-modal-id="#quick-look" title="Quick View">
                                                                <i className="fas fa-search-plus"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a data-modal="modal" data-modal-id="#add-to-cart" title="Add to Cart">
                                                                <i className="fas fa-plus-circle"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="signin.html" title="Add to Wishlist">
                                                                <i className="fas fa-heart"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="signin.html" title="Email me When the price drops">
                                                                <i className="fas fa-envelope"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <span className="product-o__category">
                                                <a href="shop-side-version-2.html">{item.categoryName}</a>
                                            </span>

                                            <span className="product-o__name">
                                                <a href="product-detail.html">{item.productName}</a>
                                            </span>

                                            <div className="product-o__rating gl-rating-style">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                                <span className="product-o__review">(0)</span>
                                            </div>

                                            <span className="product-o__price">
                                                {item.productPrice.toLocaleString("vi-VN")} VNĐ
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
                {/* Row Product */}
                <div className="u-s-p-b-60">
                    <div className="section__content">
                        <div className="container">
                            <div className="row">
                                {/* Special */}
                                <div className="col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
                                    <div className="column-product">
                                        <span className="column-product__title u-c-secondary u-s-m-b-25">
                                            SẢN PHẨM ĐỘC QUYỀN
                                        </span>
                                        <ul className="column-product__list">
                                            {specialProducts.map((product) => (
                                                <li className="column-product__item" key={product.id}>
                                                    <div className="product-l">
                                                        <div className="product-l__img-wrap">
                                                            <a
                                                                className="aspect aspect--bg-grey aspect--square u-d-block product-l__link"
                                                                href="product-detail.html"
                                                            >
                                                                <img
                                                                    className="aspect__img"
                                                                    src={product.productImage?.trim()
                                                                        ? `${process.env.REACT_APP_IMAGE_URL}/images/${product.productImage.trim()}`
                                                                        : "/fallback-image.png"}
                                                                    alt={product.productName}
                                                                />

                                                            </a>
                                                        </div>
                                                        <div className="product-l__info-wrap">
                                                            <span className="product-l__category">
                                                                <a href="shop-side-version-2.html">{product.categoryName}</a>
                                                            </span>
                                                            <span className="product-l__name">
                                                                <a href="product-detail.html">{product.productName}</a>
                                                            </span>
                                                            <span className="product-l__price">
                                                                {product.productPrice.toLocaleString("vi-VN")} VNĐ
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Weekly */}
                                <div className="col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
                                    <div className="column-product">
                                        <span className="column-product__title u-c-secondary u-s-m-b-25">
                                            SẢN PHẨM HÀNG TUẦN
                                        </span>
                                        <ul className="column-product__list">
                                            {weeklyProducts.map((product) => (
                                                <li className="column-product__item" key={product.id}>
                                                    <div className="product-l">
                                                        <div className="product-l__img-wrap">
                                                            <a
                                                                className="aspect aspect--bg-grey aspect--square u-d-block product-l__link"
                                                                href="product-detail.html"
                                                            >
                                                                <img
                                                                    className="aspect__img"
                                                                    src={product.productImage?.trim()
                                                                        ? `${process.env.REACT_APP_IMAGE_URL}/images/${product.productImage.trim()}`
                                                                        : "/fallback-image.png"}
                                                                    alt={product.productName}
                                                                />

                                                            </a>
                                                        </div>
                                                        <div className="product-l__info-wrap">
                                                            <span className="product-l__category">
                                                                <a href="shop-side-version-2.html">{product.categoryName}</a>
                                                            </span>
                                                            <span className="product-l__name">
                                                                <a href="product-detail.html">{product.productName}</a>
                                                            </span>
                                                            <span className="product-l__price">
                                                                {product.productPrice.toLocaleString("vi-VN")} VNĐ
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Flash */}
                                <div className="col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
                                    <div className="column-product">
                                        <span className="column-product__title u-c-secondary u-s-m-b-25">
                                            SẢN PHẨM GIẢM GIÁ
                                        </span>
                                        <ul className="column-product__list">
                                            {flashProducts.map((product) => (
                                                <li className="column-product__item" key={product.id}>
                                                    <div className="product-l">
                                                        <div className="product-l__img-wrap">
                                                            <a
                                                                className="aspect aspect--bg-grey aspect--square u-d-block product-l__link"
                                                                href="product-detail.html"
                                                            >
                                                                <img
                                                                    className="aspect__img"
                                                                    src={product.productImage?.trim()
                                                                        ? `${process.env.REACT_APP_IMAGE_URL}/images/${product.productImage.trim()}`
                                                                        : "/fallback-image.png"}
                                                                    alt={product.productName}
                                                                />

                                                            </a>
                                                        </div>
                                                        <div className="product-l__info-wrap">
                                                            <span className="product-l__category">
                                                                <a href="shop-side-version-2.html">{product.categoryName}</a>
                                                            </span>
                                                            <span className="product-l__name">
                                                                <a href="product-detail.html">{product.productName}</a>
                                                            </span>
                                                            <span className="product-l__price">
                                                                {product.productPrice.toLocaleString("vi-VN")} VNĐ
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Features của shop */}
                <div className="u-s-p-b-60">
                    <div className="section__content">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 u-s-m-b-30">
                                    <div className="service u-h-100">
                                        <div className="service__icon"><i className="fas fa-truck"></i></div>
                                        <div className="service__info-wrap">
                                            <span className="service__info-text-1">Miễn Phí Vận Chuyển</span>
                                            <span className="service__info-text-2">Miễn phí vận chuyển cho tất cả đơn hàng tại Mỹ hoặc đơn trên $200</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 u-s-m-b-30">
                                    <div className="service u-h-100">
                                        <div className="service__icon"><i className="fas fa-redo"></i></div>
                                        <div className="service__info-wrap">
                                            <span className="service__info-text-1">Mua Sắm An Tâm</span>
                                            <span className="service__info-text-2">Chính sách bảo vệ đảm bảo đơn hàng của bạn từ lúc đặt đến khi giao hàng</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 u-s-m-b-30">
                                    <div className="service u-h-100">
                                        <div className="service__icon"><i className="fas fa-headphones-alt"></i></div>
                                        <div className="service__info-wrap">
                                            <span className="service__info-text-1">Trung Tâm Hỗ Trợ 24/7</span>
                                            <span className="service__info-text-2">Hỗ trợ liên tục để mang lại trải nghiệm mua sắm mượt mà</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog */}
                <div className="u-s-p-b-60">
                    <div className="section__intro u-s-m-b-46">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section__text-wrap">
                                        <h1 className="section__heading u-c-secondary u-s-m-b-12">TIN MỚI NHẤT TỪ BLOG</h1>
                                        <span className="section__span u-c-silver">BẮT ĐẦU NGÀY MỚI VỚI TIN TỨC CẬP NHẬT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section__content">
                        <div className="container">
                            <div className="row">
                                {blogs.slice(0, 3).map(blog => (
                                    <div className="col-lg-4 col-md-6 u-s-m-b-30" key={blog.blogId}>
                                        <div className="bp-mini bp-mini--img u-h-100">
                                            <div className="bp-mini__thumbnail">
                                                <a className="aspect aspect--bg-grey aspect--1366-768 u-d-block" href={`/blogs/${blog.blogId}`}>
                                                    <img
                                                        className="aspect__img"
                                                        src={blog.imageUrl?.trim()
                                                            ? `${process.env.REACT_APP_IMAGE_URL}${blog.imageUrl.trim()}`
                                                            : "/fallback-image.png"}
                                                        alt={blog.title}
                                                    />
                                                </a>
                                            </div>
                                            <div className="bp-mini__content">
                                                <div className="bp-mini__stat">
                                                    <span className="bp-mini__stat-wrap">
                                                        <span className="bp-mini__publish-date">
                                                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                                        </span>
                                                    </span>
                                                    <span className="bp-mini__stat-wrap">
                                                        <span className="bp-mini__preposition">By</span>
                                                        <span className="bp-mini__author">{blog.author}</span>
                                                    </span>
                                                </div>
                                                <div className="bp-mini__category">
                                                    {blog.category && <a>{blog.category}</a>}
                                                </div>
                                                <span className="bp-mini__h1">
                                                    <a href={`/blogs/${blog.blogId}`}>{blog.title}</a>
                                                </span>
                                                <p className="bp-mini__p">{blog.summary}</p>
                                                <div className="blog-t-w">
                                                    {blog.tags?.split(",").map((tag, idx) => (
                                                        <a key={idx} className="gl-tag btn--e-transparent-hover-brand-b-2">{tag}</a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {blogs.length === 0 && <p>Chưa có blog nào.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}
export default Home;