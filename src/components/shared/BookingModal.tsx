import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Clock, User, Phone, Mail, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SERVICES_DATA, type ServiceItem } from '@/data/salonData';
import { getLenisInstance } from '@/lib/lenis';
import { getUtmParams } from '@/lib/utm';
import { useSubmitEnquiry } from '@/modules/home/hooks/useEnquiry';

/** Digits only, capped at 10. */
const normalizePhone = (raw: string): string => raw.replace(/\D/g, '').slice(0, 10);

/** Indian 10-digit mobile validation (starts 6-9). */
const isValidPhone = (raw: string): boolean => /^[6-9]\d{9}$/.test(normalizePhone(raw));

/** Convert "HH:MM" (24h) from <input type="time"> to "h:MM AM/PM". */
const to12h = (hhmm: string): string => {
  const [hStr, mStr] = hhmm.split(':');
  const h = Number(hStr);
  if (!hhmm || Number.isNaN(h)) return hhmm;
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mStr ?? '00'} ${suffix}`;
};

/** Today's date as local YYYY-MM-DD for <input type="date" min={...}> comparisons. */
const todayISO = (): string => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};

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
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const today = todayISO();

  const { mutateAsync: submitEnquiry, isPending } = useSubmitEnquiry();

  // Render-phase state adjustment for modal open and initialService changes
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [prevInitialServiceId, setPrevInitialServiceId] = useState(initialService?.id);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIsSubmitted(false);
      setSubmitError(null);
      setPhoneError(null);
      setDateError(null);
      if (initialService) {
        setSelectedService(initialService.id);
        setPrevInitialServiceId(initialService.id);
      }
    }
  } else if (isOpen && initialService?.id !== prevInitialServiceId) {
    setPrevInitialServiceId(initialService?.id);
    if (initialService) {
      setSelectedService(initialService.id);
    }
  }

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

  // Dismiss on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentServiceObj = SERVICES_DATA.find((s) => s.id === selectedService);

  /** Live input guard: digits only, hard stop at 10. */
  const handlePhoneChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(digits);
    if (phoneError && isValidPhone(digits)) setPhoneError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !email.trim()) return;
    if (!isValidPhone(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!bookingDate || bookingDate < today) {
      setDateError('Please choose today or a future date.');
      return;
    }
    setPhoneError(null);
    setDateError(null);
    setSubmitError(null);
    const utm = getUtmParams();
    try {
      await submitEnquiry({
        enquiryFullName: fullName.trim(),
        enquiryEmail: email.trim(),
        enquiryMobile: normalizePhone(phoneNumber),
        enquiryProduct: currentServiceObj ? `Booking - ${currentServiceObj.title}` : 'Website Enquiry',
        enquiryMessage: [
          currentServiceObj ? `Service: ${currentServiceObj.title} (${currentServiceObj.tagline})` : null,
          bookingDate ? `Preferred Date: ${bookingDate}` : null,
          selectedTime ? `Preferred Time: ${to12h(selectedTime)}` : null,
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
      aria-label="Book an appointment"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#3D003D] to-[#85006F] text-white p-6 relative">
          <button
            type="button"
            onClick={resetAndClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
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
        <div className="p-6 sm:p-7 flex-1 min-h-0 overflow-y-auto" data-lenis-prevent>
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
                    min={today}
                    value={bookingDate}
                    onChange={(e) => {
                      setBookingDate(e.target.value);
                      if (e.target.value && e.target.value >= today) setDateError(null);
                    }}
                    className={`w-full px-3.5 py-2 rounded-xl border text-sm text-[#40363F] focus:outline-none focus:ring-2 ${
                      dateError ? 'border-[#E11D48] focus:ring-[#E11D48]' : 'border-[#E8DCE5] focus:ring-[#D91A8A]'
                    }`}
                  />
                  {dateError && <p className="mt-1.5 text-xs text-[#E11D48]">{dateError}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C182A] mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#A80086]" /> Preferred Time
                  </label>
                  <input
                    type="time"
                    required
                    value={selectedTime}
                    min="10:00"
                    max="20:30"
                    step={1800}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DCE5] text-sm text-[#40363F] focus:outline-none focus:ring-2 focus:ring-[#D91A8A] bg-white cursor-pointer"
                  />
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
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#40363F] focus:outline-none focus:ring-2 ${
                      phoneError ? 'border-[#E11D48] focus:ring-[#E11D48]' : 'border-[#E8DCE5] focus:ring-[#D91A8A]'
                    }`}
                  />
                  {phoneError && <p className="mt-1.5 text-xs text-[#E11D48]">{phoneError}</p>}
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
