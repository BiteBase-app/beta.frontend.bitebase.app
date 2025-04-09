import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const features = [
    {
      icon: 'fas fa-map-marked-alt',
      title: 'Location Intelligence',
      description: 'Find the perfect location with our AI-powered market analysis, demographic insights, and competitor mapping.',
      color: 'bg-primary',
    },
    {
      icon: 'fas fa-users',
      title: 'Competitor Analysis',
      description: 'Track competitors\' pricing, menu items, promotions, and customer reviews to stay ahead of the competition.',
      color: 'bg-secondary',
    },
    {
      icon: 'fas fa-people-arrows',
      title: 'Foot Traffic Analytics',
      description: 'Understand customer movement patterns, peak hours, and seasonal trends to optimize operations.',
      color: 'bg-accent',
    },
    {
      icon: 'fas fa-chart-pie',
      title: 'Demographics Insights',
      description: 'Analyze local demographics to tailor your menu, marketing, and customer experience for maximum appeal.',
      color: 'bg-primary',
    },
    {
      icon: 'fas fa-clipboard-list',
      title: 'Menu Optimization',
      description: 'Use data to optimize your menu items, pricing, and placement for maximum profitability.',
      color: 'bg-secondary',
    },
    {
      icon: 'fas fa-robot',
      title: 'AI Assistant',
      description: 'Get personalized recommendations and insights from our AI assistant to grow your restaurant business.',
      color: 'bg-accent',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for small restaurants just getting started with data analytics.',
      features: [
        'Location analysis',
        'Basic competitor insights',
        'Demographic data',
        'Standard reports',
        '1 user access',
      ],
      buttonText: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$149',
      period: '/month',
      description: 'Ideal for growing restaurants looking to expand and optimize operations.',
      features: [
        'Everything in Starter',
        'Advanced competitor tracking',
        'Foot traffic analysis',
        'Menu optimization',
        'Custom reports',
        '5 user access',
        'API access',
      ],
      buttonText: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '$349',
      period: '/month',
      description: 'For restaurant chains and multi-location businesses requiring advanced analytics.',
      features: [
        'Everything in Professional',
        'Multi-location management',
        'Predictive analytics',
        'Advanced AI recommendations',
        'Dedicated support',
        'Unlimited user access',
        'Custom integrations',
      ],
      buttonText: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="bg-light text-dark">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <i className="fas fa-utensils text-white text-xl"></i>
                </div>
                <span className="ml-3 text-xl font-bold">BiteBase<span className="text-secondary">AI</span></span>
              </div>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="#features" className="nav-link inline-flex items-center px-1 pt-1 text-sm font-medium text-dark">Features</a>
                <a href="#how-it-works" className="nav-link text-gray-500 hover:text-dark inline-flex items-center px-1 pt-1 text-sm font-medium">How It Works</a>
                <a href="#pricing" className="nav-link text-gray-500 hover:text-dark inline-flex items-center px-1 pt-1 text-sm font-medium">Pricing</a>
                <a href="#testimonials" className="nav-link text-gray-500 hover:text-dark inline-flex items-center px-1 pt-1 text-sm font-medium">Testimonials</a>
                <a href="#faq" className="nav-link text-gray-500 hover:text-dark inline-flex items-center px-1 pt-1 text-sm font-medium">FAQ</a>
              </div>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center">
              <Link to="/login" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-dark bg-gray-100 hover:bg-gray-200 mr-4">
                Log In
              </Link>
              <Link to="/signup" className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-opacity-90">
                Get Started
              </Link>
            </div>
            <div className="-mr-2 flex items-center md:hidden">
              <button 
                type="button" 
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-dark hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 text-base font-medium text-dark border-l-4 border-primary">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-dark hover:bg-gray-50">How It Works</a>
              <a href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-dark hover:bg-gray-50">Pricing</a>
              <a href="#testimonials" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-dark hover:bg-gray-50">Testimonials</a>
              <a href="#faq" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-dark hover:bg-gray-50">FAQ</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <Link to="/login" className="block w-full px-4 py-2 text-center text-sm font-medium rounded-md text-dark bg-gray-100 hover:bg-gray-200 mr-2">
                  Log In
                </Link>
                <Link to="/signup" className="block w-full px-4 py-2 text-center text-sm font-medium rounded-md text-white bg-primary hover:bg-opacity-90">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
              <div>
                <h1 className="text-4xl tracking-tight font-extrabold text-dark sm:text-5xl md:text-6xl">
                  <span className="block">Data-Driven</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Restaurant Success</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Harness the power of AI to analyze markets, optimize locations, and outperform competitors with BiteBase Intelligence.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button className="px-6 py-3 bg-primary text-white hover:bg-opacity-90">
                      Start Free Trial
                      <i className="fas fa-arrow-right ml-2"></i>
                    </Button>
                    <Button variant="secondary" className="px-6 py-3 bg-secondary text-white hover:bg-opacity-90">
                      <i className="fas fa-play-circle mr-2"></i>
                      Watch Demo
                    </Button>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    Trusted by 5,000+ restaurants worldwide
                    <span className="text-primary ml-2">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span className="text-dark">4.8/5</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white overflow-hidden rounded-lg">
                  <img 
                    className="w-full" 
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Restaurant analytics dashboard" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-lg font-medium text-white">See it in action</h3>
                    <p className="mt-1 text-sm text-gray-300">Our AI-powered dashboard gives you real-time insights</p>
                    <a href="#demo" className="mt-2 inline-flex items-center text-sm font-medium text-accent">
                      Watch demo video
                      <i className="fas fa-play-circle ml-1"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute -left-16 -top-16 w-32 h-32 rounded-full bg-accent opacity-20 animate-pulse-slow"></div>
              <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-primary opacity-20 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-primary text-2xl animate-bounce">
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary bg-opacity-10 text-primary">
                <i className="fas fa-chart-line text-xl"></i>
              </div>
              <h3 className="mt-5 text-3xl font-bold text-dark">87%</h3>
              <p className="mt-2 text-sm text-gray-500">Increase in success rate</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-secondary bg-opacity-10 text-secondary">
                <i className="fas fa-store text-xl"></i>
              </div>
              <h3 className="mt-5 text-3xl font-bold text-dark">5,000+</h3>
              <p className="mt-2 text-sm text-gray-500">Restaurants using our platform</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-accent bg-opacity-10 text-accent">
                <i className="fas fa-dollar-sign text-xl"></i>
              </div>
              <h3 className="mt-5 text-3xl font-bold text-dark">$1.2M</h3>
              <p className="mt-2 text-sm text-gray-500">Average revenue increase</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary bg-opacity-10 text-primary">
                <i className="fas fa-clock text-xl"></i>
              </div>
              <h3 className="mt-5 text-3xl font-bold text-dark">40h</h3>
              <p className="mt-2 text-sm text-gray-500">Saved per month on research</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <Badge className="bg-primary bg-opacity-10 text-primary">Features</Badge>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-dark sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides comprehensive tools to analyze every aspect of your restaurant business.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                  <CardContent className="p-8">
                    <div className={`flex items-center justify-center h-12 w-12 rounded-md ${feature.color} text-white`}>
                      <i className={`${feature.icon} text-xl`}></i>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-dark">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                    <div className="mt-6">
                      <a href="#" className="text-primary font-medium flex items-center">
                        Learn more
                        <i className="fas fa-chevron-right ml-1 text-xs"></i>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <Badge className="bg-primary bg-opacity-10 text-primary">Pricing</Badge>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-dark sm:text-4xl">
              Simple, transparent pricing
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Choose the plan that best fits your restaurant's needs and scale as you grow.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${
                  plan.highlighted ? 'relative border-2 border-primary shadow-lg' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-primary text-white">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-dark">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-dark">{plan.price}</span>
                    <span className="ml-1 text-xl text-gray-500">{plan.period}</span>
                  </div>
                  <p className="mt-4 text-gray-500">{plan.description}</p>
                  
                  <div className="mt-6 space-y-4 flex-1">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex-shrink-0">
                          <i className="fas fa-check text-primary"></i>
                        </div>
                        <p className="ml-3 text-sm text-gray-500">{feature}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      className={`w-full ${
                        plan.highlighted 
                          ? 'bg-primary text-white hover:bg-opacity-90' 
                          : 'bg-gray-100 text-dark hover:bg-gray-200'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <i className="fas fa-utensils text-white text-xl"></i>
                </div>
                <span className="ml-3 text-xl font-bold text-white">BiteBase<span className="text-secondary">AI</span></span>
              </div>
              <p className="mt-4 text-gray-400 text-sm">
                Empowering restaurants with data-driven insights to make better decisions and achieve greater success.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Connect</h3>
              <div className="mt-4 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Subscribe</h3>
                <div className="mt-4 flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-gray-800 border border-gray-700 rounded-l-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary" 
                  />
                  <button className="bg-primary text-white rounded-r-md py-2 px-4 hover:bg-opacity-90">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2023 BiteBaseAI. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 