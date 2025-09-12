import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../lib/useCart";
import $ from 'jquery';
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from '../api/axios.js';
const ProductDetails = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    const [selectedVariant, setSelectedVariant] = useState(null);
    const [displayImages, setDisplayImages] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();
    const [relatedProducts, setRelatedProducts] = useState([]);

    // Fetch product detail
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/products/${id}`);
                setProductDetails(res.data);

                // chọn variant mặc định là variant đầu tiên
                const defaultVariant = res.data.variants?.[0] || null;
                setSelectedVariant(defaultVariant);

                // setup displayImages
                const originalImage = res.data.productImage
                    ? `${process.env.REACT_APP_IMAGE_URL}/images/${res.data.productImage}`
                    : null;
                const variantImgs = defaultVariant?.images?.map(
                    (img) => `${process.env.REACT_APP_IMAGE_URL}/images/variants/${img.imageUrl.trim()}`
                ) || [];
                setDisplayImages(originalImage ? [originalImage, ...variantImgs] : variantImgs);
            } catch (err) {
                console.error("Axios fetch error:", err);
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    // Fetch related products
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (!id) return;
            try {
                const res = await api.get(`/products/${id}/related`);
                setRelatedProducts(res.data);
            } catch (err) {
                console.error("Axios fetch related products error:", err);
            }
        };
        fetchRelatedProducts();
    }, [id]);

    // Gán slider refs
    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, [productDetails]);

    // Khi chọn variant
    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);

        const originalImage = productDetails.productImage
            ? `${process.env.REACT_APP_IMAGE_URL}/images/${productDetails.productImage}`
            : null;
        const variantImgs = variant.images?.map(
            (img) => `${process.env.REACT_APP_IMAGE_URL}/images/variants/${img.imageUrl.trim()}`
        ) || [];
        setDisplayImages(originalImage ? [originalImage, ...variantImgs] : variantImgs);
    };

    const handleQuantityChange = (value) => {
        if (value < 1) value = 1;
        if (value > 1000) value = 1000;
        setQuantity(value);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        const item = {
            productId: productDetails.id,
            productName: productDetails.productName,
            productImage: productDetails.productImage,
            productPrice: productDetails.productPrice,
            selectedVariant,
            quantity,
        };
        addToCart(item);
        alert("Added to cart!");
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!productDetails) return <div>No product data</div>;

    const mainSettings = {
        asNavFor: nav2,
        ref: slider1,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
    };

    const thumbSettings = {
        asNavFor: nav1,
        ref: slider2,
        slidesToShow: 4,
        swipeToSlide: true,
        focusOnSelect: true,
        arrows: false,
    };
    const variantImages = productDetails.variants?.[0]?.images || [];
    return (

        <div className="app-content">
            <div className="u-s-p-t-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">

                            <div className="pd u-s-m-b-30">
                                <div className="pd-wrap">
                                    {/* Slider ảnh lớn */}
                                    <Slider
                                        asNavFor={nav2}
                                        ref={slider1}
                                        arrows={false}
                                        fade={true}
                                        id="pd-o-initiate"
                                        className="pd-o-initiate"
                                    >
                                        {displayImages.map((img, idx) => (
                                            <div className="pd-o-img-wrap" key={idx}>
                                                <img
                                                    className="u-img-fluid"
                                                    src={img}
                                                    alt={`slide ${idx + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>

                                {/* Slider thumbnail */}
                                <div className="u-s-m-t-15">
                                    <Slider
                                        asNavFor={nav1}
                                        ref={slider2}
                                        slidesToShow={4}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        id="pd-o-thumbnail"
                                        className="pd-o-thumbnail"
                                    >
                                        {displayImages.map((img, idx) => (
                                            <div key={idx}>
                                                <img
                                                    className="u-img-fluid"
                                                    src={img}
                                                    alt={`thumb ${idx + 1}`}
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>



                        </div>
                        <div className="col-lg-7">
                            <div className="pd-detail">
                                <div>
                                    <span className="pd-detail__name">{productDetails.productName}</span></div>
                                <div>
                                    <div className="pd-detail__inline">

                                        <span className="pd-detail__price">{productDetails.productPrice.toLocaleString("vi-VN")} VNĐ</span>

                                    </div>
                                </div>
                                <div className="u-s-m-b-15">
                                    <div className="pd-detail__rating gl-rating-style"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>

                                        <span className="pd-detail__review u-s-m-l-4">

                                        </span></div>
                                </div>
                                <div className="u-s-m-b-15">
                                    <div className="pd-detail__inline">
                                        <span className="pd-detail__stock">
                                            {selectedVariant
                                                ? `${selectedVariant.quantity} trong kho`
                                                : `${productDetails.variants.reduce((sum, v) => sum + v.quantity, 0)} trong kho`}
                                        </span>
                                    </div>
                                </div>

                                {/* Chọn Variant */}
                                <div className="u-s-m-b-15" style={{ marginTop: "20px" }}>
                                    <span className="pd-detail__label u-s-m-b-8">Chọn biến thể:</span>
                                    <div className="pd-detail__inline">
                                        {productDetails.variants.map((v, idx) => (
                                            <label key={idx} style={{ marginRight: "10px" }}>
                                                <input
                                                    type="radio"
                                                    name="variant"
                                                    value={v.id}
                                                    onChange={() => handleVariantSelect(v)}
                                                />{" "}
                                                {v.size} - {v.color}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="u-s-m-b-15">
                                    <div className="pd-detail__inline">

                                        <span className="pd-detail__click-wrap"><i className="far fa-heart u-s-m-r-6"></i>

                                            <a href="signin.html">Add to Wishlist</a>

                                            <span className="pd-detail__click-count">(222)</span></span></div>
                                </div>
                                <div className="u-s-m-b-15">

                                </div>
                                <div className="u-s-m-b-15">
                                    <ul className="pd-social-list">
                                        <li>

                                            <a className="s-fb--color-hover" href="#"><i className="fab fa-facebook-f"></i></a></li>
                                        <li>

                                            <a className="s-tw--color-hover" href="#"><i className="fab fa-twitter"></i></a></li>
                                        <li>

                                            <a className="s-insta--color-hover" href="#"><i className="fab fa-instagram"></i></a></li>
                                        <li>

                                            <a className="s-wa--color-hover" href="#"><i className="fab fa-whatsapp"></i></a></li>
                                        <li>

                                            <a className="s-gplus--color-hover" href="#"><i className="fab fa-google-plus-g"></i></a></li>
                                    </ul>
                                </div>
                                <div className="u-s-m-b-15">
                                    <form className="pd-detail__form" onSubmit={handleAddToCart}>
                                        <div className="pd-detail-inline-2">
                                            <div className="u-s-m-b-15">
                                                <div className="input-counter">
                                                    <span
                                                        className="input-counter__minus fas fa-minus"
                                                        onClick={() => handleQuantityChange(quantity - 1)}
                                                    ></span>

                                                    <input
                                                        className="input-counter__text input-counter--text-primary-style"
                                                        type="text"
                                                        value={quantity}
                                                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                                                    />

                                                    <span
                                                        className="input-counter__plus fas fa-plus"
                                                        onClick={() => handleQuantityChange(quantity + 1)}
                                                    ></span>
                                                </div>
                                            </div>

                                            <div className="u-s-m-b-15">
                                                <button
                                                    className="btn btn--e-brand-b-2"
                                                    type="submit"
                                                >
                                                    Thêm vào giỏ hàng
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="u-s-m-b-15">
                                    <span className="pd-detail__label u-s-m-b-8">Chính sách sản phẩm:</span>
                                    <ul className="pd-detail__policy-list">
                                        <li><i className="fas fa-check-circle u-s-m-r-8"></i>
                                            <span>Bảo vệ người mua.</span>
                                        </li>
                                        <li><i className="fas fa-check-circle u-s-m-r-8"></i>
                                            <span>Hoàn tiền đầy đủ nếu bạn không nhận được đơn hàng.</span>
                                        </li>
                                        <li><i className="fas fa-check-circle u-s-m-r-8"></i>
                                            <span>Chấp nhận trả hàng nếu sản phẩm không đúng mô tả.</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="u-s-p-y-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="pd-tab">
                                <div className="u-s-m-b-30">
                                    <ul className="nav pd-tab__list">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab" href="#pd-desc">DESCRIPTION</a></li>
                                    </ul>
                                </div>
                                <div className="tab-content">

                                    <div className="tab-pane fade show active" id="pd-desc">
                                        <div className="pd-tab__desc">
                                            <div className="u-s-m-b-15">
                                                <p>{productDetails.productDesc}</p>
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <ul>
                                                    <li><i className="fas fa-check u-s-m-r-8"></i>
                                                        <span>Bảo vệ người mua.</span>
                                                    </li>
                                                    <li><i className="fas fa-check u-s-m-r-8"></i>
                                                        <span>Hoàn tiền đầy đủ nếu bạn không nhận được đơn hàng.</span>
                                                    </li>
                                                    <li><i className="fas fa-check u-s-m-r-8"></i>
                                                        <span>Chấp nhận trả hàng nếu sản phẩm không đúng mô tả.</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="u-s-m-b-15">
                                                <h4>THÔNG TIN SẢN PHẨM</h4>
                                            </div>

                                            <div className="u-s-m-b-15">
                                                <div className="pd-table gl-scroll">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Chất liệu chính</td>
                                                                <td>{productDetails.mainMaterial || "Không có"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Màu sắc</td>
                                                                <td>
                                                                    {productDetails.variants?.length > 0
                                                                        ? productDetails.variants.map(v => v.color).join(", ")
                                                                        : "Không có"}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Kiểu tay áo</td>
                                                                <td>{productDetails.sleeves || "Không có"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Kiểu cổ</td>
                                                                <td>{productDetails.neck || "Không có"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Số lượng chi tiết</td>
                                                                <td>{productDetails.piecesCount || "Không có"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Dịp sử dụng</td>
                                                                <td>{productDetails.occasion || "Không có"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Trọng lượng vận chuyển (kg)</td>
                                                                <td>0.5</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="u-s-p-b-90">




                <div className="section__intro u-s-m-b-46">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section__text-wrap">
                                    <h1 className="section__heading u-c-secondary u-s-m-b-12">
                                        KHÁCH HÀNG CŨNG XEM
                                    </h1>
                                    <span className="section__span u-c-grey">
                                        CÁC SẢN PHẨM KHÁCH HÀNG ĐÃ XEM
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            {relatedProducts.map((item) => (
                                <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30">
                                    <div className="product-o product-o--hover-on u-h-100">
                                        <div className="product-o__wrap">
                                            <a
                                                className="aspect aspect--bg-grey aspect--square u-d-block"
                                                href={`/product/${item.id}`} // Link tới trang chi tiết sản phẩm
                                            >
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
                                                        <a
                                                            data-modal="modal"
                                                            data-modal-id="#quick-look"
                                                            data-tooltip="tooltip"
                                                            data-placement="top"
                                                            title="Quick View"
                                                        >
                                                            <i className="fas fa-search-plus"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            data-modal="modal"
                                                            data-modal-id="#add-to-cart"
                                                            data-tooltip="tooltip"
                                                            data-placement="top"
                                                            title="Add to Cart"
                                                        >
                                                            <i className="fas fa-plus-circle"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/signin" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist">
                                                            <i className="fas fa-heart"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/signin" data-tooltip="tooltip" data-placement="top" title="Email me When the price drops">
                                                            <i className="fas fa-envelope"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <span className="product-o__category">
                                            <a href={`/shop/category/${item.categoryName}`}>{item.categoryName}</a>
                                        </span>

                                        <span className="product-o__name">
                                            <a href={`/product/${item.id}`}>{item.productName}</a>
                                        </span>

                                        <span className="product-o__price">
                                            {item.productPrice.toLocaleString("vi-VN")} VNĐ
                                            {/* Nếu có discount */}
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
        </div>
    );
}
export default ProductDetails;