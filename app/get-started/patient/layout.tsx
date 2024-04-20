"use client";
import GetStartedLayout from '@/app/components/layouts/get-started-layout';

var steps = [
  { id: '01', name: 'Personal Information', href: '/get-started/patient/personal' },
  { id: '02', name: 'Transer Prescriptions', href: '/get-started/patient/transfer' },
  { id: '03', name: 'Clinical Preferences', href: '/get-started/patient/clinical' },
  { id: '04', name: 'Insurances Details', href: '/get-started/patient/insurance' },
  { id: '05', name: 'Payment Details', href: '/get-started/patient/payment' },
  { id: '06', name: 'Review', href: '/get-started/patient/complete' },
]

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <GetStartedLayout steps={steps}>
      {children}
    </GetStartedLayout>
  );
}
