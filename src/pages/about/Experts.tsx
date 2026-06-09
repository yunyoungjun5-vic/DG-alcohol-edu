import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const expertGroups = [
  // 1행 2열
  [
    {
      name: "윤영준 대표원장",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1776971442/dec5ff46-df87-4bb0-8b0d-d90f1cd06d5d_cxd8uj.png",
      title: "대표원장 / 중독, 범죄 전문 심리상담가",
      desc: "음주운전 심리 및 재범방지 전문가.",
      roles: "상담학 박사 / 국제 임상최면치료사",
    },
    {
      name: "소윤주 부원장",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774347139/KakaoTalk_20240521_123825759_gslvpg.jpg",
      title: "부원장 / 기능의학 전문가",
      desc: "알코올 의존 및 행동 수정 전문가.",
      roles: "기능의학 / 최면 / 성상담 전문가",
    },
  ],
  // 2행 3열
  [
    {
      name: "허선무 변호사",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1776971435/3e1b3bd6-c219-4e70-b259-e535e502df92_elrt12.png",
      title: "법무법인 소울 변호사 / 음주운전 사건 전문 변호사",
      desc: "전문적인 법률 자문 및 대응 전략 지원.",
      roles: "현재 법무법인 소울 변호사 / 창원지방법원 조정위원",
    },
    {
      name: "강주오 변호사",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1776971476/73290c9b-6542-4f47-9ea0-ec8be1861807_plqybw.png",
      title: "법무법인 로하스 대표변호사",
      desc: "음주운전 및 형사 사건, 구미시 고문변호사로 활동 중입니다.",
      roles:
        "現 법무법인 로하스 대표변호사 / 경북도청 법률상담관 / 구미시 법률 상담관 / 구미시의회 고문변호사",
    },
    {
      name: "백진욱 변호사",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1777026382/bfb4a67d-9cf5-410b-9338-7f76ed3b73b9-md_qycut4.jpg",
      title: "법무법인 로하스 변호사",
      desc: "음주운전 및 형사 사건 전문 법률 조력자.",
      roles: "現 법무법인 로하스 변호사",
    },
  ],
  // 3행 2열
  [
    {
      name: "문영애 교수",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779201676/%EB%AC%B8%EC%98%81%EC%95%A0_%EA%B5%90%EC%88%981_q9eo9t.png",
      title: "상담심리학 박사 / 한국신체심리치료 연구소 대표",
      desc: "음주 문제 해결을 위한 신체심리 회복 및 휄든크라이스 전문가.",
      roles:
        "상담심리학 박사 / 한국신체심리치료 연구소 대표 / 휄든크라이스 전문가",
    },
    {
      name: "이제승 교수",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779153823/%EC%9D%B4%EC%A0%9C%EC%8A%B9_%EA%B5%90%EC%88%98_gkluyp.jpg",
      title: "국제마음치유연구원 원장 / 심리상담학과 교수",
      desc: "체계적인 마음치유 프로그램으로 재범 방지를 조력합니다.",
      roles:
        "국제마음치유연구원 원장 / 심리상담학과 교수 / 한국심리상담전문학회 학회장",
    },
  ],
  // 4행 3열
  [
    {
      name: "이희철 교수",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779201660/%EC%9D%B4%ED%9D%AC%EC%B2%A0_%EA%B5%90%EC%88%98_1_lvwzev.png",
      title: "상담심리 전문가 / 심리학 교수",
      desc: "음주운전 가해자 인지행동 교정 및 상담 프로그램 연구.",
      roles: "상담심리 전문가 / 심리학 교수",
    },
    {
      name: "유보경 선생님",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779201666/%EC%9C%A0%EB%B3%B4%EA%B2%BD_%EC%84%A0%EC%83%9D%EB%8B%98_2_lobfoq.png",
      title: "상담심리 전문가 / 성인 교육 강사",
      desc: "음주운전 예방 및 재발 방지를 위한 심리 교육 전문가.",
      roles: "상담심리 전문가 / 성인 교육 강사",
    },
    {
      name: "윤송이 선생님",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779201655/%EC%9C%A4%EC%86%A1%EC%9D%B4_%EC%84%A0%EC%83%9D%EB%8B%98_2_q34upo.png",
      title: "상담심리 전문가 / 재범방지 교육 강사",
      desc: "인지행동치료 기반의 음주운전 감수성 향상 교육.",
      roles: "상담심리 전문가 / 재범방지 교육 강사",
    },
  ],
  // 5행 3열
  [
    {
      name: "전경숙 선생님",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779198673/%EC%A0%84%EA%B2%BD%EC%88%99_%EC%84%A0%EC%83%9D%EB%8B%98_hctbka.png",
      title: "상담심리 전문가 / 중독 상담사",
      desc: "음주 습관 분석 및 알코올 중독 문제 해결을 위한 전문 심리 상담.",
      roles: "상담심리 전문가 / 중독 상담사 / 성상담 전문가",
    },
    {
      name: "박경실 선생님",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779200461/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_19%EC%9D%BC_%EC%98%A4%ED%9B%84_11_20_53_jagksr.png",
      title: "상담심리 전문가 / 청소년 상담사",
      desc: "내담자의 심리적 안정과 긍정적 행동 변화 지원.",
      roles: "상담심리 전문가 / 청소년 상담사",
    },
    {
      name: "강민경 선생님",
      image:
        "https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779198673/%EA%B0%95%EB%AF%BC%EA%B2%BD_%EC%84%A0%EC%83%9D%EB%8B%98_2_bganyn.bmp",
      title: "상담심리 전문가 / 교육 강사",
      desc: "심리 정서적 지지를 통한 자존감 회복 및 재발 방지 상담.",
      roles: "가족학 석사 / 부모, 가족 교육 강사",
    },
  ],
];

export const Experts = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      {/* Header Area */}
      <div className="bg-emerald-50/50 py-16 mb-20 border-y border-emerald-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              상담전문가
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mx-auto break-keep">
              대구 음주운전 재범방지 교육심리상담센터는 단순한 처벌이 아닌 행동
              변화와 재범 방지를 목표로 합니다.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
            음주운전 특화 전문가 그룹
          </h2>
          <p className="text-slate-500 font-medium">
            단순 심리상담사가 아닌, 구조적 개입과 행동 교정의 전문가들이
            함께합니다.
          </p>
        </motion.div>

        <div className="space-y-16 lg:space-y-24">
          {expertGroups.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className="flex flex-wrap justify-center gap-8 lg:gap-12"
            >
              {group.map((expert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col items-center text-center w-full sm:w-[calc(50%-2rem)] md:w-[calc(33.333%-2rem)] lg:w-[calc(33.333%-3rem)] max-w-sm"
                >
                  <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-xl shadow-slate-200/50 border-4 border-white group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 break-keep">
                    {expert.name}
                  </h3>
                  <p className="text-primary font-bold text-sm mb-2 break-keep">
                    {expert.title}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-2 break-keep">
                    {expert.desc}
                  </p>
                  <p className="text-slate-400 text-xs tracking-tight break-keep">
                    {expert.roles.split(" / ").map((role, i) => (
                      <React.Fragment key={i}>
                        {role}
                        {i !== expert.roles.split(" / ").length - 1 && (
                          <span className="inline-block mx-1">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/about/location"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2"
          >
            <MapPin size={20} />
            오시는 길 안내
          </Link>
        </div>
      </div>
    </div>
  );
};
