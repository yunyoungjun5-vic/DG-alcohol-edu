import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "홈", path: "/" },
    {
      name: "센터소개",
      path: "/about",
      subItems: [
        { name: "센터소개", path: "/about" },
        { name: "원장 프로필", path: "/about/director" },
        { name: "상담 전문가", path: "/about/experts" },
        { name: "방송 및 언론", path: "/about/media" },
        { name: "협력 · 협약 · 출강 기관", path: "/about/partnerships" },
        { name: "오시는 길", path: "/about/location" },
      ],
    },
    {
      name: "상담/서비스",
      path: "/services",
      subItems: [
        { name: "음주운전 심리상담", path: "/services/counseling" },
        { name: "재범방지 교육", path: "/services/education" },
        { name: "음주문제 치료 프로그램", path: "/services/treatment" },
      ],
    },
    { name: "양형자료", path: "/sentencing" },
    { name: "재범방지 프로그램", path: "/program" },
    { name: "비대면 프로그램", path: "/online-program" },
    {
      name: "자료실",
      path: "/library",
      subItems: [
        { name: "전문가 칼럼", path: "/library/column" },
        { name: "변화 사례", path: "/library/cases" },
      ],
    },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="hidden lg:block bg-slate-50 border-b border-slate-100 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[11px] font-medium text-slate-500 tracking-wider">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-primary" /> 대구광역시 달서구
              용산큰못 2길 25, 4층
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={12} className="text-primary" /> 0507-1359-0830
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={`transition-all duration-300 ${scrolled ? "bg-white shadow-md py-3" : "bg-white/95 backdrop-blur-md py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white group-hover:bg-secondary transition-all duration-500 transform group-hover:rotate-12 shadow-lg shadow-primary/20">
                <Shield size={26} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  대구 음주운전 재범방지 센터
                </span>
                <span className="text-[9px] text-primary font-bold uppercase tracking-[0.2em] mt-1.5">
                  Daegu DUI Recidivism Prevention Center
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-10">
              {menuItems.map((item) => (
                <div key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`text-[15px] font-bold transition-all hover:text-primary flex items-center gap-1 relative py-2 ${location.pathname.startsWith(item.path) && item.path !== "/" ? "text-primary" : location.pathname === item.path ? "text-primary" : "text-slate-700"}`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${(location.pathname.startsWith(item.path) && item.path !== "/") || location.pathname === item.path ? "w-full" : ""}`}
                    ></span>
                  </Link>

                  {/* Dropdown for subItems */}
                  {item.subItems && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-white shadow-2xl rounded-2xl border border-slate-100 py-3 min-w-[220px] overflow-hidden">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={`block px-6 py-2.5 text-sm font-bold transition-all hover:bg-slate-50 hover:text-primary whitespace-nowrap ${location.pathname === sub.path ? "text-primary bg-slate-50" : "text-slate-600"}`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <a
                href="https://map.naver.com/p/entry/place/1608572380?c=15.00,0,0,0,dh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                상담 예약
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-slate-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-2">
              {menuItems.map((item) => (
                <div key={item.path} className="flex flex-col">
                  <Link
                    to={item.path}
                    onClick={() => !item.subItems && setIsOpen(false)}
                    className={`text-lg font-bold py-2 ${location.pathname.startsWith(item.path) && item.path !== "/" ? "text-primary" : "text-slate-800"}`}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div className="flex flex-col pl-4 border-l-2 border-slate-100 gap-2 mt-1 mb-2">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setIsOpen(false)}
                          className={`text-[15px] font-medium py-1.5 ${location.pathname === sub.path ? "text-primary" : "text-slate-500"}`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="https://map.naver.com/p/entry/place/1608572380?c=15.00,0,0,0,dh"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white text-center py-4 rounded-xl font-bold mt-4"
              >
                상담 예약하기
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="text-primary" size={32} />
              <span className="text-2xl font-bold text-white">
                대구 음주운전 재범방지 교육심리상담센터
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              비난보다는 변화를, 처벌보다는 회복을 지향합니다. 전문적인 심리
              진단과 체계적인 재범 방지 프로그램을 통해 당신의 소중한 일상을
              다시 세우는 든든한 조력자가 되겠습니다.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  센터소개
                </Link>
              </li>
              <li>
                <Link
                  to="/about/director"
                  className="hover:text-primary transition-colors"
                >
                  원장 프로필
                </Link>
              </li>
              <li>
                <Link
                  to="/about/experts"
                  className="hover:text-primary transition-colors"
                >
                  상담 전문가
                </Link>
              </li>
              <li>
                <Link
                  to="/about/media"
                  className="hover:text-primary transition-colors"
                >
                  방송 및 언론
                </Link>
              </li>
              <li>
                <Link
                  to="/about/partnerships"
                  className="hover:text-primary transition-colors"
                >
                  협력 · 협약 · 출강 기관
                </Link>
              </li>
              <li>
                <Link
                  to="/about/location"
                  className="hover:text-primary transition-colors"
                >
                  오시는 길
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-colors"
                >
                  상담/서비스
                </Link>
              </li>
              <li>
                <Link
                  to="/sentencing"
                  className="hover:text-primary transition-colors"
                >
                  양형자료
                </Link>
              </li>
              <li>
                <Link
                  to="/program"
                  className="hover:text-primary transition-colors"
                >
                  재범방지 프로그램
                </Link>
              </li>
              <li>
                <Link
                  to="/online-program"
                  className="hover:text-primary transition-colors"
                >
                  비대면 프로그램
                </Link>
              </li>
              <li>
                <Link
                  to="/library/column"
                  className="hover:text-primary transition-colors"
                >
                  전문가 칼럼
                </Link>
              </li>
              <li>
                <Link
                  to="/library/cases"
                  className="hover:text-primary transition-colors"
                >
                  변화 사례
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="text-primary font-bold">ADDR.</span>
                <span>대구광역시 달서구 용산큰못 2길 25, 4층</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">TEL.</span>
                <span>0507-1359-0830</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">TIME.</span>
                <span>평일 09:00 - 20:00 (주말 예약제)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © 2026 대구 음주운전 재범방지 교육심리상담센터. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-white">
              이용약관
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
