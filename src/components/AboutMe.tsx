import React from 'react';
import Slider from 'react-slick';
import { Code, DollarSign, Mic, Users, Home, PenTool, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AboutMe: React.FC = () => {
  const sliderRef = React.useRef<Slider>(null);

  const sections = [
    {
      title: 'Dev and Open Source Leader',
      icon: <Code className="w-6 h-6 mr-2" />,
      content: 'As a passionate advocate for open source, I\'ve contributed to and maintained several popular projects. My work has helped shape industry standards and fostered collaboration within the developer community.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: 'Angel Investor',
      icon: <DollarSign className="w-6 h-6 mr-2" />,
      content: 'With a keen eye for innovative startups, I\'ve invested in and mentored numerous tech ventures. My portfolio spans various sectors, from AI to sustainable technologies.',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: 'Public Speaker',
      icon: <Mic className="w-6 h-6 mr-2" />,
      content: 'I regularly share insights at tech conferences worldwide, engaging audiences with talks on emerging technologies, best practices, and the future of software development.',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: 'Mentor',
      icon: <Users className="w-6 h-6 mr-2" />,
      content: 'Guiding the next generation of tech talent is a passion of mine. I\'ve mentored dozens of aspiring developers, helping them navigate their careers and make impactful contributions to the field.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: 'Smart Home Expert',
      icon: <Home className="w-6 h-6 mr-2" />,
      content: 'As an early adopter and innovator in smart home technology, I\'ve developed custom solutions and integrated various platforms to create seamless, intelligent living spaces.',
      image: 'https://images.unsplash.com/photo-1558002038-bb4237b54ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: 'Blogger',
      icon: <PenTool className="w-6 h-6 mr-2" />,
      content: 'Through my blog, I share in-depth technical articles, industry insights, and personal experiences, reaching a global audience of developers and tech enthusiasts.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: 'Professional Debater',
      icon: <MessageSquare className="w-6 h-6 mr-2" />,
      content: 'My background in professional debate has honed my critical thinking and communication skills, allowing me to approach complex tech problems from multiple angles and articulate solutions effectively.',
      image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <section id="about" className="mb-12">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <div className="flex flex-col md:flex-row items-start mb-8">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          alt="Gilad Shoham"
          className="w-64 h-64 rounded-full object-cover mb-4 md:mr-8"
        />
        <div>
          <p className="mb-4">
            Hello! I'm [Your Name], a multifaceted technology professional with a passion for innovation and knowledge sharing.
            With over [X] years of experience in the tech industry, I've worn many hats and contributed to various aspects of the field.
          </p>
          <p>
            My journey in technology has led me to explore diverse roles and interests, from software development to investment and public speaking.
            I'm driven by the desire to make a positive impact on the tech community and beyond.
          </p>
        </div>
      </div>
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {sections.map((section, index) => (
            <div key={index} className="px-4">
              <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row items-center">
                <img src={section.image} alt={section.title} className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-4" />
                <div className="md:w-1/2">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    {section.icon}
                    {section.title}
                  </h3>
                  <p>{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default AboutMe;