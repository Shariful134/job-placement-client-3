import { FaBook } from "react-icons/fa";
import bannerImg from "../../assets/image/caroselImg-1.png";
import Books from "@/components/books/Books";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="pt-16 bg-[#fafafa]">
      <div className="relative ">
        <img className=" h-96 w-full  " src={bannerImg} alt="" />
        <div className="max-w-93 absolute top-20 left-8 bg-red-100/45 font-[inter] p-4 rounded-lg">
          <h2 className="text-3xl mb-2 font-bold">Your Best Companion</h2>
          <p>
            Discover a vast collection of books from every genre. Whether you
            love fiction,
          </p>
          <button className="btn border-1 font-[inter] rounded-md border-gray-600 bg-gay-100 hover:bg-gray-200 sm:btn-sm md:btn-md mt-2 bg ">
            Buy Now
          </button>
        </div>
      </div>
      {/* ===============Best selling  sections =================== */}
      <section className="mt-8 px-10">
        <div className=" text-center font-[inter]">
          <h2 className="text-3xl mb-2 text-cyan-500">
            -- <FaBook className="inline" /> Best Selling Books{" "}
            <FaBook className="inline" /> --{" "}
          </h2>
          <p className="max-w-3/6 mx-auto font-[inter]">
            {" "}
            Discover a curated selection of our top-rated books! Whether you're
            into programming, self-development, or fiction, find the perfect
            read for your journey.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-4 my-2">
          <div className="card  w-75 shadow-2xl ">
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
          <div className="card  w-75 shadow-2xl  ">
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
          <div className="card  w-75 shadow-2xl">
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
          <div className="card  w-75 shadow-2xl">
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
    </div>
  );
};

export default Home;
