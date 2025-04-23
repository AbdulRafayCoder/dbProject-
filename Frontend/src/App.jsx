import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const bgShapes = [
  { top: '5%', left: '10%', size: 'w-40 h-40', color: 'bg-gradient-to-br from-blue-400 to-purple-300', delay: 0 },
  { top: '70%', left: '80%', size: 'w-32 h-32', color: 'bg-gradient-to-br from-pink-400 to-yellow-200', delay: 0.2 },
  { top: '60%', left: '20%', size: 'w-24 h-24', color: 'bg-gradient-to-br from-green-300 to-teal-200', delay: 0.4 },
  { top: '20%', left: '75%', size: 'w-28 h-28', color: 'bg-gradient-to-br from-sky-300 to-blue-200', delay: 0.6 },
];

const features = [
  {
    title: "Vite",
    desc: "Lightning-fast build tool and dev server.",
    icon: (
      <svg className="w-10 h-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 2L2 22h20L12 2z" strokeWidth={2} />
      </svg>
    ),
    color: "from-yellow-400 to-orange-400"
  },
  {
    title: "React",
    desc: "Component-based UI library for building interfaces.",
    icon: (
      <svg className="w-10 h-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <ellipse cx="12" cy="12" rx="10" ry="4" strokeWidth={2} />
        <ellipse cx="12" cy="12" rx="4" ry="10" strokeWidth={2} />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    color: "from-sky-400 to-blue-500"
  },
  {
    title: "TailwindCSS + Framer Motion",
    desc: "Utility-first CSS meets powerful animation.",
    icon: (
      <svg className="w-10 h-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M3 15a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3z" strokeWidth={2} />
        <path d="M17 3a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h3z" strokeWidth={2} />
      </svg>
    ),
    color: "from-teal-400 to-pink-400"
  }
];

const typewriterWords = [
  "Supercharged Development.",
  "Modern UI/UX.",
  "Effortless Animations.",
  "Rapid Prototyping.",
];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === typewriterWords[index].length) {
      const timeout = setTimeout(() => setIndex((i) => (i + 1) % typewriterWords.length), 1200);
      return () => clearTimeout(timeout);
    }
    if (subIndex < typewriterWords[index].length) {
      const timeout = setTimeout(() => setSubIndex((s) => s + 1), 60);
      return () => clearTimeout(timeout);
    }
    setSubIndex(0);
  }, [subIndex, index]);

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((b) => !b), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  useEffect(() => {
    setSubIndex(0);
  }, [index]);

  return (
    <span className="text-xl md:text-2xl font-mono text-gray-700">
      {typewriterWords[index].substring(0, subIndex)}
      <span className={`border-r-2 border-gray-700 ml-1 ${blink ? '' : 'opacity-0'}`}></span>
    </span>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 overflow-hidden flex flex-col">
      {/* Animated background shapes */}
      {bgShapes.map((shape, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${shape.top} ${shape.left} ${shape.size} ${shape.color} rounded-full opacity-40 blur-2xl pointer-events-none`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4], rotate: [0, 360, 0] }}
          transition={{ duration: 8, delay: shape.delay, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center flex-1 pt-24 pb-12">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-400 to-pink-500 mb-4 drop-shadow-lg text-center"
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          Welcome to the Future
        </motion.h1>
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Typewriter />
        </motion.div>
        <motion.div
          className="flex flex-col md:flex-row gap-6 mb-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              className={`flex flex-col items-center bg-white/80 rounded-xl shadow-xl px-8 py-6 w-72 backdrop-blur-md border border-white/40`}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ type: "spring", duration: 0.7, delay: 0.2 * idx }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
            >
              <div className={`mb-3 p-3 rounded-full bg-gradient-to-br ${feature.color} shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-pink-400 text-white font-bold text-lg shadow-xl overflow-hidden"
          whileHover={{
            scale: 1.08,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            background: "linear-gradient(90deg,#3b82f6,#ec4899)"
          }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
          />
          <span className="relative z-10">Get Started Now</span>
        </motion.a>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex justify-center items-center py-6 bg-transparent">
        <div className="flex gap-6">
          <motion.a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="text-gray-700 hover:text-black transition"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
            </svg>
          </motion.a>
          <motion.a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -10 }}
            className="text-sky-500 hover:text-sky-700 transition"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.56c-.89.39-1.85.65-2.86.77a4.93 4.93 0 0 0 2.16-2.72c-.95.56-2 .97-3.13 1.19A4.92 4.92 0 0 0 16.67 3c-2.73 0-4.94 2.21-4.94 4.93 0 .39.04.77.12 1.13C7.69 8.85 4.07 6.87 1.64 3.9c-.43.74-.67 1.6-.67 2.52 0 1.74.89 3.28 2.25 4.18-.83-.03-1.61-.25-2.3-.63v.06c0 2.43 1.73 4.46 4.02 4.92-.42.12-.87.18-1.33.18-.32 0-.63-.03-.93-.09.63 1.97 2.45 3.4 4.6 3.44A9.87 9.87 0 0 1 0 21.54a13.94 13.94 0 0 0 7.56 2.22c9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63A10.06 10.06 0 0 0 24 4.56z"/>
            </svg>
          </motion.a>
        </div>
      </footer>
    </div>
  );
}

export default App;
