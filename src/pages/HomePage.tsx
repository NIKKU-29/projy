import { ArrowRight, Brain, LineChart, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function HomePage() {
  // State for testimonial slider
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    howItWorks: false,
    features: false,
    testimonials: false,
    cta: false
  });

  // Testimonial data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at Tech Co",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=2080",
      quote: "InterviewAI helped me prepare for my dream job. The feedback on my communication style was invaluable!"
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=2080",
      quote: "After just three practice sessions, I felt so much more confident. I aced my interview and got the job!"
    },
    {
      name: "Priya Patel",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=2080",
      quote: "The persona mirror feature showed me exactly how I was coming across. Game changer for executive interviews."
    }
  ];

  // Animation observer setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.25,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, observerOptions);

    // Elements to observe
    const sections = ['hero', 'howItWorks', 'features', 'testimonials', 'cta'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Handle testimonial navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Animation */}
      <div id="hero" className={`pt-20 bg-gradient-to-b from-indigo-50 to-white transition-opacity duration-1000 ${isVisible.hero ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 transform transition-transform duration-700 ease-out">
              Ace Your Next HR Interview with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto transform transition-all duration-700 delay-300">
              Practice with AI-powered mock interviews and get real-time feedback on your persona. Perfect your interview skills with our cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 transform transition-all duration-700 delay-500">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                Try for Free
              </button>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                See Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section with Staggered Animation */}
      <div id="howItWorks" className={`py-20 bg-white transition-opacity duration-1000 ${isVisible.howItWorks ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 transition-transform duration-700">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className={`text-center p-6 shadow-lg rounded-xl bg-white transform transition-all duration-700 delay-100 ${isVisible.howItWorks ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-indigo-200 transition-all duration-300 hover:scale-110">
                <Video className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice</h3>
              <p className="text-gray-600">Engage in realistic HR interviews with our AI interviewer</p>
            </div>
            
            {/* Step 2 */}
            <div className={`text-center p-6 shadow-lg rounded-xl bg-white transform transition-all duration-700 delay-300 ${isVisible.howItWorks ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-indigo-200 transition-all duration-300 hover:scale-110">
                <Brain className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reflect</h3>
              <p className="text-gray-600">Get instant feedback on your persona and communication style</p>
            </div>
            
            {/* Step 3 */}
            <div className={`text-center p-6 shadow-lg rounded-xl bg-white transform transition-all duration-700 delay-500 ${isVisible.howItWorks ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-indigo-200 transition-all duration-300 hover:scale-110">
                <LineChart className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Improve</h3>
              <p className="text-gray-600">Track your progress and enhance your interview skills</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlight with Animation */}
      <div id="features" className={`py-20 bg-gray-50 transition-opacity duration-1000 ${isVisible.features ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-700 ${isVisible.features ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-3xl font-bold mb-6">Real-Time Persona Mirror</h2>
              <p className="text-gray-600 mb-8">
                See yourself through the interviewer's eyes. Our AI analyzes your facial expressions, tone of voice, and body language to provide instant feedback on how you're perceived.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center transform transition hover:translate-x-2 duration-300">
                  <ArrowRight className="w-5 h-5 text-indigo-600 mr-2" />
                  <span>Confidence Analysis</span>
                </li>
                <li className="flex items-center transform transition hover:translate-x-2 duration-300">
                  <ArrowRight className="w-5 h-5 text-indigo-600 mr-2" />
                  <span>Communication Clarity Score</span>
                </li>
                <li className="flex items-center transform transition hover:translate-x-2 duration-300">
                  <ArrowRight className="w-5 h-5 text-indigo-600 mr-2" />
                  <span>Professional Presence Rating</span>
                </li>
              </ul>
            </div>
            <div className={`relative transform transition-all duration-700 ${isVisible.features ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=2080"
                alt="Professional using InterviewAI"
                className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg animate-pulse">
                <div className="text-sm font-semibold text-gray-900">Confidence Score</div>
                <div className="text-2xl font-bold text-indigo-600">85%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Slider Section */}
      <div id="testimonials" className={`py-20 bg-white transition-opacity duration-1000 ${isVisible.testimonials ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="relative overflow-hidden">
            {/* Testimonial Slider Container */}
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Slider Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {/* Dots indicator */}
              <div className="flex items-center space-x-2 mx-4">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                      currentTestimonial === index ? 'bg-indigo-600 w-6' : 'bg-indigo-200'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner with Animation */}
      <div id="cta" className={`bg-indigo-600 py-16 transition-opacity duration-1000 ${isVisible.cta ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold text-white mb-4 transform transition-all duration-700 ${isVisible.cta ? 'scale-100' : 'scale-95'}`}>
            Ready to Transform Your Interview Skills?
          </h2>
          <p className={`text-indigo-100 mb-8 max-w-2xl mx-auto transform transition-all duration-700 delay-200 ${isVisible.cta ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            Join thousands of successful candidates who landed their dream jobs with InterviewAI
          </p>
          <Link
            to="/features"
            className={`inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-all duration-300 hover:scale-105 transform ${isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}