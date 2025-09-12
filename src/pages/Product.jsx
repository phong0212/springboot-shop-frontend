import React, { useState, useEffect } from "react";
import axios from "axios";
import api from '../api/axios.js';
const Product = () => {
    const [viewMode, setViewMode] = useState('grid'); // hoặc 'list'
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);
    const [sort, setSort] = useState("createdAt,desc"); // default newest
    const [totalPages, setTotalPages] = useState(0);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        api.get(`/products?page=${page}&size=${size}&sort=${sort}`)
            .then(res => setProducts(res.data.content)) // data.content vì trả về Page
            .catch(err => console.error(err));
    }, [page, size, sort]);

    const handleSortChange = (e) => {
        const value = e.target.value;
        switch (value) {
            case "Newest Items": setSort("createdAt,desc"); break;
            case "Latest Items": setSort("createdAt,asc"); break;
            case "Lowest Price": setSort("productPrice,asc"); break;
            case "Highest Price": setSort("productPrice,desc"); break;
            // thêm Best Selling / Best Rating nếu có dữ liệu
            default: setSort("createdAt,desc");
        }
    }

    const handleAddToWishlist = async (productId) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào Wishlist!");
            return;
        }

        try {
            await api.post(`/wishlist/${userId}/${productId}`);
            alert("Đã thêm vào Wishlist!");
        } catch (err) {
            console.error(err);
            alert("Sản phẩm đã có trong Wishlist!");
        }
    };



    return (
        <div className="u-s-p-y-90">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-12">
                        <div className="shop-w-master">
                            <h1 className="shop-w-master__heading u-s-m-b-30"><i className="fas fa-filter u-s-m-r-8"></i>

                                <span>FILTERS</span></h1>
                            <div className="shop-w-master__sidebar">
                                <div className="u-s-m-b-30">
                                    <div className="shop-w shop-w--style">
                                        <div className="shop-w__intro-wrap">
                                            <h1 className="shop-w__h">DANH MỤC</h1>

                                            <span className="fas fa-minus shop-w__toggle" data-target="#s-category" data-toggle="collapse"></span>
                                        </div>
                                        <div className="shop-w__wrap collapse show" id="s-category">
                                            <ul className="shop-w__category-list gl-scroll">

                                                <li>

                                                    <a href="#">Food & Supplies</a>

                                                    <span className="category-list__text u-s-m-l-6">(0)</span></li>
                                                <li>

                                                    <a href="#">Furniture & Decor</a>

                                                    <span className="category-list__text u-s-m-l-6">(0)</span></li>
                                                <li>

                                                    <a href="#">Sports & Game</a>

                                                    <span className="category-list__text u-s-m-l-6">(0)</span></li>
                                                <li>

                                                    <a href="#">Beauty & Health</a>

                                                    <span className="category-list__text u-s-m-l-6">(0)</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="u-s-m-b-30">
                                    <div className="shop-w shop-w--style">
                                        <div className="shop-w__intro-wrap">
                                            <h1 className="shop-w__h">THƯƠNG HIỆU</h1>

                                            <span className="fas fa-minus shop-w__toggle" data-target="#s-manufacturer" data-toggle="collapse"></span>
                                        </div>
                                        <div className="shop-w__wrap collapse show" id="s-manufacturer">
                                            <ul className="shop-w__list-2">
                                                <li>
                                                    <div className="list__content">

                                                        <input type="checkbox" checked />

                                                        <span>Calvin Klein</span></div>

                                                    <span className="shop-w__total-text">(23)</span>
                                                </li>
                                                <li>
                                                    <div className="list__content">

                                                        <input type="checkbox" />

                                                        <span>Diesel</span></div>

                                                    <span className="shop-w__total-text">(2)</span>
                                                </li>
                                                <li>
                                                    <div className="list__content">

                                                        <input type="checkbox" />

                                                        <span>Polo</span></div>

                                                    <span className="shop-w__total-text">(2)</span>
                                                </li>
                                                <li>
                                                    <div className="list__content">

                                                        <input type="checkbox" />

                                                        <span>Tommy Hilfiger</span></div>

                                                    <span className="shop-w__total-text">(9)</span>
                                                </li>
                                                <li>
                                                    <div className="list__content">

                                                        <input type="checkbox" />

                                                        <span>Ndoge</span></div>

                                                    <span className="shop-w__total-text">(3)</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="u-s-m-b-30">
                                    <div className="shop-w shop-w--style">
                                        <div className="shop-w__intro-wrap">
                                            <h1 className="shop-w__h">GIÁ</h1>

                                            <span className="fas fa-minus shop-w__toggle" data-target="#s-price" data-toggle="collapse"></span>
                                        </div>
                                        <div className="shop-w__wrap collapse show" id="s-price">
                                            <form className="shop-w__form-p">
                                                <div className="shop-w__form-p-wrap">
                                                    <div>

                                                        <label for="price-min"></label>

                                                        <input className="input-text input-text--primary-style" type="text" id="price-min" placeholder="Min" /></div>
                                                    <div>

                                                        <label for="price-max"></label>

                                                        <input className="input-text input-text--primary-style" type="text" id="price-max" placeholder="Max" /></div>
                                                    <div>

                                                        <button className="btn btn--icon fas fa-angle-right btn--e-transparent-platinum-b-2" type="submit"></button></div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="u-s-m-b-30">
                                    <div className="shop-w shop-w--style">
                                        <div className="shop-w__intro-wrap">
                                            <h1 className="shop-w__h">MÀU SẮC</h1>

                                            <span className="fas fa-minus shop-w__toggle" data-target="#s-color" data-toggle="collapse"></span>
                                        </div>
                                        <div className="shop-w__wrap collapse show" id="s-color">
                                            <ul className="shop-w__list gl-scroll">
                                                <li>
                                                    <div className="color__check">

                                                        <input type="checkbox" id="jet" />

                                                        <label className="color__check-label" for="jet" style={{ backgroundColor: "#333333" }}
                                                        ></label></div>

                                                    <span className="shop-w__total-text">(2)</span>
                                                </li>
                                                <li>
                                                    <div className="color__check">

                                                        <input type="checkbox" id="folly" />

                                                        <label className="color__check-label" for="folly" style={{ backgroundColor: '#FF0055' }}></label></div>

                                                    <span className="shop-w__total-text">(4)</span>
                                                </li>
                                                <li>
                                                    <div className="color__check">

                                                        <input type="checkbox" id="yellow" />

                                                        <label className="color__check-label" for="yellow" style={{ backgroundColor: '#FFFF00' }}></label></div>

                                                    <span className="shop-w__total-text">(6)</span>
                                                </li>
                                                <li>
                                                    <div className="color__check">

                                                        <input type="checkbox" id="granite-gray" />

                                                        <label className="color__check-label" for="granite-gray" style={{ backgroundColor: '#605F5E' }}></label></div>
                                                    <span className="shop-w__total-text">(8)</span>
                                                </li>
                                                <li>
                                                    <div className="color__check">

                                                        <input type="checkbox" id="space-cadet" />
                                                        <label className="color__check-label" for="space-cadet" style={{ backgroundColor: '#1D3461' }}></label></div>

                                                    <span className="shop-w__total-text">(10)</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="u-s-m-b-30">
                                    <div className="shop-w shop-w--style">
                                        <div className="shop-w__intro-wrap">
                                            <h1 className="shop-w__h">KÍCH CỠ</h1>

                                            <span className="fas fa-minus collapsed shop-w__toggle" data-target="#s-size" data-toggle="collapse"></span>
                                        </div>
                                        <div className="shop-w__wrap collapse" id="s-size">
                                            <ul className="shop-w__list gl-scroll">
                                                <li>

                                                    <div className="check-box">

                                                        <input type="checkbox" id="xs" />
                                                        <div className="check-box__state check-box__state--primary">

                                                            <label className="check-box__label" for="xs">XS</label></div>
                                                    </div>

                                                    <span className="shop-w__total-text">(2)</span>
                                                </li>
                                                <li>

                                                    <div className="check-box">

                                                        <input type="checkbox" id="small" />
                                                        <div className="check-box__state check-box__state--primary">

                                                            <label className="check-box__label" for="small">Small</label></div>
                                                    </div>

                                                    <span className="shop-w__total-text">(4)</span>
                                                </li>
                                                <li>

                                                    <div className="check-box">

                                                        <input type="checkbox" id="medium" />
                                                        <div className="check-box__state check-box__state--primary">

                                                            <label className="check-box__label" for="medium">Medium</label></div>
                                                    </div>

                                                    <span className="shop-w__total-text">(6)</span>
                                                </li>
                                                <li>

                                                    <div className="check-box">

                                                        <input type="checkbox" id="large" />
                                                        <div className="check-box__state check-box__state--primary">

                                                            <label className="check-box__label" for="large">Large</label></div>
                                                    </div>

                                                    <span className="shop-w__total-text">(8)</span>
                                                </li>
                                                <li>

                                                    <div className="check-box">

                                                        <input type="checkbox" id="xl" />
                                                        <div className="check-box__state check-box__state--primary">

                                                            <label className="check-box__label" for="xl">XL</label></div>
                                                    </div>

                                                    <span className="shop-w__total-text">(10)</span>
                                                </li>
                                                <li>

                                                    <div className="check-box">

                                                        <input type="checkbox" id="xxl" />
                                                        <div className="check-box__state check-box__state--primary">

                                                            <label className="check-box__label" for="xxl">XXL</label></div>
                                                    </div>

                                                    <span className="shop-w__total-text">(12)</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12">
                        <div className="shop-p">
                            <div className="shop-p__toolbar u-s-m-b-30">

                                <div className="shop-p__tool-style">
                                    <div className="tool-style__group u-s-m-b-8">

                                        <span
                                            className={`js-shop-grid-target ${viewMode === 'grid' ? 'is-active' : ''}`}
                                            onClick={() => setViewMode('grid')}
                                        >
                                            Grid
                                        </span>

                                        <span
                                            className={`js-shop-list-target ${viewMode === 'list' ? 'is-active' : ''}`}
                                            onClick={() => setViewMode('list')}
                                        >
                                            List
                                        </span>
                                    </div>
                                    <form>
                                        <div className="tool-style__form-wrap">
                                            <div className="u-s-m-b-8">
                                                <select className="select-box select-box--transparent-b-2" onChange={e => setSize(Number(e.target.value))} value={size}>
                                                    <option value={8}>Show: 8</option>
                                                    <option value={12}>Show: 12</option>
                                                    <option value={16}>Show: 16</option>
                                                    <option value={28}>Show: 28</option>
                                                </select></div>
                                            <div className="u-s-m-b-8">
                                                <select className="select-box select-box--transparent-b-2" onChange={handleSortChange}>
                                                    <option selected>Newest Items</option>
                                                    <option>Latest Items</option>
                                                    <option>Best Selling</option>
                                                    <option>Best Rating</option>
                                                    <option>Lowest Price</option>
                                                    <option>Highest Price</option>
                                                </select></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="shop-p__collection">
                                <div className={`row ${"grid" === "grid" ? "is-grid-active" : "is-list-active"}`}>
                                    {products.map((product) => (
                                        <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                                            <div className="product-m">
                                                <div className="product-m__thumb">
                                                    <a className="aspect aspect--bg-grey aspect--square u-d-block" href={`/product/${product.id}`}>
                                                        <img className="aspect__img" src={product.productImage} alt={product.productName} />
                                                    </a>
                                                    <div className="product-m__quick-look">
                                                        <a className="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look"></a>
                                                    </div>
                                                    <div className="product-m__add-cart">
                                                        <a className="btn--e-brand" data-modal="modal" data-modal-id="#add-to-cart">Add to Cart</a>
                                                    </div>
                                                </div>
                                                <div className="product-m__content">
                                                    <div className="product-m__category">
                                                        <a href="#">{product.categoryName}</a>
                                                    </div>
                                                    <div className="product-m__name">
                                                        <a href={`/product-detail/${product.id}`}>{product.productName}</a>
                                                    </div>
                                                    <div className="product-m__rating gl-rating-style">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star-half-alt"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <span className="product-m__review">({product.reviewCount || 0})</span>
                                                    </div>
                                                    <div className="product-m__price">
                                                        {new Intl.NumberFormat('vi-VN').format(product.productPrice)} VNĐ
                                                    </div>
                                                    <div className="product-m__hover">
                                                        <div className="product-m__preview-description">
                                                            <span>{product.productDesc}</span>
                                                        </div>
                                                        <div className="product-m__wishlist">
                                                            <button
                                                                className="far fa-heart"
                                                                onClick={() => handleAddToWishlist(product.id)}
                                                                data-tooltip="tooltip"
                                                                data-placement="top"
                                                                title="Add to Wishlist"
                                                                style={{ background: "none", border: "none", cursor: "pointer" }}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="u-s-p-y-60">
                                <ul className="shop-p__pagination" style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                    {/* Prev button */}
                                    <li className={page === 0 ? "disabled" : ""}>
                                        <button
                                            onClick={() => setPage(page - 1)}
                                            disabled={page === 0}
                                            style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff", cursor: page === 0 ? "not-allowed" : "pointer" }}
                                        >
                                            <i className="fas fa-angle-left"></i>
                                        </button>
                                    </li>

                                    {/* Page numbers */}
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <li key={index} className={page === index ? "is-active" : ""}>
                                            <button
                                                onClick={() => setPage(index)}
                                                style={{
                                                    padding: "6px 12px",
                                                    borderRadius: "4px",
                                                    border: page === index ? "1px solid #007bff" : "1px solid #ccc",
                                                    background: page === index ? "#007bff" : "#fff",
                                                    color: page === index ? "#fff" : "#000",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}

                                    {/* Next button */}
                                    <li className={page === totalPages - 1 ? "disabled" : ""}>
                                        <button
                                            onClick={() => setPage(page + 1)}
                                            disabled={page === totalPages - 1}
                                            style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff", cursor: page === totalPages - 1 ? "not-allowed" : "pointer" }}
                                        >
                                            <i className="fas fa-angle-right"></i>
                                        </button>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Product;