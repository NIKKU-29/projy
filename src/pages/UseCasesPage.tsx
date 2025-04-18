import { Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function UseCasesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const personas = [
    {
      title: "Fresh Graduates",
      description: "Perfect for campus placement preparation",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1470",
      quote: "The mock interviews helped me understand what recruiters are really looking for. I landed my dream job at a top tech company!",
      author: "Sarah Chen, Computer Science Graduate"
    },
    {
      title: "Career Switchers",
      description: "Tailored practice for industry transition",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1470",
      quote: "I was nervous about switching from finance to tech, but the Persona Mirror showed me exactly what I needed to improve.",
      author: "Michael Roberts, Former Financial Analyst"
    },
    {
      title: "Tier-2/3 College Students",
      description: "Bridging the guidance gap",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1471",
      quote: "Without campus recruiters visiting our college, InterviewAI was my mentor. It helped me compete with top college graduates.",
      author: "Priya Patel, Engineering Student"
    }
  ];

  const stats = [
    { value: 90, label: "Success Rate", symbol: "%" },
    { value: 50000, label: "Users Trained", symbol: "+" },
    { value: 1000, label: "Companies Covered", symbol: "+" }
  ];

  const AnimatedCounter = ({ value, duration = 2000, symbol }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let start = 0;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [isVisible, value, duration]);

    return (
      <div className="text-4xl font-bold mb-2">
        {value > 1000 ? count.toLocaleString() : count}{symbol}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className={`bg-indigo-50 py-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`text-4xl font-bold text-center text-gray-900 mb-4 transition-all duration-700 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Success Stories from Real Users
          </h1>
          <p className={`text-xl text-center text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            See how InterviewAI helps different candidates achieve their career goals
          </p>
        </div>
      </div>

      {/* Personas Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 ease-out transform hover:shadow-xl cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={persona.image}
                  alt={persona.title}
                  className={`w-full h-48 object-cover transition-transform duration-700 ease-out ${activeCard === index ? 'scale-110' : 'scale-100'}`}
                />
                <div className={`absolute inset-0 bg-indigo-600 transition-opacity duration-500 ${activeCard === index ? 'opacity-10' : 'opacity-0'}`}></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 ease-out hover:text-indigo-600">{persona.title}</h3>
                <p className="text-gray-600 mb-4">{persona.description}</p>

                <div className={`bg-gray-50 p-4 rounded-lg transition-all duration-500 ease-out ${activeCard === index ? 'transform translate-y-0 shadow-md' : 'transform translate-y-2'}`}>
                  <Quote className={`w-8 h-8 text-indigo-600 mb-2 transition-transform duration-500 ${activeCard === index ? 'rotate-12' : 'rotate-0'}`} />
                  <p className="text-gray-700 italic mb-2">{persona.quote}</p>
                  <p className="text-sm text-gray-600">- {persona.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className={`bg-indigo-600 py-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className={`text-white transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${1000 + index * 200}ms` }}>
                <AnimatedCounter value={stat.value} symbol={stat.symbol} />
                <div className="text-indigo-100 relative">
                  {stat.label}
                  <div className={`h-0.5 bg-indigo-100 mt-1 mx-auto transition-all duration-500 ease-out ${isVisible ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} style={{ transitionDelay: `${1400 + index * 200}ms` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center py-16 bg-white">
        <button className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1600ms' }}>
          Start Your Practice Today
          <span className="ml-2 inline-block transition-transform duration-300 transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}
