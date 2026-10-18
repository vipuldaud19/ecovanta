import { useReveal } from './hooks';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Stats, Dashboard } from './components/Stats';
import About from './components/About';
import { Why, Solutions, Process, Industries, CtaBand, EcoPoints, Technology, Partners, Resources } from './components/Sections';
import Impact from './components/Impact';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Modal from './components/Modal';

export default function App() {
  useReveal();
  return (
    <>
      <a className="sk" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero /><Stats /><About /><Why /><Solutions /><Process /><Industries /><CtaBand />
        <Impact /><Dashboard /><EcoPoints /><Technology /><Testimonials /><Partners /><Resources /><Faq /><ContactForm />
      </main>
      <Footer />
      <Modal />
    </>
  );
}
