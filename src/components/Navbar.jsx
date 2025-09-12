import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MiniCart from "./MiniCart";
import axios from "axios";
import api from '../api/axios.js';
const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        navigate("/signin"); // chuyển về trang đăng nhập
    };
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        api.get("/category")
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));

        api.get("/brands")
            .then(res => setBrands(res.data))
            .catch(err => console.error(err));
    }, []);
    return (
        <header className="header--style-1">

            <nav className="primary-nav primary-nav-wrapper--border">
                <div className="container">

                    <div className="primary-nav">


                        <a className="main-logo" href="/">

                            <img src="/images/logo/logo-1.png" alt="Logo" />
                        </a>

                        <form className="main-form">

                            <label htmlFor="main-search"></label>

                            <input className="input-text input-text--border-radius input-text--style-1" type="text"
                                id="main-search" placeholder="Search" />

                            <button className="btn btn--icon fas fa-search main-search-button" type="submit"></button>
                        </form>


                        <div className="menu-init" id="navigation">

                            <button className="btn btn--icon toggle-button toggle-button--secondary fas fa-cogs"
                                type="button"></button>

                            <div className="ah-lg-mode">

                                <span className="ah-close">✕ Close</span>

                                <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                                    <li className="has-dropdown" data-tooltip="tooltip" data-placement="left"
                                        title="Account">

                                        <a><i className="far fa-user-circle"></i></a>


                                        <span className="js-menu-toggle"></span>
                                        <ul className="width:120px">
                                            <li>

                                                <a href="/profile"><i className="fas fa-user-circle u-s-m-r-6"></i>

                                                    <span>Account</span></a>
                                            </li>
                                            <li>

                                                <a href="/signup"><i className="fas fa-user-plus u-s-m-r-6"></i>

                                                    <span>Signup</span></a>
                                            </li>
                                            <li>

                                                <a href="/signin"><i className="fas fa-lock u-s-m-r-6"></i>

                                                    <span>Signin</span></a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleLogout();
                                                    }}
                                                >
                                                    <i className="fas fa-lock-open u-s-m-r-6"></i>
                                                    Signout
                                                </a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="has-dropdown" data-tooltip="tooltip" data-placement="left"
                                        title="Settings">

                                        <a><i className="fas fa-user-cog"></i></a>


                                        <span className="js-menu-toggle"></span>
                                        <ul className="width:120px">
                                            <li className="has-dropdown has-dropdown--ul-right-100">

                                                <a>Language<i className="fas fa-angle-down u-s-m-l-6"></i></a>


                                                <span className="js-menu-toggle"></span>
                                                <ul className="width:120px">
                                                    <li>

                                                        <a className="u-c-brand">ENGLISH</a>
                                                    </li>
                                                    <li>

                                                        <a>ARABIC</a>
                                                    </li>
                                                    <li>

                                                        <a>FRANCAIS</a>
                                                    </li>
                                                    <li>

                                                        <a>ESPANOL</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="has-dropdown has-dropdown--ul-right-100">

                                                <a>Currency<i className="fas fa-angle-down u-s-m-l-6"></i></a>


                                                <span className="js-menu-toggle"></span>
                                                <ul className="width:225px">
                                                    <li>

                                                        <a className="u-c-brand">$ - US DOLLAR</a>
                                                    </li>
                                                    <li>

                                                        <a>£ - BRITISH POUND STERLING</a>
                                                    </li>
                                                    <li>

                                                        <a>€ - EURO</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li data-tooltip="tooltip" data-placement="left" title="Contact">

                                        <a href="tel:+0900901904"><i className="fas fa-phone-volume"></i></a>
                                    </li>
                                    <li data-tooltip="tooltip" data-placement="left" title="Mail">

                                        <a href="mailto:contact@domain.com"><i className="far fa-envelope"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


            <nav className="secondary-nav-wrapper">
                <div className="container">

                    <div className="secondary-nav">




                        <div className="menu-init" id="navigation2">
                            <button className="btn btn--icon toggle-button toggle-button--secondary fas fa-cog" type="button"></button>
                            <div className="ah-lg-mode">
                                <span className="ah-close">✕ Close</span>
                                <ul className="ah-list ah-list--design2 ah-list--link-color-secondary">
                                    <li>
                                        <Link to="/">TRANG CHỦ</Link>
                                    </li>
                                    <li>
                                        <Link to="/product">SẢN PHẨM</Link>
                                    </li>

                                    {/* DANH MỤC */}
                                    <li className="has-dropdown">
                                        <a style={{ color: "black" }}>DANH MỤC<i className="fas fa-angle-down u-s-m-l-6"></i></a>
                                        <span className="js-menu-toggle"></span>
                                        <ul className="width:200px">
                                            {categories.map(cat => (
                                                <li key={cat.id}>
                                                    <Link to={`/category/${cat.name.toLowerCase()}`}>{cat.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>

                                    {/* THƯƠNG HIỆU */}
                                    <li className="has-dropdown">
                                        <a style={{ color: "black" }}>THƯƠNG HIỆU<i className="fas fa-angle-down u-s-m-l-6"></i></a>
                                        <span className="js-menu-toggle"></span>
                                        <ul className="width:200px">
                                            {brands.map(brand => (
                                                <li key={brand.id}>
                                                    <Link to={`/brand/${brand.name}`}>{brand.name.toUpperCase()}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>

                                    <li><a href="/blog">BÀI VIẾT</a></li>
                                    <li><a href="/contact">LIÊN HỆ</a></li>
                                </ul>
                            </div>
                        </div>


                        <div className="menu-init" id="navigation3">

                            <button
                                className="btn btn--icon toggle-button toggle-button--secondary fas fa-shopping-bag toggle-button-shop"
                                type="button"></button>

                            <span className="total-item-round">2</span>

                            <div className="ah-lg-mode">

                                <span className="ah-close">✕ Close</span>

                                <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                                    <li>

                                        <a href="index.html"><i className="fas fa-home u-c-brand"></i></a>
                                    </li>

                                    <li>
                                        <Link to="/wishlist">
                                            <i className="far fa-heart"></i>
                                        </Link>
                                    </li>
                                    <MiniCart />

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );

};
export default Navbar;