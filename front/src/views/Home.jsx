const Home = () => {
  return (
    <div id="home" className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MyApp</h1>
        <p className="text-lg mb-6">Manage your appointments with ease.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
