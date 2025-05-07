import { PhoneCall } from "lucide-react";

import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
const ContactComponents = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div>
          <h2 className="text-purple-400 pt-8 md:pt-15 pb-5  text-2xl md:text-5xl">
            Contact Me
          </h2>

          <h2 className="text-purple-400 pt-8 md:pt-15 pb-5 text-xl md:text-3xl">
            Md. Sharifl Islam
          </h2>
          <p className="text-lg text-gray-300 flex  mb-5 items-center max-w-2xl gap-5">
            <div>
              <span className="text-purple-400">
                {" "}
                <PhoneCall className="text-3xl" />
              </span>{" "}
            </div>
            <div className="text-base">+8801797579562, +8801762370111</div>
          </p>
          <p className="text-lg text-gray-300 flex mb-5 items-center max-w-2xl gap-5">
            <div>
              <span className="text-purple-400">
                {" "}
                <FaLinkedin className="text-3xl" />
              </span>{" "}
            </div>
            <div>
              <a
                className="hover:text-purple-300 text-base"
                href="https://www.linkedin.com/in/shariful-islam-316895264/"
              >
                https://www.linkedin.com/in/shariful-islam-316895264/
              </a>
            </div>
          </p>
          <p className="text-lg text-gray-300 flex mb-5 items-center max-w-2xl gap-5">
            <div>
              <span className="text-purple-400">
                {" "}
                <FaWhatsapp className="text-3xl" />
              </span>{" "}
            </div>
            <div>+8801762370111</div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactComponents;
