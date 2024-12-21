const NavBar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-lg font-bold">MyApp</a>
        <ul className="hidden md:flex space-x-6">
          <li><a href="#home" className="hover:text-gray-300">Home</a></li>
          <li><a href="#features" className="hover:text-gray-300">Features</a></li>
          <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
        </ul>
        <button className="md:hidden text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
