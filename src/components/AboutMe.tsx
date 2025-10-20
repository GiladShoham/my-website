import React from 'react';
import Slider from 'react-slick';
import {
  Code, DollarSign, Mic, Users, Home, PenTool, MessageSquare, ChevronLeft, ChevronRight
} from 'lucide-react';
import { cardClasses } from './common/CardStyles';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AboutMe: React.FC = () => {
  const sliderRef = React.useRef<Slider>(null);
  const { language } = useLanguage();
  const t = useTranslation(language);

  const iconMap = [
    <Code className="w-6 h-6 mr-2" key="code" />,
    <Users className="w-6 h-6 mr-2" key="users1" />,
    <DollarSign className="w-6 h-6 mr-2" key="dollar" />,
    <Mic className="w-6 h-6 mr-2" key="mic" />,
    <PenTool className="w-6 h-6 mr-2" key="pen" />,
    <Users className="w-6 h-6 mr-2" key="users2" />,
    <Home className="w-6 h-6 mr-2" key="home" />,
    <MessageSquare className="w-6 h-6 mr-2" key="message" />,
  ];

  const images = [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://res.cloudinary.com/dzc7cp7jh/image/upload/f_auto,q_auto/v1754834694/combined-logos_taaqne.png',
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1702390796625-6dd9b46b1c0b?ixlib=rb-1.2.1&auto=format&fit=contain&w=500&q=60',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  ];

  const sections = t.whatIDo.sections.map((section, index) => ({
    title: section.title,
    icon: iconMap[index],
    content: section.content,
    image: images[index],
  }));

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
                    {t.hero.name}
                  </span>
                </h1>

                <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light">
                  {t.hero.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => document.getElementById('about-details')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {t.hero.learnMoreBtn}
                </button>
                <button
                  onClick={() => window.open('https://www.linkedin.com/in/shohamgilad/', '_blank')}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-105 transition-all duration-200"
                >
                  {t.hero.connectBtn}
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t.hero.stats.yearsLeading}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t.hero.stats.projects}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">2</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t.hero.stats.communities}</div>
                </div>
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
            {t.story.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t.story.philosophy.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.story.philosophy.content}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t.story.passion.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.story.passion.content}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t.story.dedication.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.story.dedication.content}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t.story.leadership.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.story.leadership.content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
            {t.whatIDo.title}
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
      </div>
    </section>
  );
};

export default AboutMe;
