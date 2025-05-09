import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-base-300">
      <footer className="footer container mx-auto sm:footer-horizontal  text-base-content py-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a
            href="https://demo2.wpthemego.com/themes/sw_topdeal/layout3/"
            className="link link-hover"
          >
            Book Recomandation
          </a>
          <a
            href="https://demo2.wpthemego.com/themes/sw_topdeal/"
            className="link link-hover"
          >
            E-Book Store
          </a>
          <a
            href="https://demo2.wpthemego.com/themes/sw_topdeal/"
            className="link link-hover"
          >
            Gift Cards
          </a>
          <a
            href="https://demo2.wpthemego.com/themes/sw_topdeal/"
            className="link link-hover"
          >
            MemberShip Plan
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a href="/about" className="link link-hover">
            About
          </a>
          <a href="/contact" className="link link-hover">
            Contact
          </a>
          <a href="/blog" className="link link-hover">
            Blog
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.linkedin.com/in/md-shariful-/">
              <FaLinkedin className="text-2xl" />
            </a>

            <a href="https://www.facebook.com/sharifulislam.367281">
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
