import React from 'react';
import Slider from 'react-slick';
import { Code, DollarSign, Mic, Users, Home, PenTool, MessageSquare, ChevronLeft, ChevronRight, Github } from 'lucide-react';
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
      image: 'https://images.unsplash.com/photo-1703675858673-56aab77ccbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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
          src="https://res.cloudinary.com/dzc7cp7jh/image/upload/t_Profile/v1728585776/Profile_Picture_Gilad_ubruik.png"
          alt="Gilad Shoham"
          className="w-64 h-64 rounded-full object-cover mb-4 md:mr-8"
        />
        <div>
          <p className="mb-4">
          I believe that software development is a tool to improve human life.
          I find software to be the most powerful way to share value in order to connect people and improve the quality of all our lives.
          </p>
          <p className="mb-4">
            Software engineering for me is like painting or sculpting, it's a way to take a complicated and beautiful structure lay, connect all the dots piece by piece, and create a masterpiece. It's more than just art, it's life.
          </p>
          <p className="mb-4">
            That's why I wake up with a smile and keep it on all day long. I am lucky to be paid for doing what I love the most.
            That's what makes me a great engineer. I'm not smarter than others, I just really care.
            I love what I do and do what I love, so I don't play the nine-to-five game, I live it 24/7.
          </p>
          <p className="mb-4">
            This rush makes me develop community projects like Stunity and learn new paradigms and tools with the passion of a child getting a new toy running around and having fun without the need for any additional incentive.
            I share my beliefs with others to inspire them, and some follow. I also learn from others. That's what makes me a true leader.
          </p>
        </div>
      </div>
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {sections.map((section, index) => (
            <div key={index} className="px-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col md:flex-row items-center h-full">
                <img src={section.image} alt={section.title} className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-4" />
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-100">
                    {section.icon}
                    {section.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 rounded-full p-2 shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-gray-800 dark:text-gray-200" />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 rounded-full p-2 shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-gray-800 dark:text-gray-200" />
        </button>
      </div>
    </section>
  );
};

export default AboutMe;
