export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 text-center">
      <h2 className="text-3xl font-semibold mb-6">Contact</h2>

      <form className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-lg"
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-3 border rounded-lg"
        />
        <button className="w-full bg-gray-900 text-white py-3 rounded-lg">
          Send Message
        </button>
      </form>
    </section>
  );
}