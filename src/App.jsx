import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Globe, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function HistoryCard({ number, title, children, isFullWidth = false, color = "bg-white" }) {
  const { t } = useTranslation();
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    if (clicks < 3) setClicks(clicks + 1);
  };

  const shakeAnimation = {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.2 }
  };

  return (
    <div 
      onClick={handleClick}
      className={`relative rounded-[60px] overflow-hidden shadow-xl min-h-[450px] cursor-pointer select-none ${isFullWidth ? 'md:col-span-2' : ''} ${color}`}
    >
      <AnimatePresence>
        {clicks < 3 && (
          <motion.div
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#e0ddd7] border-4 border-[#c2bfb9]"
            animate={clicks > 0 ? shakeAnimation : {}}
            key="cover"
          >
            <span className="text-[15rem] font-black text-black/10">
              {number}
            </span>

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {clicks >= 1 && (
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  d="M20,0 L35,20 L30,40 L50,55 L45,80 L60,100"
                  stroke="black" strokeWidth="0.5" fill="none" opacity="0.3"
                />
              )}
              {clicks >= 2 && (
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  d="M80,0 L70,30 L85,50 L60,70 L75,100 M0,50 L20,45 L40,60 L100,40"
                  stroke="black" strokeWidth="0.8" fill="none" opacity="0.4"
                />
              )}
            </svg>

            {clicks === 0 && (
              <div className="absolute bottom-10 text-black/30 font-bold uppercase tracking-widest text-xl">
                {t('breakPrompt')}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`p-12 h-full flex flex-col justify-center relative z-10`}>
         <h3 className={`text-4xl md:text-5xl mb-6 uppercase leading-tight ${color === 'bg-[#d92b2b]' ? 'text-white' : 'text-[#d92b2b]'}`}>
           {title}
         </h3>
         <div className={`text-2xl md:text-3xl font-bold leading-snug ${color === 'bg-[#d92b2b]' ? 'text-white/90' : 'text-gray-800'}`}>
           {children}
         </div>
         <span className={`absolute top-5 right-10 text-[10rem] font-black pointer-events-none opacity-5 ${color === 'bg-[#d92b2b]' ? 'text-white' : 'text-black'}`}>
           {number}
         </span>
      </div>
    </div>
  );
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('ru') ? 'en' : 'ru';
    i18n.changeLanguage(nextLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) setShowScrollTop(true);
      else setShowScrollTop(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#fcfaf7] text-[#1a1a1a] font-sans relative">
      
      {/* HEADER */}
      <header className="fixed top-8 left-0 w-full z-50 px-8 flex justify-between items-start pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-10 bg-white/95 backdrop-blur-md border-2 border-gray-200 px-12 py-5 rounded-full shadow-xl font-bold text-gray-800 text-2xl">
          <a href="#about" className="hover:text-[#d92b2b] transition-colors">{t('navAbout')}</a>
          <a href="#history" className="hover:text-[#d92b2b] transition-colors">{t('navHistory')}</a>
          <a href="#socials" className="hover:text-[#d92b2b] transition-colors">{t('navSocials')}</a>
        </nav>
        <button onClick={toggleLanguage} className="pointer-events-auto flex items-center gap-4 bg-white/95 hover:bg-white backdrop-blur-md border-2 border-gray-200 px-8 py-5 rounded-full font-bold transition-all shadow-xl text-2xl text-gray-800">
          <Globe size={28} />
          {i18n.language.startsWith('ru') ? t('lang_en') : t('lang_ru')}
        </button>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-40 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/40 z-10"></div>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover blur-md opacity-50" src="/gameplay-bg.mp4" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-20 w-full max-w-7xl flex flex-col items-center gap-8">
          <h1 className="text-7xl md:text-[9rem] text-[#d92b2b] uppercase drop-shadow-md leading-none text-center">{t('title')}</h1>
          <div className="w-full max-w-5xl aspect-video rounded-[40px] overflow-hidden shadow-2xl border-4 border-white relative mt-4">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover" poster="/poster.jpg">
              <source src="/trailer.mp4" type="video/mp4" />
            </video>
          </div>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://store.steampowered.com" target="_blank" className="flex items-center gap-4 bg-[#d92b2b] hover:bg-[#b52424] text-white px-14 py-6 rounded-3xl font-bold text-3xl transition-all uppercase shadow-2xl shadow-red-300 pointer-events-auto mt-6">
            <ShoppingCart size={36} />
            {t('buySteam')}
          </motion.a>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <motion.section id="about" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.8 }} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-white">
        <div className="w-full max-w-7xl flex flex-col items-center gap-16">
          <h2 className="text-5xl md:text-7xl text-[#d92b2b] text-center uppercase leading-none font-bold">{t('descTitle')}</h2>
          <p className="text-2xl md:text-4xl text-gray-800 text-center font-medium leading-relaxed max-w-5xl">{t('descText')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div key={item} whileHover={{ scale: 1.02, y: -5 }} className="rounded-[40px] overflow-hidden border-4 border-gray-200 shadow-2xl aspect-video bg-[#f4f1ec] relative group cursor-pointer">
                <img 
                  src={`/screenshots/${item}.jpg`} 
                  alt={`${t('screenshotAlt')} ${item}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.target.src = `https://placehold.co/800x450/e2e8f0/64748b?text=${t('placeholderText')}`; }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* HISTORY SECTION */}
      <motion.section id="history" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.8 }} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 bg-[#f4f1ec]">
        <div className="max-w-7xl w-full">
          <h2 className="text-6xl md:text-[8rem] mb-24 text-[#d92b2b] text-center uppercase leading-none">{t('historyTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <HistoryCard number="01" title={t('gaidarName')} isFullWidth={true} color="bg-[#d92b2b]">{t('gaidarInfo')}</HistoryCard>
            <HistoryCard number="02" title={t('skdTitle')}>{t('skdDesc')}</HistoryCard>
            <HistoryCard number="03" title={t('teamTitle')}>{t('teamDesc')}</HistoryCard>
            <HistoryCard number="04" title={t('teamWork')}>{t('teamWorkDesc')}</HistoryCard>
            <HistoryCard number="05" title={t('visualStyle')}>{t('visualStyleDesc')}</HistoryCard>
          </div>
        </div>
      </motion.section>

      {/* SOCIALS SECTION */}
      <motion.section id="socials" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.8 }} className="relative py-24 flex flex-col items-center justify-center px-4">
        <h2 className="text-5xl md:text-7xl mb-16 text-[#d92b2b] text-center uppercase">{t('findUs')}</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <SocialIcon href="https://t.me/yourgame" src="/icons/telegram.png" />
          <SocialIcon href="https://discord.gg/yourgame" src="/icons/discord.png" />
          <SocialIcon href="https://x.com/yourgame" src="/icons/x.png" />
          <SocialIcon href="https://tiktok.com/@yourgame" src="/icons/tiktok.png" />
        </div>
      </motion.section>

      <footer className="py-10 text-center text-gray-400 border-t border-gray-100">
        <p>{t('footerCopyright')}</p>
      </footer>

      {/* SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-10 right-10 z-50 bg-white/90 border-2 border-gray-200 text-[#d92b2b] hover:bg-[#d92b2b] hover:text-white p-5 rounded-full shadow-2xl transition-colors pointer-events-auto">
            <ArrowUp size={36} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function SocialIcon({ href, src }) {
  return (
    <motion.a href={href} target="_blank" whileHover={{ y: -10, scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-white border border-gray-200 rounded-3xl transition-all shadow-md hover:shadow-xl">
      <img src={src} alt="Social link" className="w-12 h-12 md:w-14 md:h-14 object-contain" />
    </motion.a>
  );
}