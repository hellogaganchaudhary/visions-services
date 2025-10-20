// Testimonials Data Structure

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
  service: string;
  location: string;
  date: string;
  projectDetails?: {
    duration: string;
    budget: string;
    outcome: string;
  };
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'CEO',
    company: 'TechStartup India',
    image: '/testimonials/rajesh.jpg', // Placeholder - replace with actual images
    rating: 5,
    text: "TechVision transformed our online presence completely! The website they built is not just beautiful but also highly functional. Our conversion rate increased by 150% within the first month. The team's attention to detail and commitment to deadlines was exceptional.",
    service: 'Full-Stack Web Development',
    location: 'Mumbai, India',
    date: '2025-09-15',
    projectDetails: {
      duration: '6 weeks',
      budget: '₹65,000',
      outcome: '150% increase in conversions',
    },
    featured: true,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Marketing Director',
    company: 'Fashion Hub',
    image: '/testimonials/priya.jpg',
    rating: 5,
    text: 'The e-commerce platform they developed exceeded our expectations. The design is stunning, and the shopping experience is seamless. Our sales have tripled since launch, and customer feedback has been overwhelmingly positive. Highly recommend their services!',
    service: 'E-Commerce Development',
    location: 'Delhi, India',
    date: '2025-08-22',
    projectDetails: {
      duration: '8 weeks',
      budget: '₹85,000',
      outcome: '3x increase in online sales',
    },
    featured: true,
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Founder',
    company: 'Digital Solutions',
    image: '/testimonials/amit.jpg',
    rating: 5,
    text: 'Outstanding SEO services! We went from page 5 to page 1 for our main keywords in just 3 months. The team provided detailed reports and was always available to explain strategies. Our organic traffic increased by 300%. Best investment we made!',
    service: 'SEO & Digital Marketing',
    location: 'Ahmedabad, India',
    date: '2025-07-10',
    projectDetails: {
      duration: '3 months',
      budget: '₹30,000/month',
      outcome: '300% increase in organic traffic',
    },
    featured: true,
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'Operations Manager',
    company: 'LogiTech Services',
    image: '/testimonials/sneha.jpg',
    rating: 5,
    text: 'The custom CRM system they built has revolutionized how we manage customer relationships. Everything is automated, organized, and accessible. We saved 20 hours per week on manual data entry. The ROI was evident within the first month!',
    service: 'Custom Software Development',
    location: 'Bangalore, India',
    date: '2025-06-18',
    projectDetails: {
      duration: '10 weeks',
      budget: '₹1,20,000',
      outcome: '20 hours/week time savings',
    },
    featured: false,
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Product Manager',
    company: 'FinTech Innovations',
    image: '/testimonials/vikram.jpg',
    rating: 5,
    text: 'Their UI/UX design work is world-class. They took our complex financial platform and made it intuitive and beautiful. User satisfaction scores increased by 45%, and app store ratings went from 3.8 to 4.7 stars. Exceptional design thinking!',
    service: 'UI/UX Design',
    location: 'Pune, India',
    date: '2025-05-25',
    projectDetails: {
      duration: '4 weeks',
      budget: '₹45,000',
      outcome: '45% increase in user satisfaction',
    },
    featured: false,
  },
  {
    id: 6,
    name: 'Meera Joshi',
    role: 'CTO',
    company: 'CloudScale Systems',
    image: '/testimonials/meera.jpg',
    rating: 5,
    text: 'Migrating to AWS was daunting, but TechVision made it seamless. They optimized our infrastructure, reduced costs by 40%, and improved performance significantly. Their cloud expertise and 24/7 support have been invaluable. True cloud experts!',
    service: 'Cloud Migration & Optimization',
    location: 'Hyderabad, India',
    date: '2025-04-12',
    projectDetails: {
      duration: '5 weeks',
      budget: '₹95,000',
      outcome: '40% cost reduction',
    },
    featured: true,
  },
  {
    id: 7,
    name: 'Arjun Malhotra',
    role: 'Business Owner',
    company: 'Café Connect',
    image: '/testimonials/arjun.jpg',
    rating: 5,
    text: 'The AI chatbot they developed handles 80% of customer inquiries automatically! It books reservations, answers questions, and even takes orders. Our customer service costs dropped by 60% while satisfaction improved. Game-changing technology!',
    service: 'AI Chatbot Development',
    location: 'Chandigarh, India',
    date: '2025-03-08',
    projectDetails: {
      duration: '7 weeks',
      budget: '₹75,000',
      outcome: '60% reduction in support costs',
    },
    featured: false,
  },
  {
    id: 8,
    name: 'Kavita Desai',
    role: 'Marketing Head',
    company: 'Beauty Essentials',
    image: '/testimonials/kavita.jpg',
    rating: 5,
    text: "Their social media marketing expertise is remarkable. Our Instagram following grew from 5K to 50K in 4 months, and engagement rates are through the roof. They understand our brand perfectly and create content that truly resonates. Phenomenal results!",
    service: 'Social Media Marketing',
    location: 'Jaipur, India',
    date: '2025-02-14',
    projectDetails: {
      duration: '4 months',
      budget: '₹25,000/month',
      outcome: '10x follower growth',
    },
    featured: false,
  },
  {
    id: 9,
    name: 'Rohan Gupta',
    role: 'Startup Founder',
    company: 'EduTech Pro',
    image: '/testimonials/rohan.jpg',
    rating: 5,
    text: "They built our mobile app from scratch and it's absolutely brilliant! The React Native app works flawlessly on both iOS and Android. User feedback has been amazing, and we hit 10,000 downloads in the first month. Could not be happier!",
    service: 'Mobile App Development',
    location: 'Kolkata, India',
    date: '2025-01-20',
    projectDetails: {
      duration: '8 weeks',
      budget: '₹1,10,000',
      outcome: '10K downloads in month 1',
    },
    featured: true,
  },
  {
    id: 10,
    name: 'Ananya Iyer',
    role: 'Operations Director',
    company: 'Manufacturing Pro',
    image: '/testimonials/ananya.jpg',
    rating: 5,
    text: 'The automation tools they developed have transformed our operations. What used to take days now takes hours. Data entry, report generation, inventory management - everything is automated. We estimate 70% time savings across the board. Incredible ROI!',
    service: 'Business Automation',
    location: 'Chennai, India',
    date: '2024-12-15',
    projectDetails: {
      duration: '6 weeks',
      budget: '₹80,000',
      outcome: '70% time savings',
    },
    featured: false,
  },
  {
    id: 11,
    name: 'Sanjay Verma',
    role: 'IT Manager',
    company: 'Retail Chain India',
    image: '/testimonials/sanjay.jpg',
    rating: 5,
    text: 'Their DevOps expertise helped us achieve continuous deployment with zero downtime. The CI/CD pipeline they set up is robust and reliable. We deploy multiple times a day now with complete confidence. Technical excellence at its best!',
    service: 'DevOps & CI/CD',
    location: 'Noida, India',
    date: '2024-11-28',
    projectDetails: {
      duration: '5 weeks',
      budget: '₹70,000',
      outcome: 'Zero downtime deployments',
    },
    featured: false,
  },
  {
    id: 12,
    name: 'Deepa Nair',
    role: 'Brand Manager',
    company: 'Lifestyle Products',
    image: '/testimonials/deepa.jpg',
    rating: 5,
    text: "The branding and logo design they created perfectly captures our brand essence. Every detail was thoughtfully considered, and they provided multiple concepts to choose from. The final result exceeded our vision. Our brand identity is now strong and memorable!",
    service: 'Branding & Logo Design',
    location: 'Kochi, India',
    date: '2024-10-10',
    projectDetails: {
      duration: '3 weeks',
      budget: '₹35,000',
      outcome: 'Complete brand transformation',
    },
    featured: false,
  },
];

// Helper functions
export const getFeaturedTestimonials = (): Testimonial[] => {
  return testimonials.filter(t => t.featured);
};

export const getTestimonialsByService = (service: string): Testimonial[] => {
  return testimonials.filter(t => 
    t.service.toLowerCase().includes(service.toLowerCase())
  );
};

export const getRecentTestimonials = (count: number = 6): Testimonial[] => {
  return testimonials
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getAverageRating = (): number => {
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  return sum / testimonials.length;
};

export const getTotalTestimonials = (): number => {
  return testimonials.length;
};
