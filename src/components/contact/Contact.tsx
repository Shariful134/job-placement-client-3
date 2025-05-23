import photo from "../../assets/image/ContactImg.png";

import { FaLocationDot } from "react-icons/fa6";
import { FaClock, FaGreaterThan, FaPhone } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const ContactComponents = () => {
  return (
    <div className="container mx-auto pb-5 mb-10 mt-5">
      <div className="relative ">
        <img src={photo} width={1900} height={600} alt="BannerImg"></img>
        <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <h2 className=" text-xs md:text-xl lg:text-5xl">Contact</h2>
          <div className="flex items-center text-xs md:text-sm gap-1">
            <Link className="hover:underline hover:text-fuchsia-700 " to={"/"}>
              Home
            </Link>
            <FaGreaterThan className=" text-rose-500" />
            <Link
              className="hover:underline hover:text-fuchsia-700 "
              to={"/contact"}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center justify-center">
        <h2 className="text-xl md:text-2xl lg:text-4xl text-center md:text-start max-w-[344px] font-semibold dark:text-gray-300">
          Get In Touch
        </h2>
        <p className="text-sm md:text-sm lg:text-lg mt-4 max-w-[644px] text-center dark:text-gray-300">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>
      </div>
      <div className="mt-10 md:mt-20 grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-10">
          <div>
            <div className="flex items-center dark:text-gray-300">
              <FaLocationDot />

              <h2 className="text-sm sm:text-md md:text-xl text-center md:text-start font-semibold dark:text-gray-300">
                Address
              </h2>
            </div>
            <p className="text-sm md:text-sm lg:text-lg ps-5 dark:text-gray-300">
              236 5th SE Avenue, New York NY10000, United States
            </p>
          </div>
          <div>
            <div className="flex gap-1 items-center dark:text-gray-300">
              <FaClock />

              <h2 className="text-sm sm:text-md md:text-xl text-center md:text-start font-semibold ">
                Working Time
              </h2>
            </div>
            <p className="text-sm md:text-sm lg:text-lg ps-5 dark:text-gray-300">
              Monday-Friday: 9:00 - 22:00 Saturday-Sunday: 9:00 - 21:00
            </p>
          </div>
          <div>
            <div className="flex gap-1 items-center dark:text-gray-300">
              <FaPhone />

              <h2 className="text-sm sm:text-md md:text-xl text-center md:text-start font-semibold ">
                Phone
              </h2>
            </div>
            <p className="text-sm md:text-sm lg:text-lg ps-5 dark:text-gray-300">
              Mobile: +(84) 546-6789 Hotline: +(84) 456-6789
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm md:text-sm lg:text-lg dark:text-gray-300">
              Your Name
            </p>
            <Input
              type="text"
              placeholder="name"
              className="border-1 border-gray-400 max-w-[528px] dark:text-gray-300"
            />
          </div>
          <div>
            <p className="text-sm md:text-sm lg:text-lg dark:text-gray-300">
              Email
            </p>
            <Input
              type="text"
              placeholder="Email"
              className="border-1 border-gray-400 max-w-[528px] dark:text-gray-300"
            />
          </div>
          <div>
            <p className="text-sm md:text-sm lg:text-lg dark:text-gray-300">
              Subject
            </p>
            <Input
              type="text"
              placeholder="subject"
              className="border-1 border-gray-400 max-w-[528px] dark:text-gray-300"
            />
          </div>
          <div>
            <p className="text-sm md:text-sm lg:text-lg dark:text-gray-300">
              Message
            </p>

            <Textarea
              placeholder="message"
              className="border-1 border-gray-400 max-w-[528px] dark:text-gray-300"
            />
          </div>
          <div>
            <Button className="px-4 py-1.5 text-sm rounded-md font-medium border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponents;
