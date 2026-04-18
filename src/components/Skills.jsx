const skills = ["Skill 1", "Skill 2", "Skill 3", "Skill 4"];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <h2 className="text-3xl text-center font-semibold mb-10">
        Skills
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-gray-100 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}