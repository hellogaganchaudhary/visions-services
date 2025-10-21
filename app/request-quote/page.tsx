import QuoteRequestForm from '@/components/forms/QuoteRequestForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Quote | Visions.services - Free Project Estimate',
  description: 'Get a detailed quote for your web development, mobile app, or software project. Free consultation and proposal within 24 hours. No commitment required.',
  keywords: ['project quote', 'free estimate', 'web development quote', 'app development cost', 'software development pricing'],
  openGraph: {
    title: 'Get Your Free Project Quote - Visions.services',
    description: 'Tell us about your project and receive a detailed proposal within 24 hours.',
    type: 'website',
  },
};

export default function RequestQuotePage() {
  return <QuoteRequestForm />;
}
