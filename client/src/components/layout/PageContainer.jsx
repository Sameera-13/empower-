import SkipToContent from '../common/SkipToContent';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PageContainer({ children }) {
  return (
    <>
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
