import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
