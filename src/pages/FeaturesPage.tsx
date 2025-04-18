import { Brain, LineChart, MessageSquare, Star, Target, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FeaturesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  // Set visibility after component mounts for animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-indigo-600" />,
      title: "AI-Powered Mock Interviews",
      description: "Experience realistic interviews with our advanced AI that adapts to your responses and industry",
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-600" />,
      title: "Persona Feedback",
      description: "Get detailed insights on your confidence, clarity, and first impression from our AI analysis",
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-indigo-600" />,
      title: "HR Interview Question Bank",
      description: "Access thousands of company-specific questions and recommended answers",
    },
    {
      icon: <LineChart className="w-12 h-12 text-indigo-600" />,
      title: "Progress Tracker",
      description: "Monitor your improvement over time with detailed analytics and performance metrics",
    },
    {
      icon: <Target className="w-12 h-12 text-indigo-600" />,
      title: "Weekly Growth Challenges",
      description: "Stay motivated with personalized challenges designed to improve specific aspects of your interview skills",
    },
    {
      icon: <Star className="w-12 h-12 text-indigo-600" />,
      title: "Expert Tips & Resources",
      description: "Access curated content from HR professionals and industry experts",
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Animation */}
      <div className={`bg-indigo-50 py-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4 transition-all duration-700 delay-300 ease-out transform 
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}">
            Powerful Features to Transform Your Interview Skills
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-500 ease-out 
                       ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}">
            Our comprehensive suite of tools and features is designed to give you the edge in your next HR interview.
          </p>
        </div>
      </div>

      {/* Features Grid with Animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-out 
                        hover:shadow-xl hover:scale-105 hover:bg-indigo-50 cursor-pointer
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="mb-4 transition-transform duration-500 ease-out transform 
                            hover:scale-110 hover:rotate-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 
                            ease-out text-gray-800 hover:text-indigo-700">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
              
              {/* Animated underline effect */}
              <div className={`h-0.5 bg-indigo-500 mt-4 transition-all duration-300 ease-out 
                              ${activeFeature === index ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Demo Section with Animation */}
      <div className={`bg-gray-50 py-20 transition-all duration-1000 ease-out 
                    ${isVisible ? 'opacity-100' : 'opacity-0'}`}
           style={{ transitionDelay: '600ms' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 transition-all duration-700 ease-out transform 
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
              See Our Features in Action
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-300 ease-out 
                       ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}">
              Watch how our AI-powered platform helps candidates improve their interview performance
            </p>
          </div>
          
          {/* Demo video with pulse animation */}
          <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-lg">
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center 
                          relative transform transition hover:scale-[1.01] duration-500 ease-out 
                          cursor-pointer group">
              <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="absolute w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center opacity-80 
                            group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
              <p className="text-gray-600 absolute bottom-4 text-lg font-medium transition-all duration-300 transform 
                          group-hover:translate-y-0 group-hover:opacity-100 opacity-70">
                Feature Demo Video
              </p>
              
              {/* Pulse animation */}
              <div className="absolute w-20 h-20 bg-indigo-600 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}