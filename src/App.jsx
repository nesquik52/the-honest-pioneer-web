import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Globe, ArrowUp, Menu, X, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// --- КОМПОНЕНТ КАРТОЧКИ С ТРЕЩИНАМИ ---
function HistoryCard({ number, title, children, isFullWidth = false, color = "bg-white" }) {
  const { t } = useTranslation();
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    if (clicks < 3) setClicks(clicks + 1);
  };

  return (
    <div 
      onClick={handleClick}
      className={`relative rounded-[40px] md:rounded-[60px] overflow-hidden shadow-xl min-h-[350px] md:min-h-[450px] cursor-pointer select-none ${isFullWidth ? 'md:col-span-2' : ''} ${color}`}
    >
      <AnimatePresence>
        {clicks < 3 && (
          <motion.div
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            // ИСПРАВЛЕНИЕ ОБВОДКИ: добавили те же rounded-[40px] md:rounded-[60px], что и у родителя
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#e0ddd7] border-4 border-[#c2bfb9] rounded-[40px] md:rounded-[60px]"
            animate={clicks > 0 ? { x: [0, -5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.2 }}
            key="cover"
          >
            {/* ИСПРАВЛЕНИЕ ЦИФРЫ: text-[8rem] для мобилок, leading-none и transform-gpu от визуальных багов */}
            <span className="text-[8rem] md:text-[15rem] font-black text-black/10 leading-none transform-gpu">
              {number}
            </span>

            {/* ИСПРАВЛЕНИЕ ТРЕЩИН: preserveAspectRatio="none", чтобы они идеально тянулись по всей карточке */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {clicks >= 1 && (
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M20,0 L35,20 L30,40 L50,55 L45,80 L60,100" stroke="black" strokeWidth="0.5" fill="none" opacity="0.3" />
              )}
              {clicks >= 2 && (
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M80,0 L70,30 L85,50 L60,70 L75,100 M0,50 L20,45 L40,60 L100,40" stroke="black" strokeWidth="0.8" fill="none" opacity="0.4" />
              )}
            </svg>

            {clicks === 0 && (
              <div className="absolute bottom-6 md:bottom-10 text-black/30 font-bold uppercase tracking-widest text-lg md:text-xl">
                {t('breakPrompt')}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Внутренний контент карточки (оригинальный текст) */}
      <div className={`p-8 md:p-12 h-full flex flex-col justify-center relative z-10`}>
         <h3 className={`text-3xl md:text-5xl mb-4 md:mb-6 uppercase leading-tight ${color === 'bg-[#d92b2b]' ? 'text-white' : 'text-[#d92b2b]'}`}>
           {title}
         </h3>
         <div className={`text-xl md:text-3xl font-bold leading-snug ${color === 'bg-[#d92b2b]' ? 'text-white/90' : 'text-gray-800'}`}>
           {children}
         </div>
         <span className={`absolute top-5 right-5 md:right-10 text-[6rem] md:text-[10rem] font-black pointer-events-none opacity-5 ${color === 'bg-[#d92b2b]' ? 'text-white' : 'text-black'}`}>
           {number}
         </span>
      </div>
    </div>
  );
}

// --- ОСНОВНОЙ КОМПОНЕНТ ---
export default function App() {
  const { t, i18n } = useTranslation();
  
  // Стейты
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Для скриншотов
  const [isVideoOpen, setIsVideoOpen] = useState(false); // НОВЫЙ СТЕЙТ ДЛЯ ВИДЕО

  // Смена языка
  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('ru') ? 'en' : 'ru';
    i18n.changeLanguage(nextLang);
  };

  // Скролл для кнопки "Наверх"
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
      <header className="fixed top-4 md:top-8 left-0 w-full z-50 px-4 md:px-8 flex justify-between items-center pointer-events-none">
        
        <nav className="pointer-events-auto hidden md:flex items-center gap-10 bg-white/95 backdrop-blur-md border-2 border-gray-200 px-12 py-5 rounded-full shadow-xl font-bold text-gray-800 text-2xl">
          <a href="#about" className="hover:text-[#d92b2b] transition-colors">{t('navAbout')}</a>
          <a href="#history" className="hover:text-[#d92b2b] transition-colors">{t('navHistory')}</a>
          <a href="#socials" className="hover:text-[#d92b2b] transition-colors">{t('navSocials')}</a>
        </nav>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="pointer-events-auto md:hidden flex items-center justify-center bg-white/95 backdrop-blur-md border-2 border-gray-200 p-3 rounded-full shadow-md text-gray-800"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <button 
          onClick={toggleLanguage} 
          className="pointer-events-auto flex items-center gap-2 md:gap-4 bg-white/95 hover:bg-white backdrop-blur-md border-2 border-gray-200 px-4 py-3 md:px-8 md:py-5 rounded-full font-bold transition-all shadow-xl text-lg md:text-2xl text-gray-800"
        >
          <Globe size={24} className="md:w-7 md:h-7" />
          <span className="hidden md:inline">{i18n.language.startsWith('ru') ? t('lang_en') : t('lang_ru')}</span>
          <span className="md:hidden">{i18n.language.startsWith('ru') ? 'EN' : 'RU'}</span>
        </button>
      </header>

      {/* МОБИЛЬНОЕ МЕНЮ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-[30px] p-6 shadow-2xl flex flex-col gap-6 md:hidden pointer-events-auto"
          >
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-center text-gray-800 hover:text-[#d92b2b]">{t('navAbout')}</a>
            <a href="#history" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-center text-gray-800 hover:text-[#d92b2b]">{t('navHistory')}</a>
            <a href="#socials" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-center text-gray-800 hover:text-[#d92b2b]">{t('navSocials')}</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-28 pb-8 md:pt-28 md:pb-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/40 z-10"></div>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover blur-md opacity-50" src="/gameplay-bg.mp4" />
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-20 w-full max-w-7xl flex flex-col items-center gap-6 md:gap-6">
          <h1 className="text-5xl md:text-[8rem] text-[#d92b2b] uppercase drop-shadow-md leading-none text-center mt-8 md:mt-0">
            {t('title')}
          </h1>

          {/* ПРЕВЬЮ ВИДЕО (ЗАМЕНИЛИ ТВ-ЯЩИК) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsVideoOpen(true)}
            className="w-full max-w-4xl relative aspect-video rounded-[20px] md:rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-gray-200 cursor-pointer group bg-black"
          >
            {/* Обложка видео */}
            <img 
              src="/poster.jpeg" 
              alt="Trailer preview" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
            />
            
            {/* Кнопка Play по центру */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
              <div className="bg-[#d92b2b] text-white rounded-full p-6 md:p-8 shadow-[0_0_30px_rgba(217,43,43,0.6)] transform transition-transform group-hover:scale-110">
                <Play className="w-12 h-12 md:w-16 md:h-16 ml-1 md:ml-2" fill="currentColor" />
              </div>
            </div>
          </motion.div>

          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://store.steampowered.com" target="_blank" className="flex items-center gap-3 md:gap-4 bg-[#d92b2b] hover:bg-[#b52424] text-white px-8 py-4 md:px-14 md:py-6 rounded-3xl font-bold text-xl md:text-3xl transition-all uppercase shadow-xl md:shadow-2xl shadow-red-300 pointer-events-auto mt-2">
            <ShoppingCart size={24} className="md:w-9 md:h-9" />
            {t('buySteam')}
          </motion.a>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <motion.section id="about" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-16 md:py-24 bg-white">
        <div className="w-full max-w-7xl flex flex-col items-center gap-8 md:gap-16">
          <h2 className="text-4xl md:text-7xl text-[#d92b2b] text-center uppercase leading-none font-bold">{t('descTitle')}</h2>
          <p className="text-xl md:text-4xl text-gray-800 text-center font-medium leading-relaxed max-w-5xl">{t('descText')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full mt-4 md:mt-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div 
                key={item} 
                whileHover={{ scale: 1.02, y: -5 }} 
                onClick={() => setSelectedImage(item)}
                className="rounded-[40px] overflow-hidden border-4 border-gray-200 shadow-2xl aspect-video bg-[#f4f1ec] relative group cursor-pointer"
              >
                <img 
                  src={`/screenshots/${item}.jpeg`} 
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
      <motion.section id="history" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-16 md:py-32 bg-[#f4f1ec]">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-[8rem] mb-12 md:mb-24 text-[#d92b2b] text-center uppercase leading-none">{t('historyTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <HistoryCard number="01" title={t('gaidarName')} isFullWidth={true} color="bg-[#d92b2b]">{t('gaidarInfo')}</HistoryCard>
            <HistoryCard number="02" title={t('skdTitle')}>{t('skdDesc')}</HistoryCard>
            <HistoryCard number="03" title={t('teamTitle')}>{t('teamDesc')}</HistoryCard>
            <HistoryCard number="04" title={t('teamWork')}>{t('teamWorkDesc')}</HistoryCard>
            <HistoryCard number="05" title={t('visualStyle')}>{t('visualStyleDesc')}</HistoryCard>
          </div>
        </div>
      </motion.section>

      {/* SOCIALS SECTION */}
      <motion.section id="socials" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} className="relative py-16 md:py-24 flex flex-col items-center justify-center px-4">
        <h2 className="text-4xl md:text-7xl mb-10 md:mb-16 text-[#d92b2b] text-center uppercase">{t('findUs')}</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-12">
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
          <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-white/90 border-2 border-gray-200 text-[#d92b2b] hover:bg-[#d92b2b] hover:text-white p-3 md:p-5 rounded-full shadow-2xl transition-colors pointer-events-auto">
            <ArrowUp className="w-8 h-8 md:w-9 md:h-9" strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ЛАЙТБОКС (МОДАЛЬНОЕ ОКНО ДЛЯ СКРИНШОТОВ) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-10 cursor-pointer pointer-events-auto"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md transition-colors z-50"
            >
              <X size={32} />
            </button>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
              src={`/screenshots/${selectedImage}.jpeg`}
              alt="Expanded screenshot"
              className="max-w-full max-h-full object-contain rounded-[20px] md:rounded-[30px] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-2 border-white/20 cursor-default"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => { e.target.src = `https://placehold.co/1280x720/e2e8f0/64748b?text=${t('placeholderText')}`; }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ЛАЙТБОКС (МОДАЛЬНОЕ ОКНО ДЛЯ ВИДЕО) */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-10 cursor-pointer pointer-events-auto"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setIsVideoOpen(false); }}
              className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md transition-colors z-50"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
              className="relative w-full max-w-6xl aspect-video rounded-[20px] md:rounded-[30px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-2 border-white/20 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* autoPlay запускает видео сразу при открытии окна */}
              <video 
                controls 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              >
                <source src="/trailer.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function SocialIcon({ href, src }) {
  return (
    <motion.a href={href} target="_blank" whileHover={{ y: -10, scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-white border border-gray-200 rounded-2xl md:rounded-3xl transition-all shadow-md hover:shadow-xl">
      <img src={src} alt="Social link" className="w-8 h-8 md:w-14 md:h-14 object-contain" />
    </motion.a>
  );
}