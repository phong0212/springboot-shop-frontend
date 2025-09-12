import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
const OrderProfile = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
    const userId = localStorage.getItem("userId"); // 👈 lấy userId động
    if (!userId) return; // chưa login thì bỏ qua

    api.get(`/user/${userId}`)
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => console.error(err));
  }, []);

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
                                </div>

                                {/* Orders */}
                                <div className="col-lg-9 col-md-12">
                                    <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                        <div className="dash__pad-2">
                                            <h1 className="dash__h1 u-s-m-b-14">My Orders</h1>
                                            <span className="dash__text u-s-m-b-30">Here you can see all products that have been delivered.</span>

                                            <div className="m-order__list">
                                                {orders.length === 0 ? (
                                                    <p>No orders found.</p>
                                                ) : (
                                                    orders.map(order => (
                                                        <div key={order.id} className="m-order__get">
                                                            <div className="manage-o__header u-s-m-b-30">
                                                                <div className="dash-l-r">
                                                                    <div>
                                                                        <div className="manage-o__text-2 u-c-secondary">Order #{order.orderCode}</div>
                                                                        <div className="manage-o__text u-c-silver">
                                                                            Placed on {new Date(order.createdAt).toLocaleString()}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="dash__link dash__link--brand">
                                                                            <a href={`/profile/orders/${order.id}`}>MANAGE</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="manage-o__description">
                                                                <div className="description__container">
                                                                    <div className="description__img-wrap">
                                                                        {/* lấy ảnh từ sản phẩm đầu tiên trong orderDetails nếu có */}
                                                                        <img
                                                                            className="u-img-fluid"
                                                                            src={`https://picsum.photos/200/200?random=${order.orderDetails[0]?.productId}`}
                                                                            alt={order.orderDetails[0]?.productName || "Product"}
                                                                        />

                                                                    </div>
                                                                    <div className="description-title">
                                                                        {order.orderDetails.length > 0
                                                                            ? order.orderDetails[0].productName
                                                                            : "No product"}
                                                                    </div>
                                                                </div>

                                                                <div className="description__info-wrap">
                                                                    <div>
                                                                        <span className="manage-o__badge badge--processing">{order.orderStatus}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="manage-o__text-2 u-c-silver">
                                                                            Tổng:{" "}
                                                                            <span className="manage-o__text-2 u-c-secondary">
                                                                                {order.orderDetails
                                                                                    .reduce((sum, item) => sum + item.productPrice * item.quantity, 0)
                                                                                    .toLocaleString("vi-VN")} ₫
                                                                            </span>
                                                                        </span>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
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
    );
};

export default OrderProfile;
