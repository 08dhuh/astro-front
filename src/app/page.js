"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import AladinViewer from "@/components/AladinViewer";
import HRDiagramMain from "@/components/ClusterHRAnalysis/HRDiagramMain";
import { HRPlotProvider } from "@/context/HRPlotContext";


const exercises = [
  { label: "Select Exercise...", value: "" },
  { label: "HR Diagram", value: "HRDiagram" },
];


export default function Home() {

  const [selectedExercise, setSelectedExercise] = useState("");

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const renderExerciseComponent = () => {
    switch (selectedExercise) {
      case "HRDiagram":
        return (
          <HRPlotProvider>
            <HRDiagramMain />
          </HRPlotProvider>
        );
      default:
        return null;
    }
  };
  return (
    <>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold text-2xl">Astro Prac Instructions</h1>

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by selecting exercises{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li>Follow the lab guides after selecting exercises.</li>
        </ol>

        {/* AladinViewer */}
        <div className="w-full flex justify-center">
          <AladinViewer />
        </div>

        {/* Exercises */}
        <select
          className="rounded border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black px-4 py-2 text-sm sm:text-base"
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          {exercises.map((exercise) => (
            <option key={exercise.value} value={exercise.value}>
              {exercise.label}
            </option>
          ))}
        </select>

        {renderExerciseComponent()}

        

        <div className="flex gap-4 items-center flex-col sm:flex-row">

          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More...
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Docs
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>

      </footer>
      {showScroll && (
        <button
          className="fixed bottom-10 right-10 bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top ▲
        </button>
      )}
    </div>
    </>
  );
}
