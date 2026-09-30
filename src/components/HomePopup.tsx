import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const STORAGE_KEY = "daegu_dui_hide_popup_until";
const RESERVATION_URL =
  "https://map.naver.com/p/entry/place/2056101308?c=15.00,0,0,0,dh&placePath=%2Fticket%3FfromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202607211725%26locale%3Dko%26svcName%3Dmap_pcv5";
const POPUP_IMAGE_URL =
  "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1790737575/ChatGPT_%EC%9D%B4%EB%AF%B8%EC%A7%80_2026%EB%85%84_9%EC%9B%94_30%EC%9D%BC_%EC%98%A4%ED%9B%84_12_03_33_dmdlou.png";

export const HomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    try {
      const hideUntil = localStorage.getItem(STORAGE_KEY);
      if (hideUntil) {
        const hideTimestamp = parseInt(hideUntil, 10);
        if (!isNaN(hideTimestamp) && Date.now() < hideTimestamp) {
          return;
        }
      }
    } catch {
      // LocalStorage access fallback
    }
    setIsOpen(true);
  }, []);

  const setHideTodayInStorage = () => {
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
      localStorage.setItem(STORAGE_KEY, endOfToday.toString());
    } catch {
      // ignore
    }
  };

  const handleClose = () => {
    if (dontShowToday) {
      setHideTodayInStorage();
    }
    setIsOpen(false);
  };

  const handleDoNotShowTodayClick = () => {
    setHideTodayInStorage();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-[2px] overflow-y-auto"
          onClick={handleClose}
          aria-modal="true"
          role="dialog"
          aria-label="안내 팝업"
        >
          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[560px] lg:max-w-[640px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-200/80"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button (floating) */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all backdrop-blur-sm cursor-pointer shadow-md"
              aria-label="팝업 닫기"
            >
              <X className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            </button>

            {/* Poster Image Container */}
            <div className="relative w-full overflow-hidden bg-slate-100 flex items-center justify-center">
              <img
                src={POPUP_IMAGE_URL}
                alt="대구음주운전재범방지교육상담센터 안내"
                className="w-full h-auto object-contain block max-h-[58vh] sm:max-h-[64vh] md:max-h-[74vh] lg:max-h-[78vh]"
                loading="eager"
              />
            </div>

            {/* CTA Reservation Button */}
            <div className="p-3 sm:p-4 md:p-5 bg-white border-t border-slate-100">
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 px-4 bg-primary hover:bg-[#256629] active:bg-[#1e5321] text-white font-bold text-sm sm:text-base md:text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>상담예약하러 가기</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            {/* Bottom Footer Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3.5 bg-slate-900 text-slate-300 text-xs sm:text-sm select-none border-t border-slate-800">
              <button
                type="button"
                onClick={handleDoNotShowTodayClick}
                className="hover:text-white flex items-center gap-2 transition-colors cursor-pointer group py-1 text-left"
              >
                <input
                  type="checkbox"
                  id="dontShowTodayCheck"
                  checked={dontShowToday}
                  onChange={(e) => {
                    setDontShowToday(e.target.checked);
                    if (e.target.checked) {
                      handleDoNotShowTodayClick();
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 rounded text-primary border-slate-600 bg-slate-800 cursor-pointer accent-[#2E7D32]"
                />
                <span className="group-hover:underline">오늘 하루 보지 않기</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
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
