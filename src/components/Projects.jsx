const projects = Array(3).fill({
  title: "Your Project Title",
  desc: "Describe your project here...",
});

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50 px-6">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Projects
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg mb-2">
              {p.title}
            </h3>
            <p className="text-gray-500 mb-4">{p.desc}</p>
            <button className="text-sm text-blue-600">
              View Details →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}