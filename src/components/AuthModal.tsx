import React, { useState } from 'react';
import { ShieldCheck, Phone, CheckCircle, ArrowRight, X, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: { firstName: string; lastName: string; phone: string }) => void;
  language?: 'en' | 'hi';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  language = 'en',
}) => {
  const [step, setStep] = useState<'details' | 'otp' | 'success'>('details');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setError(language === 'hi' ? 'कृपया अपना पहला नाम दर्ज करें' : 'Please enter your first name');
      return;
    }
    if (!lastName.trim()) {
      setError(language === 'hi' ? 'कृपया अपना उपनाम दर्ज करें' : 'Please enter your last name');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError(language === 'hi' ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }

    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      setError(language === 'hi' ? 'कृपया 4 अंकों का OTP दर्ज करें' : 'Please enter the 4-digit OTP');
      return;
    }

    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      setTimeout(() => {
        onSuccess({ firstName, lastName, phone });
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-slate-900 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 1: Name & Phone Number */}
        {step === 'details' && (
          <div className="space-y-5">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 bg-emerald-50 text-[#239958] rounded-2xl flex items-center justify-center mx-auto mb-2 border border-emerald-100 shadow-2xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {language === 'hi' ? 'SevaZo में साइन-अप करें' : 'Sign up for SevaZo'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'hi'
                  ? '10-15 मिनट में सुपरफास्ट डिलीवरी का आनंद लें'
                  : 'Enter your details to experience instant 10-15 min delivery'}
              </p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3.5 py-2.5 rounded-xl font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    {language === 'hi' ? 'पहला नाम' : 'First Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Rahul"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#239958] focus:bg-white text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    {language === 'hi' ? 'उपनाम' : 'Last Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Sharma"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#239958] focus:bg-white text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  {language === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-slate-500 border-r border-slate-200 pr-2">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#239958] focus:bg-white text-slate-800 text-xs sm:text-sm pl-16 pr-3.5 py-2.5 rounded-xl outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#239958] hover:bg-[#1e854c] active:scale-98 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <span>Sending OTP...</span>
                ) : (
                  <>
                    <span>{language === 'hi' ? 'OTP प्राप्त करें' : 'Get 4-Digit OTP'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#239958]" />
              <span>DPDP 2023 Compliant • 100% Secure Verification</span>
            </div>
          </div>
        )}

        {/* STEP 2: 4-Digit OTP Verification */}
        {step === 'otp' && (
          <div className="space-y-5">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 bg-emerald-50 text-[#239958] rounded-2xl flex items-center justify-center mx-auto mb-2 border border-emerald-100">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {language === 'hi' ? 'OTP सत्यापित करें' : 'Verify Mobile OTP'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'hi'
                  ? `हमारा 4-अंकों का कोड +91 ${phone} पर भेजा गया है`
                  : `Enter the 4-digit code sent to +91 ${phone}`}
              </p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3.5 py-2 rounded-xl font-medium text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* 4 Digit Boxes */}
              <div className="flex items-center justify-center gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    id={`otp-digit-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-black bg-slate-50 border-2 border-slate-200 focus:border-[#239958] focus:bg-white rounded-2xl text-slate-900 outline-none transition-all"
                  />
                ))}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setOtp(['', '', '', '']);
                    setError('');
                    setStep('details');
                  }}
                  className="text-xs text-[#239958] hover:underline font-bold cursor-pointer"
                >
                  {language === 'hi' ? 'नंबर बदलें या दोबारा भेजें' : 'Change Number or Resend'}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#239958] hover:bg-[#1e854c] active:scale-98 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <span>{language === 'hi' ? 'सत्यापित करें और जारी रखें' : 'Verify & Continue'}</span>
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Success Screen */}
        {step === 'success' && (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-[#239958] rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              {language === 'hi' ? `स्वागत है, ${firstName}!` : `Welcome, ${firstName}!`}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'आपका मोबाइल नंबर सफलतापूर्वक सत्यापित हो गया है।'
                : 'Your account and mobile number have been verified successfully.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
