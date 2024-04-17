import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link
        type="button"
        href="get-started/patient/personal"
        className="w-64 h-64 bg-indigo-50 rounded-lg text-lg font-semibold text-indigo-600 shadow-lg hover:bg-indigo-100 flex justify-center items-center mx-4"
      >
        I am a new patient
      </Link>
      <br />
      <Link
        type="button"
        href="get-started/pharmacist"
        className="w-64 h-64 bg-indigo-50 rounded-lg text-lg font-semibold text-indigo-600 shadow-lg hover:bg-indigo-100 flex justify-center items-center mx-4"      >
        I am a new pharmacist
      </Link>
    </div>)
}