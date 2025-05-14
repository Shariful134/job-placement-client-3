import { FaBook } from "react-icons/fa";

import Books from "@/components/books/Books";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useGetAllcategoryQuery } from "@/redux/category/categoryApi";
import { Skeleton } from "@/components/ui/skeleton";
import { TCategory } from "../admin/CreateCategory";
import { MarqueeDemo } from "./Marque";
import FeatureSection from "./Featured";

import bannerImg from "../../assets/image/caroselImg-1.png";
import upcoming1 from "../../assets/image/download.jpeg";
import upcoming2 from "../../assets/image/upcoming2.jpeg";
import upcoming3 from "../../assets/image/upcoming3.jpeg";
import upcoming4 from "../../assets/image/upcoming4.jpeg";

const Home = () => {
  const location = useLocation();
  const { data: allData, isLoading } = useGetAllcategoryQuery(undefined);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <div className="pt-16 bg-[#fafafa] dark:bg-black">
      <div className="relative">
        <img className="h-99 w-full" src={bannerImg} alt="" />
        <div className="hidden sm:block absolute top-20 left-1/9 -translate-x-[6-%] bg-red-100/45 font-[inter] p-4 rounded-lg max-w-93 text-center">
          <h2 className="text-3xl mb-2 font-bold">Your Best Companion</h2>
          <p>
            Discover a vast collection of books from every genre. Whether you
            love fiction,
          </p>
          <button className="btn border font-[inter] rounded-md border-gray-600 bg-slate-200 hover:bg-slate-300 sm:btn-sm md:btn-md mt-2">
            Buy Now
          </button>
        </div>
      </div>
      {/* ===============Marque sections =================== */}
      <MarqueeDemo></MarqueeDemo>
      {/* ===============Category sections =================== */}
      <section className="mt-10 pt-10 container mx-auto">
        <div className=" text-center font-[inter]">
          <h2 className="text-3xl mb-2 text-cyan-500">
            -- <FaBook className="inline" /> Explore Our Top Categories{" "}
            <FaBook className="inline" /> --{" "}
          </h2>
          <p className="max-w-3/6 mx-auto font-[inter]">
            {" "}
            Dive into a handpicked collection of our best-selling book
            categories. From cutting-edge technology and personal growth to
            captivating fiction, there's something here for every reader.
          </p>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-30 my-10 pb-10">
          {allData?.data?.map((category: TCategory, index: number) => (
            <div key={index} className=" flex justify-center items-center">
              <a href={`/category/details/${category?.name}`} className="group">
                <div className="w-40 h-40">
                  <img
                    src={category?.imageURL}
                    alt="Category"
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-md group-hover:border-slate-300"
                  />
                  <div className="cursor-pointer hover:border-4 mt-5 bg-slate-300 text-black text-center text-sm font-medium py-2 rounded-sm border-white border-2">
                    {category?.name}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===================upcomming Books========================== */}
      <section className="mt-15 pt-15 container mx-auto">
        <div className=" text-center font-[inter]">
          <h2 className="text-3xl mb-2 text-cyan-500">
            -- <FaBook className="inline" /> Upcoming Book Releases{" "}
            <FaBook className="inline" /> --{" "}
          </h2>
          <p className="max-w-3/6 mx-auto font-[inter]">
            {" "}
            Dive into a handpicked collection of our best-selling book
            categories. From cutting-edge technology and personal growth to
            captivating fiction, there's something here for every reader.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-10 my-10 pb-10">
          <div className=" flex justify-center items-center">
            <a href="/#" className="group">
              <div>
                <div className="w-48 h-64 overflow-hidden">
                  <img
                    src={upcoming1}
                    alt="Category"
                    className="w-full h-full object-cover border-4 border-white shadow-md group-hover:border-slate-300"
                  />
                </div>

                <div className="cursor-pointer mt-5 bg-slate-300 text-black text-center text-sm font-medium py-2 rounded-sm border-white border-2">
                  "The Silent Hacker"
                </div>
              </div>
            </a>
          </div>
          <div className=" flex justify-center items-center">
            <a href="/#" className="group">
              <div>
                <div className="w-48 h-64 overflow-hidden">
                  <img
                    src={upcoming2}
                    alt="Category"
                    className="w-full h-full object-cover border-4 border-white shadow-md group-hover:border-slate-300"
                  />
                </div>

                <div className="cursor-pointer mt-5 bg-slate-300 text-black text-center text-sm font-medium py-2 rounded-sm border-white border-2">
                  " the MetaMind"
                </div>
              </div>
            </a>
          </div>
          <div className=" flex justify-center items-center">
            <a href="/#" className="group">
              <div>
                <div className="w-48 h-64 overflow-hidden">
                  <img
                    src={upcoming3}
                    alt="Category"
                    className="w-full h-full object-cover border-4 border-white shadow-md group-hover:border-slate-300"
                  />
                </div>

                <div className="cursor-pointer mt-5 bg-slate-300 text-black text-center text-sm font-medium py-2 rounded-sm border-white border-2">
                  "Mental Potential"
                </div>
              </div>
            </a>
          </div>
          <div className=" flex justify-center items-center">
            <a href="/#" className="group">
              <div>
                <div className="w-48 h-64 overflow-hidden">
                  <img
                    src={upcoming4}
                    alt="Category"
                    className="w-full h-full object-cover border-4 border-white shadow-md group-hover:border-slate-300"
                  />
                </div>

                <div className="cursor-pointer mt-5 bg-slate-300 text-black text-center text-sm font-medium py-2 rounded-sm border-white border-2">
                  " Garage to Global"
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      {/* ===============Best selling sections =================== */}
      <section className="mt-10  px-10">
        <div className=" text-center font-[inter]  pt-5">
          <h2 className="text-3xl mb-2 text-cyan-500">
            -- <FaBook className="inline" /> Best Selling Books{" "}
            <FaBook className="inline" /> --{" "}
          </h2>
          <p className="max-w-3/6 mx-auto font-[inter] pb-5">
            {" "}
            Discover a curated selection of our top-rated books! Whether you're
            into programming, self-development, or fiction, find the perfect
            read for your journey.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-4 my-2">
          <div className="card w-75 shadow-sm ">
            <figure className="px-5 pt-5">
              <img
                src="https://i.ibb.co.com/xScMg0jC/DALL-E-2025-02-16-00-51-24-A-high-quality-programming-book-with-a-visually-appealing-and-modern-fron.webp"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center font-[inter]">
              <h2 className="card-title">How to Learn Programming</h2>
              <h4 className="text-xl text-cyan-500">Self-Development</h4>
              <p>
                Start your coding journey by learning the fundamentals of
                programming. Practice consistently, build real-world projects,
                and engage.
              </p>
            </div>
          </div>
          <div className="card w-75 shadow-sm">
            <figure className="px-5 pt-5">
              <img
                src="https://i.ibb.co.com/8nn4P2XQ/DALL-E-2025-02-12-01-29-28-A-small-sized-realistic-and-visually-distinct-book-cover-titled-Dark-Psyc.webp"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center font-[inter]">
              <h2 className="card-title">Dark Psychology Secrets</h2>
              <h4 className="text-xl text-cyan-500">Self-Development</h4>
              <p>
                Unlock the hidden tactics of persuasion, manipulation, and
                influence. Understand human behavior and
              </p>
            </div>
          </div>
          <div className="card w-75 shadow-sm">
            <figure className="px-5 pt-5">
              <img
                src="https://i.ibb.co.com/VcKNJg9d/DALL-E-2025-02-16-00-52-37-A-high-quality-programming-book-with-a-visually-appealing-front-cover-The.webp"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center font-[inter]">
              <h2 className="card-title">Mastering as Programmer</h2>
              <h4 className="text-xl text-cyan-500">Self-Development</h4>
              <p>
                Enhance your coding skills with advanced techniques, best
                practices, and real-world projects.
              </p>
            </div>
          </div>
          <div className="card w-75 shadow-sm">
            <figure className="px-5 pt-5">
              <img
                src="https://i.ibb.co.com/QvhWrqXc/DALL-E-2025-02-12-01-32-21-A-small-sized-visually-distinct-book-cover-titled-Mind-Games-The-Science.webp"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center font-[inter]">
              <h2 className="card-title ">How to Improove mine</h2>
              <h4 className="text-xl text-cyan-500">Self-Development</h4>
              <p>
                Enhance your coding skills with advanced techniques, best
                practices, and real-world projects.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ==================Books Section==================== */}
      <section>
        <Books></Books>
      </section>
      {/* ==================Featured Section==================== */}
      <FeatureSection></FeatureSection>
    </div>
  );
};

export default Home;
