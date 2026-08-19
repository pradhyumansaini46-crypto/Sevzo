import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, FileText, X, Award } from 'lucide-react';
import { Language } from '../types';

interface SecurityComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SecurityComplianceModal: React.FC<SecurityComplianceModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-slate-900">
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                {language === 'hi' ? 'सुरक्षा व कानूनी अनुपालन' : 'Security & Compliance Standards'}
              </h2>
              <p className="text-[11px] text-emerald-700 font-semibold">
                DPDP Act 2023 (India) & FSSAI Compliant
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-slate-600 max-h-[75vh] overflow-y-auto leading-relaxed">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 text-emerald-600" />
              Digital Personal Data Protection (DPDP) Act 2023
            </h3>
            <p className="text-[11px] text-slate-600">
              All user profile information, contact numbers, and delivery GPS coordinates in Neemrana are encrypted with AES-256 at rest and TLS 1.3 in transit. PII is automatically masked in internal operational logs.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-emerald-600" />
              10-Minute Pharmacy & Drug License Standards
            </h3>
            <p className="text-[11px] text-slate-600">
              Prescription and OTC pharmaceuticals are fulfilled exclusively through state-licensed retail pharmacies (Rajasthan Pharmacy Council License #RJ-ALW-20B-39182) with tamper-evident, cold-chain compliant packaging.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-emerald-600" />
              FSSAI Food Safety Central Certification
            </h3>
            <p className="text-[11px] text-slate-600">
              Fresh farm vegetables, dairy, flours, and imported Japanese groceries are inspected daily under FSSAI license #12221027000189 for hygiene and freshness.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Police & Aadhaar-Verified Delivery Fleet
            </h3>
            <p className="text-[11px] text-slate-600">
              100% of gig delivery partners and home service technicians in Neemrana undergo Aadhaar eKYC, digital background verification, and contactless OTP delivery handover protocols.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs shadow-2xs cursor-pointer transition-all"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
