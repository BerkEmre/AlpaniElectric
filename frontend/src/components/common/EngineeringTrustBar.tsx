import React from 'react';
import { Microscope, Sliders, ShieldCheck, Headphones } from 'lucide-react';

export const EngineeringTrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: Microscope,
      title: '10+ Years R&D Lab',
      sub: 'In-house Type-C goniophotometer, thermal FEA simulation chamber, and spectral spheres.',
    },
    {
      icon: Sliders,
      title: 'Bespoke Optical Eng.',
      sub: 'Proprietary TIR collimators, micro-prismatic arrays, and custom 6063-T6 aluminum CNC.',
    },
    {
      icon: ShieldCheck,
      title: 'CE, RoHS & ENEC',
      sub: 'Tested strictly to European architectural standards with certified laboratory photometrics.',
    },
    {
      icon: Headphones,
      title: '24h DIALux Support',
      sub: 'Dedicated specifier engineering liaison, accurate IES / LDT dataset feeds, and Revit families.',
    },
  ];

  return (
    <section className="w-full bg-[#121316] border-b border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#27272A]">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`py-3 md:py-0 ${
                  idx === 0
                    ? 'md:pr-6'
                    : idx === 3
                    ? 'md:pl-6'
                    : 'md:px-6'
                } flex flex-col gap-1.5`}
              >
                <div className="flex items-center gap-2 text-[#E5B86E]">
                  <Icon className="w-4 h-4 text-[#E5B86E] shrink-0" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F8F9FA] font-semibold">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs text-[#9c8f7f] leading-snug font-light">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
