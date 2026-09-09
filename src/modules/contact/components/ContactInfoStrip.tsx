import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';
import {
  STUDIO_ADDRESS_MULTILINE,
  STUDIO_DIRECTIONS_URL,
} from '@/data/salonData';

export const ContactInfoStrip: React.FC = () => {
  const iconCls = 'w-6 h-6 sm:w-7 sm:h-7 text-[#E8329D]';
  const iconStroke = 1.5;
  const contactCards = [
    {
      id: 'call',
      title: 'Call Us',
      primary: '080-48531999',
      href: 'tel:08048531999',
      subtitle: "We're happy to help",
      icon: <Phone className={iconCls} strokeWidth={iconStroke} />,
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Us',
      primary: '8310782820',
      href: 'https://wa.me/918310782820',
      subtitle: 'Quick response',
      icon: <WhatsAppIcon className={iconCls} />,
    },
    {
      id: 'email',
      title: 'Email Us',
      primary: 'info@varvadhustudio.com',
      href: 'mailto:info@varvadhustudio.com',
      subtitle: "We'll get back to you soon",
      icon: <Mail className={iconCls} strokeWidth={iconStroke} />,
    },
    {
      id: 'visit',
      title: 'Visit Us',
      primary: STUDIO_ADDRESS_MULTILINE,
      href: STUDIO_DIRECTIONS_URL,
      subtitle: 'Come say hello!',
      icon: <MapPin className={iconCls} strokeWidth={iconStroke} />,
    },
    {
      id: 'hours',
      title: 'Working Hours',
      primary: 'Tue - Sun\n10:00 AM - 8:00 PM',
      href: null,
      subtitle: 'Monday Holiday!',
      icon: <Clock className={iconCls} strokeWidth={iconStroke} />,
    },
  ];

  return (
    <section className="relative z-10 bg-[#FCFCFC] pt-6 sm:pt-10 lg:pt-12 pb-10 sm:pb-12 lg:pb-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 xl:gap-3 items-stretch">
          {contactCards.map((card) => {
            const isEmail = card.id === 'email';
            const Content = (
              <div className="h-full flex flex-col items-center text-center px-4 py-5 sm:py-6 sm:p-6 bg-[#FFFAFD] rounded-2xl border border-[#F8D9E8] shadow-[0_6px_24px_rgba(80,0,70,0.05)] hover:shadow-[0_14px_38px_rgba(80,0,70,0.12)] hover:-translate-y-1 transition-all duration-300 group min-w-0">
                {/* Bare thin pink icon — no circle badge, like reference */}
                <div className="mb-2.5 sm:mb-3 flex items-center justify-center shrink-0">
                  {card.icon}
                </div>

                {/* Title — normal case, dark */}
                <h3 className="text-[13px] sm:text-[14px] font-semibold text-[#2D0A2E] mb-1">
                  {card.title}
                </h3>

                {/* Primary Detail — bold black */}
                <div className="flex-1 flex items-start justify-center w-full min-w-0">
                  <p className={`text-[13px] sm:text-[13.5px] font-bold text-black leading-[1.55] whitespace-pre-line max-w-full ${isEmail ? 'break-all' : 'break-words'}`}>
                    {card.primary}
                  </p>
                </div>

                {/* Subtitle — small grey, pinned to bottom so all cards align */}
                <p className="text-[11px] sm:text-[11.5px] text-[#8A7A88] mt-auto pt-2.5 sm:pt-3 leading-snug px-1">
                  {card.subtitle}
                </p>
              </div>
            );

            const spanCls =
              'block h-full min-w-0 sm:last:col-span-2 lg:last:col-span-1 xl:last:col-span-1';

            if (card.href) {
              return (
                <a
                  key={card.id}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                  className={`${spanCls} cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D91A8A]/30 rounded-2xl`}
                >
                  {Content}
                </a>
              );
            }

            return (
              <div key={card.id} className={spanCls}>
                {Content}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
