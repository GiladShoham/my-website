import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import {
  Code, DollarSign, Mic, Users, Home, PenTool, MessageSquare, ChevronLeft, ChevronRight, ArrowRight
} from 'lucide-react';
import { cardClasses } from './common/CardStyles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Section {
  title: string;
  icon: React.ReactNode;
  content: string;
  image: string;
  link?: { to: string; label: string };
}

const AboutMe: React.FC = () => {
  const sliderRef = React.useRef<Slider>(null);

  const sections: Section[] = [
    {
      title: 'Dev and Open Source Leader',
      icon: <Code className="w-6 h-6 mr-2" />,
      content: "With 15+ years in leadership, I lead a global team of OSS developers at Bit.dev, focusing on Bit's CLI. I'm passionate about open source, contributing to projects like pnpm, rspack, oxc, oxlint-node, and GraphQL tools—building solutions that empower developers worldwide.",
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Community Leader',
      icon: <Users className="w-6 h-6 mr-2" />,
      content: "I build and lead several active and fast-growing communities, including MCP Israel, n8n Israel, the AI Transformation Guild & AI Leaders, and The Agentcy. These communities bring together developers, enthusiasts, and professionals to share knowledge, collaborate on projects, and drive innovation in AI and automation. Building and nurturing these communities allows me to foster learning and growth while connecting like-minded individuals.",
      image: 'https://res.cloudinary.com/dzc7cp7jh/image/upload/f_auto,q_auto/v1754834694/combined-logos_taaqne.png',
      link: { to: '/communities', label: 'Explore my communities' },
    },
    {
      title: 'Angel Investor',
      icon: <DollarSign className="w-6 h-6 mr-2" />,
      content: "I love connecting with entrepreneurs and helping them thrive. As an angel investor, I sometimes invest alone and other times with a group. While I primarily invest in the dev tools space, I'm open to other verticals where I can add value and help startups achieve their goals.",
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Public Speaker',
      icon: <Mic className="w-6 h-6 mr-2" />,
      content: 'I love sharing my experience on stage, with years of speaking at events from local meetups to international conferences. My talks cover topics like web, dev tools, architecture, JS, development processes, smart homes, and more. I focus on deep technical dives and real innovation.',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Entrepreneur',
      icon: <PenTool className="w-6 h-6 mr-2" />,
      content: "I'm passionate about innovation and solving real-world problems. I founded a startup in the US real estate market as a business venture and have built social impact projects like Stunity voluntarily. These efforts are my way of contributing to the world and making a positive difference.",
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Mentor',
      icon: <Users className="w-6 h-6 mr-2" />,
      content: "I'm passionate about guiding the next generation of tech talent. I mentor junior developers, experienced professionals, and early-stage entrepreneurs. Most of my mentoring is done pro bono, helping others grow and succeed while giving back to the community.",
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Smart Home Expert',
      icon: <Home className="w-6 h-6 mr-2" />,
      content: "I'm a huge fan of smart homes, with hundreds of devices in my own setup. I share my knowledge through a podcast, blog, and YouTube channel (in Hebrew) and love helping others build their own smart homes—for free, simply out of passion for the field.",
      image: 'https://images.unsplash.com/photo-1702390796625-6dd9b46b1c0b?ixlib=rb-1.2.1&auto=format&fit=contain&w=500&q=60',
    },
    {
      title: 'Professional Debater',
      icon: <MessageSquare className="w-6 h-6 mr-2" />,
      content: "I'm a former professional debater and debate coach. This experience has shaped my approach to problem-solving and communication. I believe in the power of structured thinking and clear communication to drive understanding and progress.",
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <section className="relative">
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 -left-32 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 right-1/3 w-60 h-60 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12 lg:py-16 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Content Side */}
            <div className="space-y-6 text-center lg:text-left">
              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                    Gilad Shoham
                  </span>
                </h1>
                
                <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light">
                  Dev Leader & Open Source Enthusiast
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Building the future through code, community, and innovation. With 15+ years of leadership experience, I'm passionate about creating solutions that empower developers worldwide.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('about-details')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Learn More About Me
                </button>
                <button
                  onClick={() => window.open('https://www.linkedin.com/in/shohamgilad/', '_blank')}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-105 transition-all duration-200"
                >
                  Connect With Me
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Leading</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                </div>
                <Link to="/communities" className="text-center group cursor-pointer">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors inline-flex items-center gap-1">
                    Communities
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Floating elements around the image */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-20 animate-bounce delay-100"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full opacity-30 animate-bounce delay-300"></div>
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg opacity-25 animate-bounce delay-500"></div>
                
                {/* Main image container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-2 shadow-2xl">
                    <img
                      src="https://res.cloudinary.com/dzc7cp7jh/image/upload/f_auto,q_auto/v1754835143/AT_T_Leaders_in_Tech_May_2025_-_square_stnetd.png"
                      alt="Gilad Shoham"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Bio Section */}
      <div id="about-details" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
            My Story
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Philosophy</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I believe that software development is a tool to improve human life. I find software to be the most powerful way to share value in order to connect people and improve the quality of all our lives.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Passion</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Software engineering for me is like painting or sculpting, it's a way to take a complicated and beautiful structure, connect all the dots piece by piece, and create a masterpiece. It's more than just art, it's life.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Dedication</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                That's why I wake up with a smile and keep it on all day long. I am lucky to be paid for doing what I love the most. I'm not smarter than others, I just really care. I love what I do and do what I love, so I don't play the nine-to-five game, I live it 24/7.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Leadership</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                This rush makes me develop community projects like Stunity and learn new paradigms and tools with the passion of a child getting a new toy. I share my beliefs with others to inspire them, and some follow. I also learn from others. That's what makes me a true leader.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
            What I Do
          </h2>
        <Slider ref={sliderRef} {...settings}>
          {sections.map((section, index) => (
            <div key={index} className="px-4 pb-8">
              <div className={`${cardClasses.card} p-6 md:p-8`}>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Image Section */}
                  <div className="md:w-1/2">
                    <div className="relative h-48 md:h-[500px]">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25"></div>
                      <img
                        src={section.image}
                        alt={section.title}
                        className="relative w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="md:w-1/2">
                    <div className="flex flex-col gap-4 md:h-[500px] md:justify-center">
                      <div className="flex flex-col gap-3">
                        <span className="inline-flex w-fit p-2 md:p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                          {section.icon}
                        </span>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">
                          {section.title}
                        </h3>
                      </div>
                      <div>
                        <p className="text-sm md:text-base lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                          {section.content}
                        </p>
                        {section.link && (
                          <Link
                            to={section.link.to}
                            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg w-fit"
                          >
                            {section.link.label}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        
        {/* Custom styles for dots */}
        <style>{`
          .slick-dots {
            bottom: -25px !important;
          }
          .slick-dots li button:before {
            font-size: 8px;
          }
          /* slick's default ".slick-slide { height: 100% }" forces every slide
             to the container's fixed height, which clips taller slides (e.g. the
             Community Leader card with its button) on mobile. Let each slide size
             to its own content and use a flex track to avoid float misalignment;
             adaptiveHeight then fits the viewport to the active slide so the dots
             always sit right beneath it. */
          .slick-track {
            display: flex !important;
            align-items: flex-start !important;
          }
          .slick-slide {
            height: auto !important;
          }
          .slick-slide > div {
            height: auto !important;
          }
        `}</style>
        
        {/* Navigation buttons */}
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute top-1/2 -left-4 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute top-1/2 -right-4 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        </div>
      </div>

      {/* Communities CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-10 md:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative">
            <span className="inline-flex p-4 rounded-2xl bg-white/15 text-white mb-6">
              <Users className="w-8 h-8" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join My Communities
            </h2>
            <p className="text-lg text-blue-50 leading-relaxed max-w-2xl mx-auto mb-8">
              I build and lead several active AI and automation communities — MCP Israel, n8n Israel,
              the AI Transformation Guild &amp; AI Leaders, and The Agentcy. Discover what each one is
              about and how you can join.
            </p>
            <Link
              to="/communities"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Explore My Communities
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
