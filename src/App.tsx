import { Contact } from './components/Contact';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Process } from './components/Process';
import { Services } from './components/Services';
import { SpiderWebBackground } from './components/SpiderWebBackground';
import { Work } from './components/Work';
import './App.css';

export default function App() {
  return (
    <>
      <SpiderWebBackground />
      <Header />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
