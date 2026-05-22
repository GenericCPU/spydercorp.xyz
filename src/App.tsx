import { Toast } from '@aeon-ui/react';
import { AppToaster } from './components/AppToaster';
import { Contact } from './components/Contact';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Process } from './components/Process';
import { Services } from './components/Services';
import { GridMesh } from './components/GridMesh';
import { Work } from './components/Work';
import './App.css';
import './components/SiteTop.css';

export default function App() {
  return (
    <Toast.Provider limit={3}>
      <GridMesh />
      <div className="site-top">
        <AnnouncementBar />
        <Header />
      </div>
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <AppToaster />
    </Toast.Provider>
  );
}
