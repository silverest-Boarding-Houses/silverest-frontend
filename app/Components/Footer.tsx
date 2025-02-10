import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="bg-green-700 py-16 text-white">
      <div className="container mx-auto max-w-[1170px]">
        <div className="flex flex-wrap">
          {/* Company Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h4 className="text-lg font-medium capitalize mb-8 relative">
              Silverhouse Boarding Houses
              <span className="absolute left-0 bottom-[-10px] w-12 h-[2px] bg-white"></span>
            </h4>
            <ul>
              <li className="mb-2"><a href="About" className="hover:text-gray-300 transition-all duration-300 ease-in-out block">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-300 transition-all duration-300 ease-in-out block">Our Mission</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-300 transition-all duration-300 ease-in-out block">Careers</a></li>
              <li className="mb-2"><a href="Contact" className="hover:text-gray-300 transition-all duration-300 ease-in-out block">Contact Us</a></li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h4 className="text-lg font-medium capitalize mb-8 relative">
              What you can do here
              <span className="absolute left-0 bottom-[-10px] w-12 h-[2px] bg-white"></span>
            </h4>
            <ul>
              <li className="mb-2"><a href="/Explore" className="hover:text-gray-300 transition-all duration-300 ease-in-out block">Explore Houses</a></li>
              <li className="mb-2"><a href="/Explore" className="hover:text-gray-300 transition-all duration-300 ease-in-out block">Book Houses</a></li>
              <li className="mb-2"><a href="/Terms" className="hover:text-gray-300 transition-all duration-300 ease-in-out block">Terms and conditions</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h4 className="text-lg font-medium capitalize mb-8 relative">
              Become our Agent
              <span className="absolute left-0 bottom-[-10px] w-12 h-[2px] bg-white"></span>
            </h4>
            <ul>
              <li className="mb-2"><a href="/Apply" className="hover:text-gray-300 transition-all duration-300 ease-in-out block">Apply Now</a></li>
              <li className="mb-2"><a href="/AgentTerms" className="hover:text-gray-300 transition-all duration-300 ease-in-out block">Terms and conditions</a></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h4 className="text-lg font-medium capitalize mb-8 relative">
              Follow Us
              <span className="absolute left-0 bottom-[-10px] w-12 h-[2px] bg-white"></span>
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center bg-white bg-opacity-20 rounded-full hover:bg-white hover:text-green-700 transition-all duration-500 ease-in-out">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center bg-white bg-opacity-20 rounded-full hover:bg-white hover:text-green-700 transition-all duration-500 ease-in-out">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center bg-white bg-opacity-20 rounded-full hover:bg-white hover:text-green-700 transition-all duration-500 ease-in-out">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center bg-white bg-opacity-20 rounded-full hover:bg-white hover:text-green-700 transition-all duration-500 ease-in-out">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 text-center text-sm text-gray-300">
          <p>&#169; {currentYear} Silverhouse Boarding Houses. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
