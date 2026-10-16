import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Tv } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const STORAGE_KEY_1 = "daegu_dui_hide_popup_until";
const STORAGE_KEY_2 = "daegu_dui_hide_popup2_until";

const RESERVATION_URL =
  "https://map.naver.com/p/entry/place/2056101308?c=15.00,0,0,0,dh&placePath=%2Fticket%3FfromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607211725%26locale%3Dko%26svcName%3Dmap_pcv5";
const POPUP_IMAGE_URL_1 =
  "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1790737575/ChatGPT_%EC%9D%B4%EB%AF%B8%EC%A7%80_2026%EB%85%84_9%EC%9B%94_30%EC%9D%BC_%EC%98%A4%ED%9B%84_12_03_33_dmdlou.png";
const POPUP_IMAGE_URL_2 =
  "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1792067983/%EC%A3%BC%EC%9A%94_%EB%B0%A9%EC%86%A1_%EC%96%B8%EB%A1%A0_%EA%B0%95%EC%A1%B0_%EC%83%81%EB%8B%B4%EC%84%BC%ED%84%B0_%ED%8F%AC%EC%8A%A4%ED%84%B0_e6ln84.png";

type PopupStep = 1 | 2 | null;

export const HomePopup: React.FC = () => {
  const [activePopup, setActivePopup] = useState<PopupStep>(null);
  const [dontShowToday1, setDontShowToday1] = useState(false);
  const [dontShowToday2, setDontShowToday2] = useState(false);
  const navigate = useNavigate();

  const isStorageHidden = (key: string): boolean => {
    try {
      const hideUntil = localStorage.getItem(key);
      if (hideUntil) {
        const hideTimestamp = parseInt(hideUntil, 10);
        if (!isNaN(hideTimestamp) && Date.now() < hideTimestamp) {
          return true;
        }
      }
    } catch {
      // LocalStorage access fallback
    }
    return false;
  };

  const setHideTodayInStorage = (key: string) => {
    try {
      const now = new Date();
      // Set to 23:59:59.999 of the current day
      const endOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999
      ).getTime();
      localStorage.setItem(key, endOfToday.toString());
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const isP1Hidden = isStorageHidden(STORAGE_KEY_1);
    const isP2Hidden = isStorageHidden(STORAGE_KEY_2);

    if (!isP1Hidden) {
      setActivePopup(1);
    } else if (!isP2Hidden) {
      setActivePopup(2);
    } else {
      setActivePopup(null);
    }
  }, []);

  // Popup 1 Close handler
  const handleClosePopup1 = (hideToday = false) => {
    if (hideToday || dontShowToday1) {
      setHideTodayInStorage(STORAGE_KEY_1);
    }

    // Immediately trigger Popup 2 if not hidden
    const isP2Hidden = isStorageHidden(STORAGE_KEY_2);
    if (!isP2Hidden) {
      setActivePopup(null);
      setTimeout(() => {
        setActivePopup(2);
      }, 150);
    } else {
      setActivePopup(null);
    }
  };

  // Popup 2 Close handler
  const handleClosePopup2 = (hideToday = false) => {
    if (hideToday || dontShowToday2) {
      setHideTodayInStorage(STORAGE_KEY_2);
    }
    setActivePopup(null);
  };

  const handleMediaLinkClick = () => {
    if (dontShowToday2) {
      setHideTodayInStorage(STORAGE_KEY_2);
    }
    setActivePopup(null);
    navigate("/about/media");
  };

  if (!activePopup) return null;

  return (
    <AnimatePresence mode="wait">
      {activePopup === 1 && (
        <div
          key="popup-1"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-[2px] overflow-y-auto"
          onClick={() => handleClosePopup1(false)}
          aria-modal="true"
          role="dialog"
          aria-label="상담센터 안내 팝업"
        >
          {/* Popup 1 Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[560px] lg:max-w-[640px] bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button (floating) */}
            <button
              type="button"
              onClick={() => handleClosePopup1(false)}
              className="absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/65 hover:bg-black/90 text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer shadow-lg"
              aria-label="팝업 닫기"
            >
              <X className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            </button>

            {/* Poster Image (Zero Margins, Full-bleed, Clickable to Reservation) */}
            <a
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full block cursor-pointer group"
              title="상담예약 바로가기"
            >
              <img
                src={POPUP_IMAGE_URL_1}
                alt="대구음주운전재범방지교육상담센터 안내"
                className="w-full h-auto block select-none"
                loading="eager"
              />
            </a>

            {/* CTA Reservation Button (Seamless Edge-to-Edge with Zero Margins) */}
            <a
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 sm:py-4 px-4 bg-primary hover:bg-[#256629] active:bg-[#1e5321] text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-colors cursor-pointer text-center select-none"
            >
              <span>상담예약하러 가기</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            {/* Bottom Footer Bar (Zero Margin, Flush with CTA) */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 bg-slate-950 text-slate-300 text-xs sm:text-sm select-none border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => handleClosePopup1(true)}
                className="hover:text-white flex items-center gap-2 transition-colors cursor-pointer group py-1 text-left"
              >
                <input
                  type="checkbox"
                  id="dontShowTodayCheck1"
                  checked={dontShowToday1}
                  onChange={(e) => {
                    setDontShowToday1(e.target.checked);
                    if (e.target.checked) {
                      handleClosePopup1(true);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 rounded text-primary border-slate-600 bg-slate-800 cursor-pointer accent-[#2E7D32]"
                />
                <span className="group-hover:underline">오늘 하루 보지 않기</span>
              </button>

              <button
                type="button"
                onClick={() => handleClosePopup1(false)}
                className="hover:text-white font-medium px-2 py-1 transition-colors cursor-pointer hover:underline"
              >
                창 닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {activePopup === 2 && (
        <div
          key="popup-2"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-[2px] overflow-y-auto"
          onClick={() => handleClosePopup2(false)}
          aria-modal="true"
          role="dialog"
          aria-label="방송 출연 및 강연 활동 안내 팝업"
        >
          {/* Popup 2 Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[560px] lg:max-w-[640px] bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button (floating) */}
            <button
              type="button"
              onClick={() => handleClosePopup2(false)}
              className="absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/65 hover:bg-black/90 text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer shadow-lg"
              aria-label="팝업 닫기"
            >
              <X className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            </button>

            {/* Poster Image (Zero Margins, Full-bleed, Clickable to Media Page) */}
            <Link
              to="/about/media"
              onClick={handleMediaLinkClick}
              className="relative w-full block cursor-pointer group"
              title="방송 출연 · 강연 기록보기"
            >
              <img
                src={POPUP_IMAGE_URL_2}
                alt="주요 방송 언론 보도 및 강연 포스터"
                className="w-full h-auto block select-none"
                loading="eager"
              />
            </Link>

            {/* CTA Broadcast/Lecture Button (Seamless Edge-to-Edge with Zero Margins) */}
            <Link
              to="/about/media"
              onClick={handleMediaLinkClick}
              className="w-full py-3.5 sm:py-4 px-4 bg-secondary hover:bg-[#0d47a1] active:bg-[#0a387e] text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-colors cursor-pointer text-center select-none"
            >
              <Tv className="w-5 h-5" />
              <span>방송 출연 · 강연 기록보기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Bottom Footer Bar (Zero Margin, Flush with CTA) */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 bg-slate-950 text-slate-300 text-xs sm:text-sm select-none border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => handleClosePopup2(true)}
                className="hover:text-white flex items-center gap-2 transition-colors cursor-pointer group py-1 text-left"
              >
                <input
                  type="checkbox"
                  id="dontShowTodayCheck2"
                  checked={dontShowToday2}
                  onChange={(e) => {
                    setDontShowToday2(e.target.checked);
                    if (e.target.checked) {
                      handleClosePopup2(true);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 rounded text-secondary border-slate-600 bg-slate-800 cursor-pointer accent-[#1565C0]"
                />
                <span className="group-hover:underline">오늘 하루 보지 않기</span>
              </button>

              <button
                type="button"
                onClick={() => handleClosePopup2(false)}
                className="hover:text-white font-medium px-2 py-1 transition-colors cursor-pointer hover:underline"
              >
                창 닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
