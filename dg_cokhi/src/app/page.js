import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

import About from '@/components/About';
import BusinessInfo from '@/components/BusinessInfo';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import Projects from '@/components/Projects';
import QuoteForm from '@/components/QuoteForm';
import News from '@/components/News';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <BusinessInfo />
        <About />
        <Services />
        <WhyChooseUs />
        <Process />
        <Projects />
        <QuoteForm />
        <News />
        <Partners />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
