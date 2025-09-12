import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="outer-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="outer-footer__content u-s-m-b-40">
                                <span className="outer-footer__content-title">Liên hệ với chúng tôi</span>
                                <div className="outer-footer__text-wrap"><i className="fas fa-home"></i>
                                    <span>331, Quốc lộ 1, TP.HCM, Việt Nam</span>
                                </div>
                                <div className="outer-footer__text-wrap"><i className="fas fa-phone-volume"></i>
                                    <span>037 264 8367</span>
                                </div>
                                <div className="outer-footer__text-wrap"><i className="far fa-envelope"></i>
                                    <span>2200008924@ntt.edu.vn</span>
                                </div>
                                <div className="outer-footer__social">
                                    <ul>
                                        <li><a className="s-fb--color-hover" href="#"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a className="s-tw--color-hover" href="#"><i className="fab fa-twitter"></i></a></li>
                                        <li><a className="s-youtube--color-hover" href="#"><i className="fab fa-youtube"></i></a></li>
                                        <li><a className="s-insta--color-hover" href="#"><i className="fab fa-instagram"></i></a></li>
                                        <li><a className="s-gplus--color-hover" href="#"><i className="fab fa-google-plus-g"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="outer-footer__content u-s-m-b-40">
                                        <span className="outer-footer__content-title">Thông tin</span>
                                        <div className="outer-footer__list-wrap">
                                            <ul>
                                                <li><a href="cart.html">Giỏ hàng</a></li>
                                                <li><a href="dashboard.html">Tài khoản</a></li>
                                                <li><a href="shop-side-version-2.html">Nhà cung cấp</a></li>
                                                <li><a href="dash-payment-option.html">Tài chính</a></li>
                                                <li><a href="shop-side-version-2.html">Cửa hàng</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="outer-footer__content u-s-m-b-40">
                                        <span className="outer-footer__content-title">Về chúng tôi</span>
                                        <div className="outer-footer__list-wrap">
                                            <ul>
                                                <li><a href="about.html">Giới thiệu</a></li>
                                                <li><a href="contact.html">Liên hệ</a></li>
                                                <li><a href="index.html">Sơ đồ trang</a></li>
                                                <li><a href="dash-my-order.html">Vận chuyển</a></li>
                                                <li><a href="shop-side-version-2.html">Cửa hàng</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="lower-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="lower-footer__content">
                                <div className="lower-footer__copyright">
                                    <span>Bản quyền © Nguyễn Thái Phong</span>
                                    <a href="index.html">Reshop</a>
                                    <span>Đã đăng ký bản quyền</span>
                                </div>
                                <div className="lower-footer__payment">
                                    <ul>
                                        <li><i className="fab fa-cc-stripe"></i></li>
                                        <li><i className="fab fa-cc-paypal"></i></li>
                                        <li><i className="fab fa-cc-mastercard"></i></li>
                                        <li><i className="fab fa-cc-visa"></i></li>
                                        <li><i className="fab fa-cc-discover"></i></li>
                                        <li><i className="fab fa-cc-amex"></i></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;