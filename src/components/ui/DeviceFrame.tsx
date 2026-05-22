'use client';

import { ReactNode } from 'react';

export function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="md:flex md:items-center md:justify-center md:min-h-screen md:bg-neutral-100">
      <div className="h-dvh w-full md:w-[393px] md:h-[852px] md:rounded-[3rem] md:border-[6px] md:border-gray-300 md:shadow-[0_25px_60px_rgba(0,0,0,0.12)] md:overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
