import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Clock, User, Phone, Mail, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SERVICES_DATA, type ServiceItem } from '@/data/salonData';
import { getLenisInstance } from '@/lib/lenis';
import { getUtmParams } from '@/lib/utm';
import { useSubmitEnquiry } from '@/modules/home/hooks/useEnquiry';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [selectedService, setSelectedService] = useState<string>(
    initialService ? initialService.id : SERVICES_DATA[0].id
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { mutateAsync: submitEnquiry, isPending } = useSubmitEnquiry();

  useEffect(() => {
    if (isOpen && initialService) {
      setSelectedService(initialService.id);
    }
    if (isOpen) {
      setIsSubmitted(false);
      setSubmitError(null);
    }
  }, [isOpen, initialService]);

  useEffect(() => {
    const lenis = getLenisInstance();
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const timeSlots = [
    '10:30 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
  ];

  const currentServiceObj = SERVICES_DATA.find((s) => s.id === selectedService);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !email.trim()) return;
    setSubmitError(null);
    const utm = getUtmParams();
    try {
      await submitEnquiry({
        enquiryFullName: fullName.trim(),
        enquiryEmail: email.trim(),
        enquiryMobile: phoneNumber.trim(),
        enquiryProduct: currentServiceObj ? `Booking - ${currentServiceObj.title}` : 'Website Enquiry',
        enquiryMessage: [
          currentServiceObj ? `Service: ${currentServiceObj.title} (${currentServiceObj.tagline})` : null,
          bookingDate ? `Preferred Date: ${bookingDate}` : null,
          selectedTime ? `Preferred Time: ${selectedTime}` : null,
        ]
          .filter(Boolean)
          .join(' | '),
        ...utm,
      });
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit enquiry. Please try again.');
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#3D003D] to-[#85006F] text-white p-6 relative">
          <button
            type="button"
            onClick={resetAndClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#F8C1DE] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VV Studio Sanctuary</span>
          </div>

          <h3 className="text-2xl font-display font-medium text-white">
            Book an Appointment
          </h3>
          <p className="text-xs sm:text-sm text-white/80 font-light mt-1">
            Experience our tailored luxury treatments in JP Nagar, Bangalore.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto" data-lenis-prevent>
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#FDEAF4] text-[#D91A8A] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-display font-medium text-[#2C182A] mb-2">
                Booking Confirmed!
              </h4>
              <p className="text-sm text-[#766A73] max-w-xs mx-auto mb-6">
                Thank you, <strong className="text-[#2C182A]">{fullName}</strong>. We've reserved your slot for <span className="font-medium text-[#85006F]">{currentServiceObj?.title}</span>. Our reception team will call <span className="font-medium">{phoneNumber}</span> to confirm details.
              </p>
              <Button variant="primary" size="md" onClick={resetAndClose}>
                Return to Website
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Select Service */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C182A] mb-2">
                  Select Treatment / Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCE5] text-sm text-[#40363F] focus:outline-none focus:ring-2 focus:ring-[#D91A8A] bg-white cursor-pointer"
                >
                  {SERVICES_DATA.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.title} — {srv.tagline} ({srv.startingPrice ? `from ${srv.startingPrice}` : ''})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C182A] mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#A80086]" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8DCE5] text-sm text-[#40363F] focus:outline-none focus:ring-2 focus:ring-[#D91A8A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C182A] mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#A80086]" /> Preferred Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DCE5] text-sm text-[#40363F] focus:outline-none focus:ring-2 focus:ring-[#D91A8A] bg-white cursor-pointer"
                  >
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C182A] mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#A80086]" /> Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DCE5] text-sm text-[#40363F] focus:outline-none focus:ring-2 focus:ring-[#D91A8A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C182A] mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#A80086]" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DCE5] text-sm text-[#40363F] focus:outline-none focus:ring-2 focus:ring-[#D91A8A]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C182A] mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#A80086]" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DCE5] text-sm text-[#40363F] focus:outline-none focus:ring-2 focus:ring-[#D91A8A]"
                />
              </div>

              {submitError && (
                <div className="flex items-start gap-2 rounded-xl bg-[#FDEAF4] border border-[#F8C1DE] px-3.5 py-2.5 text-xs sm:text-sm text-[#A80086]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  withArrow={!isPending}
                  disabled={isPending}
                  className="w-full justify-center shadow-magenta"
                >
                  {isPending ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    'Confirm Reservation'
                  )}
                </Button>
                <p className="text-[11px] text-center text-[#766A73] mt-2">
                  No advance payment needed • Instant confirmation via WhatsApp/SMS
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
