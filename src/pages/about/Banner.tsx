import BannerImg from "../../assets/image/About/AboutBanner-1.png";
const Banner = () => {
  return (
    <div className="  pt-16">
      <div className="relative font-serif">
        <img className="shadow-2xl" src={BannerImg} alt="" />
        <div className="absolute top-[20%] left-[3%] bg-orange-200/65 p-5 rounded-sm max-w-11/12 text-center ">
          <h2 className="text-sm text-black sm:text-sm md:text-md lg:text-3xl">
            Welcome Our <span className="font-bold">BookNest</span> Haven for
            Book Lovers!
          </h2>
          <p className="text-[10px] md:text-[10px] lg:text-[15px]">
            Our bookstore started with a dream to connect readers with the best
            books. What began
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
