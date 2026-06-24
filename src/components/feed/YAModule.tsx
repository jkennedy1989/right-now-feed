"use client";

import { ArrowRight } from "lucide-react";

const prompts = [
  "🛍️ Vintage thrifting & natural wine 🍷",
  "Japandi design & matcha cafes 🍵",
  "Speakeasy & live jazz tonight 🎷",
];

const YAIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_ya)">
      <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#FFECEC"/>
      <path d="M18.4645 16.8657C16.7867 16.5055 15.476 15.1948 15.1158 13.517L14.9276 12.6405C14.8406 12.2352 14.4824 11.9458 14.0679 11.9458C13.6534 11.9458 13.2951 12.2352 13.2081 12.6405L13.02 13.517C12.6597 15.1948 11.3491 16.5055 9.67121 16.8657L8.79475 17.0539C8.38947 17.1409 8.1 17.4991 8.1 17.9137C8.1 18.3282 8.38947 18.6864 8.79475 18.7734L9.67121 18.9616C11.3491 19.3218 12.6597 20.6325 13.02 22.3103L13.2081 23.1868C13.2951 23.5921 13.6534 23.8815 14.0679 23.8815C14.4824 23.8815 14.8406 23.5921 14.9276 23.1868L15.1158 22.3103C15.476 20.6325 16.7867 19.3218 18.4645 18.9616L19.341 18.7734C19.7463 18.6864 20.0358 18.3282 20.0358 17.9137C20.0358 17.4991 19.7463 17.1409 19.341 17.0539L18.4645 16.8657Z" fill="#FA4848"/>
      <path d="M23.0851 13.3192C22.2149 13.1323 21.5351 12.4525 21.3483 11.5823L21.2507 11.1278C21.2055 10.9176 21.0198 10.7674 20.8048 10.7674C20.5898 10.7674 20.404 10.9176 20.3589 11.1278L20.2613 11.5823C20.0744 12.4525 19.3947 13.1323 18.5245 13.3192L18.0699 13.4168C17.8597 13.4619 17.7095 13.6477 17.7095 13.8627C17.7095 14.0776 17.8597 14.2634 18.0699 14.3086L18.5245 14.4062C19.3947 14.593 20.0744 15.2728 20.2613 16.143L20.3589 16.5976C20.404 16.8077 20.5898 16.9579 20.8048 16.9579C21.0198 16.9579 21.2055 16.8077 21.2507 16.5976L21.3483 16.143C21.5351 15.2728 22.2149 14.593 23.0851 14.4062L23.5397 14.3086C23.7499 14.2634 23.9 14.0776 23.9 13.8627C23.9 13.6477 23.7499 13.4619 23.5397 13.4168L23.0851 13.3192Z" fill="#FA4848"/>
      <path d="M18.4413 9.90462C17.8322 9.77384 17.3563 9.29801 17.2255 8.68888L17.1572 8.37068C17.1256 8.22355 16.9956 8.11846 16.8451 8.11846C16.6946 8.11846 16.5646 8.22355 16.533 8.37068L16.4647 8.68888C16.3339 9.29801 15.8581 9.77384 15.2489 9.90462L14.9307 9.97293C14.7836 10.0045 14.6785 10.1346 14.6785 10.2851C14.6785 10.4355 14.7836 10.5656 14.9307 10.5972L15.2489 10.6655C15.8581 10.7963 16.3339 11.2721 16.4647 11.8812L16.533 12.1994C16.5646 12.3466 16.6946 12.4517 16.8451 12.4517C16.9956 12.4517 17.1256 12.3466 17.1572 12.1994L17.2255 11.8812C17.3563 11.2721 17.8322 10.7963 18.4413 10.6655L18.7595 10.5972C18.9066 10.5656 19.0117 10.4355 19.0117 10.2851C19.0117 10.1346 18.9066 10.0045 18.7595 9.97293L18.4413 9.90462Z" fill="#FA4848"/>
    </g>
    <defs>
      <clipPath id="clip0_ya">
        <rect width="32" height="32" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export function YAModule() {
  return (
    <div className="py-7" style={{ background: "linear-gradient(45deg, #FFFFFF, #F7C4C4, #CDC2FF)" }}>
      <div className="px-4 mb-3 flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ListGenerator.gif" alt="" className="w-6 h-6" />
        <h2 className="text-base font-bold text-gray-900">Try generating your own list</h2>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 w-max">
          {prompts.map((prompt) => (
            <div key={prompt} className="w-[180px] h-[120px] flex-shrink-0 bg-white rounded-[16px] border border-transparent hover:border-gray-300 shadow-sm p-3.5 flex flex-col justify-between cursor-pointer transition-all">
              <p className="text-[13px] font-semibold text-gray-800 leading-snug">{prompt}</p>
              <div className="flex justify-end">
                <YAIcon />
              </div>
            </div>
          ))}
          {/* CTA card */}
          <div className="w-[180px] h-[120px] flex-shrink-0 bg-white rounded-[16px] border border-transparent hover:border-gray-300 shadow-sm p-3.5 flex flex-col justify-between cursor-pointer transition-all">
            <p className="text-[13px] font-normal text-gray-400 leading-snug">Dream up anything...</p>
            <div className="flex justify-end">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <ArrowRight size={16} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
