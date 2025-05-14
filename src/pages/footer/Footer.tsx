import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-base-300 dark:bg-black">
      <hr className="container mx-auto " />
      <footer className=" footer container mx-auto px-4  sm:footer-horizontal text-base-content py-10 text-center sm:text-left">
        <nav>
          <h6 className="footer-title dark:text-gray-300">Services</h6>
          <a
            href="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/"
            className="link link-hover dark:text-gray-300"
          >
            Book Recommendation
          </a>
          <a
            href="https://demo2.wpthemego.com/themes/sw_topdeal/"
            className="link link-hover dark:text-gray-300"
          >
            E-Book Store
          </a>
          <a
            href="https://demo2.wpthemego.com/themes/sw_topdeal/"
            className="link link-hover dark:text-gray-300"
          >
            Gift Cards
          </a>
          <a
            href="https://demo2.wpthemego.com/themes/sw_topdeal/"
            className="link link-hover dark:text-gray-300"
          >
            Membership Plan
          </a>
        </nav>

        <nav>
          <h6 className="footer-title dark:text-gray-300">Company</h6>
          <a href="/about" className="link link-hover dark:text-gray-300">
            About
          </a>
          <a href="/contact" className="link link-hover dark:text-gray-300">
            Contact
          </a>
          <a href="/blog" className="link link-hover dark:text-gray-300">
            Blog
          </a>
        </nav>

        <nav>
          <h6 className="footer-title dark:text-gray-300">Social</h6>
          <div className="grid grid-flow-col gap-4 justify-center sm:justify-start">
            <a
              href="https://www.linkedin.com/in/md-shariful-/"
              className="dark:text-gray-300"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="https://www.facebook.com/sharifulislam.367281"
              className="dark:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
