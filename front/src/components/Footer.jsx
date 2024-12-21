const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2024 MyApp. All rights reserved.</p>
        <ul className="flex justify-center space-x-6 mt-2">
          <li><a href="https://facebook.com" className="hover:text-white">Facebook</a></li>
          <li><a href="https://twitter.com" className="hover:text-white">Twitter</a></li>
          <li><a href="https://instagram.com" className="hover:text-white">Instagram</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
