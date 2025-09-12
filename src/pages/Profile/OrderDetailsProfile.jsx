import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from '../../api/axios.js';
const OrderDetailsProfile = () => {
    const { orderId } = useParams(); // Lấy orderId từ URL
    const [order, setOrder] = useState(null);

    useEffect(() => {
        api.get(`/orders/${orderId}`)
            .then(res => setOrder(res.data))
            .catch(err => console.error(err));
    }, [orderId]);

    if (!order) return <p>Loading...</p>;

    const totalPrice = order.orderDetails.reduce(
        (sum, item) => sum + item.productPrice * item.quantity, 0
    );

    return (
        <div className="app-content">
            <div className="u-s-p-y-60">
                <div className="section__content">
                    <div className="container">
                        <div className="breadcrumb">
                            <div className="breadcrumb__wrap">
                                <ul className="breadcrumb__list">
                                    <li className="has-separator">
                                        <a href="/">Home</a>
                                    </li>
                                    <li className="is-marked">
                                        <a href="/profile/orders">My Account</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <h1 className="dash__h1 u-s-m-b-30">Order #{order.orderCode}</h1>
                        <p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>
                        <p>Status: {order.orderStatus}</p>
                    </div>
                </div>
            </div>

            <div className="u-s-p-b-60">
                <div className="section__content">
                    <div className="dash">
                        <div className="container">
                            <div className="row">
                                {/* Sidebar */}
                                <div className="col-lg-3 col-md-12">
                                    <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                                        <div className="dash__pad-1">
                                            <span className="dash__text u-s-m-b-16">Hello, John Doe</span>
                                            <ul className="dash__f-list">
                                                <li><a className="dash-active" href="/profile/details">Manage My Account</a></li>
                                                <li><a href="/profile">My Profile</a></li>
                                                <li><a href="/profile/orders">My Orders</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
                                        <div class="dash__pad-1">
                                            <ul class="dash__w-list">
                                                <li>
                                                    <div class="dash__w-wrap">

                                                        <span class="dash__w-icon dash__w-icon-style-1"><i class="fas fa-cart-arrow-down"></i></span>

                                                        <span class="dash__w-text">4</span>

                                                        <span class="dash__w-name">Orders Placed</span></div>
                                                </li>
                                                <li>
                                                    <div class="dash__w-wrap">

                                                        <span class="dash__w-icon dash__w-icon-style-2"><i class="fas fa-times"></i></span>

                                                        <span class="dash__w-text">0</span>

                                                        <span class="dash__w-name">Cancel Orders</span></div>
                                                </li>
                                                <li>
                                                    <div class="dash__w-wrap">

                                                        <span class="dash__w-icon dash__w-icon-style-3"><i class="far fa-heart"></i></span>

                                                        <span class="dash__w-text">0</span>

                                                        <span class="dash__w-name">Wishlist</span></div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="col-lg-9 col-md-12">
                                    {order.orderDetails.map((item, index) => (
                                        <div key={index} className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                            <div className="dash__pad-2 manage-o">
                                                <div className="manage-o__description">
                                                    <div className="description__container">
                                                        <div className="description__img-wrap">
                                                            <img
                                                                className="u-img-fluid"
                                                                src={item.productImage ? `http://localhost:8080/images/${item.productImage}` : `https://picsum.photos/200/200?random=${item.productId}`}
                                                                alt={item.productName}
                                                            />
                                                        </div>
                                                        <div className="description-title">{item.productName}</div>
                                                    </div>
                                                    <div className="description__info-wrap">
                                                        <div>
                                                            <span className="manage-o__text-2 u-c-silver">Quantity:
                                                                <span className="manage-o__text-2 u-c-secondary"> {item.quantity}</span>
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="manage-o__text-2 u-c-silver">Price:
                                                                <span className="manage-o__text-2 u-c-secondary"> {item.productPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Tổng tiền */}
                                    <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                                        <div className="dash__pad-3">
                                            <h2 className="dash__h2 u-s-m-b-8">Total Summary</h2>
                                            <div className="dash-l-r u-s-m-b-8">
                                                <div className="manage-o__text-2 u-c-secondary">Total</div>
                                                <div className="manage-o__text-2 u-c-secondary">{totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipping Info */}
                                    <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                                        <div className="dash__pad-3">
                                            <h2 className="dash__h2 u-s-m-b-8">Shipping info</h2>
                                            <p>Tên người nhận hàng: {order.shipping.shippingName}</p>
                                            <p>Địa chỉ giao hàng: {order.shipping.shippingAddress}</p>
                                            <p>Email người đặt hàng: {order.shipping.shippingEmail}</p>
                                            <p>Phương thức vận chuyển: {order.shipping.shippingMethod}</p>
                                            <p>Ghi chú đơn hàng: {order.shipping.shippingNote}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsProfile;
