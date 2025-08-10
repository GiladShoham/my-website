import React from 'react';
import Slider from 'react-slick';
import {
  Code, DollarSign, Mic, Users, Home, PenTool, MessageSquare, ChevronLeft, ChevronRight
} from 'lucide-react';
import { cardClasses } from './common/CardStyles';
import { formClasses } from './common/FormStyles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AboutMe: React.FC = () => {
  const sliderRef = React.useRef<Slider>(null);

  const sections = [
    {
      title: 'Dev and Open Source Leader',
      icon: <Code className="w-6 h-6 mr-2" />,
      content: "With 15+ years in leadership, I lead a global team of OSS developers at Bit.dev, focusing on Bit's CLI. I'm passionate about open source, contributing to projects like pnpm, rspack, oxc, oxlint-node, and GraphQL tools—building solutions that empower developers worldwide.",
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Community Leader',
      icon: <Users className="w-6 h-6 mr-2" />,
      content: "I lead two active and fast-growing communities: MCP Israel and n8n Israel. These communities bring together developers, enthusiasts, and professionals to share knowledge, collaborate on projects, and drive innovation in their respective domains. Building and nurturing these communities allows me to foster learning and growth while connecting like-minded individuals.",
      image: 'https://res.cloudinary.com/dzc7cp7jh/image/upload/f_auto,q_auto/v1754834694/combined-logos_taaqne.png',
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
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className={`${formClasses.formTitle} text-center mb-12`}>About Me</h2>
      
      {/* Bio Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur opacity-25"></div>
            <img
              src="https://res.cloudinary.com/dzc7cp7jh/image/upload/t_Profile/v1728585776/Profile_Picture_Gilad_ubruik.png"
              alt="Gilad Shoham"
              className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800"
            />
          </div>
        </div>
        
        {/* Bio Text */}
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4 text-lg">
            I believe that software development is a tool to improve human life. I find software to be the most powerful way to share value in order to connect people and improve the quality of all our lives.
          </p>
          
          <p className="mb-4 text-lg">
            Software engineering for me is like painting or sculpting, it's a way to take a complicated and beautiful structure lay, connect all the dots piece by piece, and create a masterpiece. It's more than just art, it's life.
          </p>
          
          <p className="mb-4 text-lg">
            That's why I wake up with a smile and keep it on all day long. I am lucky to be paid for doing what I love the most. That's what makes me a great engineer. I'm not smarter than others, I just really care. I love what I do and do what I love, so I don't play the nine-to-five game, I live it 24/7.
          </p>

          <p className="text-lg">
            This rush makes me develop community projects like Stunity and learn new paradigms and tools with the passion of a child getting a new toy running around and having fun without the need for any additional incentive. I share my beliefs with others to inspire them, and some follow. I also learn from others. That's what makes me a true leader.
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative mt-20">
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
                    <div className="flex flex-col gap-4 h-[500px] md:justify-center">
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
    </section>
  );
};

export default AboutMe;
