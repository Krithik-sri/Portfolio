// src/components/Timeline.jsx
import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Cybersecurity Intern",
    company: "Valeo",
    date: "July - August 2024",
    description:
      "Assisted the SOC team with maintaining and managing Information Security and assited with communications and managing issues with Jira Ticketing Tool.",
  },
];

const Timeline = () => {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-8 text-gradient">Experience</h2>
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 glow cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-extrabold tracking-wide">{experience.title} 🚀</h3>
              <p className="text-gray-400 font-semibold italic">{experience.company}</p>
              <p className="text-gray-300 mb-4 font-mono font-bold">{experience.date}</p>
              <p className="text-gray-200 font-mono font-bold">{experience.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;