import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "../lib/owl-global";  // confirm path đúng
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'owl.carousel'
function HeroSlider() {
  const sliderRef = useRef(null);

  useEffect(() => {
    console.log("jQuery version:", $.fn.jquery);
    console.log("typeof owlCarousel:", typeof $.fn.owlCarousel);

    if (sliderRef.current && typeof $.fn.owlCarousel === 'function') {
      $(sliderRef.current).owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['‹', '›'],
      });
    } else {
      console.error("Owl Carousel chưa được load hoặc sliderRef không đúng");
    }

    return () => {
      if (sliderRef.current && $(sliderRef.current).data("owl.carousel")) {
        $(sliderRef.current).trigger("destroy.owl.carousel");
      }
    };
  }, []);


  return (
    <div className="s-skeleton s-skeleton--h-600 s-skeleton--bg-grey">
      <div
        className="owl-carousel primary-style-1"
        id="hero-slider"
        ref={sliderRef}
      >
        <div className="hero-slide hero-slide--1">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="slider-content slider-content--animation">
                  <span className="content-span-1 u-c-secondary">
                    Cập nhật mới nhất về hàng tồn kho
                  </span>
                  <span className="content-span-2 u-c-secondary">
                    Giảm 30% cho các sản phẩm quần áo
                  </span>
                  <span className="content-span-3 u-c-secondary">
                    Tìm các sản phẩm quần áo với giá tốt nhất, đồng thời khám phá các sản phẩm bán chạy nhất
                  </span>
                  <span className="content-span-4 u-c-secondary">
                    Bắt đầu từ <span className="u-c-brand">$1050.00</span>
                  </span>
                  <a className="shop-now-link btn--e-brand" href="/product">
                    MUA NGAY
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="hero-slide hero-slide--2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="slider-content slider-content--animation">
                  <span className="content-span-1 u-c-white">Khám phá các thương hiệu hàng đầu</span>
                  <span className="content-span-2 u-c-white">Giảm 10% cho các sản phẩm quần áo</span>
                  <span className="content-span-3 u-c-white">
                    Tìm các sản phẩm quần áo với giá tốt nhất, đồng thời khám phá các sản phẩm bán chạy nhất
                  </span>
                  <span className="content-span-4 u-c-white">
                    Bắt đầu từ <span className="u-c-brand">$380.00</span>
                  </span>
                  <a className="shop-now-link btn--e-brand" href="/product">
                    MUA NGAY
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-slide hero-slide--3">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="slider-content slider-content--animation">
                  <span className="content-span-1 u-c-secondary">Khám phá các thương hiệu hàng đầu</span>
                  <span className="content-span-2 u-c-secondary">Giảm 10% cho các sản phẩm quần áo</span>
                  <span className="content-span-3 u-c-secondary">
                    Tìm các sản phẩm quần áo với giá tốt nhất, đồng thời khám phá các sản phẩm bán chạy nhất
                  </span>
                  <span className="content-span-4 u-c-secondary">
                    Bắt đầu từ <span className="u-c-brand">$550.00</span>
                  </span>
                  <a className="shop-now-link btn--e-brand" href="/product">
                    MUA NGAY
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HeroSlider;
