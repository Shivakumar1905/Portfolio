export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Your Name
        </h1>
        <p className="text-lg text-gray-500 mb-6">
          Your Tagline Goes Here
        </p>
        <div className="space-x-4">
          <button className="px-6 py-2 bg-gray-900 text-white rounded-lg">
            View Work
          </button>
          <button className="px-6 py-2 border rounded-lg">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}