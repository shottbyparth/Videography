import content from '../data/content.json';
import Hero from './components/Hero';
import SectionGrid from './components/SectionGrid';
import SocialBar from './components/SocialBar';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <>
      <Hero site={content.site} />
      <SectionGrid sections={content.sections} />
      <SocialBar social={content.social} />
      <ContactSection contact={content.contact} />
    </>
  );
}
