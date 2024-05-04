import { Route } from "next";
import Link from "next/link";

const learnLink = [
    { question: "What is Diabetes / Obesity?", href: "/" },
    { question: "What is Arthritis?", href: "/" },
    { question: "What is Chronic Kidney Disease?", href: "/" },
    { question: "What is Chronic Obstructive Pulmonary Disease?", href: "/" },
    { question: "What is Cadiovascular Disease?", href: "/" },
    { question: "FAQs", href: "/" },
]

export default function Page() {
    return (<div className="flex justify-center">
        <div className="flex flex-wrap justify-center">
            {learnLink.map(learn => {
                return (
                    <Link
                        key={learn.question}
                        type="button"
                        href={learn.href as Route}
                        className="w-64 h-64 bg-indigo-50 rounded-lg text-lg text-center font-semibold text-indigo-600 shadow-lg hover:bg-indigo-100 flex justify-center items-center mx-4 mb-4"
                    >
                        {learn.question}
                    </Link>
                )
            })}

        </div>
    </div>);
}