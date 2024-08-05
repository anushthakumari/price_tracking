import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Amazon from "../Assets/amazon.jpg";
const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          borderRadius: "10px",
          padding: "1px",
          color: "#e90074",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  const slides = [
    {
      id: 1,
      image:
        "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg",
      caption: "Caption 1",
    },
    {
      id: 2,
      image: Amazon,
      caption: "Caption 2",
    },
    {
      id: 3,
      image:
        "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg",
      caption: "Caption 3",
    },
    {
      id: 4,
      image:
        "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/b656a7f4-4688-4997-bb7c-54b78793981e1658752386588-Western-Wear_Desk.jpg",
      caption: "Caption 4",
    },
  ];

  return (
    <div className="container mx-auto p-4 bg-black overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full  flex items-center justify-center"
          >
            <img
              className="w-full h-[400px] object-cover object-center rounded-lg "
              src={slide.image}
              alt={slide.caption}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
