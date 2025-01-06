const Footer = () => {
  return (
    <footer className="bg-quinary text-gray-300 py-9">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; 2025 <span className="text-secondary">Hair Luxe</span>. All
          rights reserved.
        </p>
        <ul className="flex justify-center space-x-6 mt-2">
          <li>
            <a href="https://facebook.com" className="hover:text-white">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://twitter.com" className="hover:text-white">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://instagram.com" className="hover:text-white">
              Instagram
            </a>
          </li>
        </ul>
        <p className="text-xs mt-4">
          Developed with 💟{" "}
          <a
            href="https://github.com/patorodriguez12"
            className="hover:text-white text-tertiary"
          >
            Hugo Patricio Rodriguez
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
