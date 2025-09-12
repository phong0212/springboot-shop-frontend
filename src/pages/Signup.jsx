import React, { useState } from "react";
import axios from "axios";
import api from "../api/axios";
const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        birthDate: "",
        gender: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            await api.post("/auth/register", formData);
            alert("Đăng ký thành công!");
        } catch (err) {
            console.error(err);
            alert(err.response?.data || "Lỗi khi đăng ký");
        }
    };

    return (
        <div className="app-content">
            <div className="u-s-p-y-60">
                <div className="section__content">
                    <div className="container">
                        <div className="breadcrumb">
                            <div className="breadcrumb__wrap">
                                <ul className="breadcrumb__list">
                                    <li className="has-separator">
                                        <a href="/">Trang chủ</a>
                                    </li>
                                    <li className="is-marked">
                                        <a href="/signup">Đăng ký</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="u-s-p-b-60">
                <div className="section__intro u-s-m-b-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section__text-wrap">
                                    <h1 className="section__heading u-c-secondary">
                                        TẠO TÀI KHOẢN
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section__content">
                    <div className="container">
                        <div className="row row--center">
                            <div className="col-lg-6 col-md-8 u-s-m-b-30">
                                <div className="l-f-o">
                                    <div className="l-f-o__pad-box">
                                        <h1 className="gl-h1">THÔNG TIN CÁ NHÂN</h1>
                                        <form className="l-f-o__form" onSubmit={handleSubmit}>
                                            <div className="u-s-m-b-30">
                                                <label className="gl-label" htmlFor="reg-fname">
                                                    Tên người dùng *
                                                </label>
                                                <input
                                                    className="input-text input-text--primary-style"
                                                    type="text"
                                                    id="reg-fname"
                                                    name="username"
                                                    placeholder="Nhập tên người dùng"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="u-s-m-b-30">
                                                <label className="gl-label" htmlFor="birthday">
                                                    Ngày sinh
                                                </label>
                                                <input
                                                    className="input-text input-text--primary-style"
                                                    type="date"
                                                    id="birthDate"
                                                    name="birthDate"
                                                    value={formData.birthDate}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="u-s-m-b-30">
                                                <label className="gl-label" htmlFor="gender">
                                                    Giới tính
                                                </label>
                                                <select
                                                    className="select-box select-box--primary-style u-w-100"
                                                    id="gender"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Chọn</option>
                                                    <option value="MALE">Nam</option>
                                                    <option value="FEMALE">Nữ</option>
                                                    <option value="OTHER">Khác</option>
                                                </select>
                                            </div>

                                            <div className="u-s-m-b-30">
                                                <label className="gl-label" htmlFor="reg-email">
                                                    Email *
                                                </label>
                                                <input
                                                    className="input-text input-text--primary-style"
                                                    type="email"
                                                    id="reg-email"
                                                    name="email"
                                                    placeholder="Nhập email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="u-s-m-b-30">
                                                <label className="gl-label" htmlFor="reg-password">
                                                    Mật khẩu *
                                                </label>
                                                <input
                                                    className="input-text input-text--primary-style"
                                                    type="password"
                                                    id="reg-password"
                                                    name="password"
                                                    placeholder="Nhập mật khẩu"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="u-s-m-b-15">
                                                <button
                                                    className="btn btn--e-transparent-brand-b-2"
                                                    type="submit"
                                                >
                                                    TẠO TÀI KHOẢN
                                                </button>
                                            </div>

                                            <a className="gl-link" href="/">
                                                Quay về cửa hàng
                                            </a>
                                        </form>
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

export default Signup;
