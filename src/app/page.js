"use client";
import { useState, useEffect, useRef } from "react";
import AladinViewer from "@/components/AladinViewer";
import HRDiagramMain from "@/components/ClusterHRAnalysis/HRDiagramMain";
import HRAMain from "@/components/HubbleRedshiftAnalysis/HRAMain";
import { HRPlotProvider } from "@/context/HRPlotContext";


const exercises = [
  { label: "Select Exercise...", value: "" },
  { label: "HR Diagram Analysis of Star Clusters", value: "HRDiagram" },
  { label: "Hubble Redshift-Distance Relation", value: "HRA" },
];


export default function Home() {

  const [selectedExercise, setSelectedExercise] = useState("");

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // exercise Rendering & scrolling
  const exerciseContainerRef = useRef(null);

  useEffect(() => {
    if (!selectedExercise) return;

    const raf = requestAnimationFrame(() => {
      const el = exerciseContainerRef.current;
      if (!el) return;


      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      
      const OFFSET = 16; 
      const y = el.getBoundingClientRect().top + window.scrollY - OFFSET;

      window.scrollTo({ top: y, behavior: prefersReduced ? "auto" : "smooth" });


      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(raf);

  }, [selectedExercise]);

  const renderExerciseComponent = () => {
    switch (selectedExercise) {
      case "HRDiagram":
        return (
          <HRPlotProvider>
            <HRDiagramMain />
          </HRPlotProvider>
        );
      case "HRA":
        return (<HRAMain />);
      default:
        return null;
    }
  };
  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold text-2xl">
            Interactive Astro Practical Hub
          </h1>
          <p className="text-sm text-center sm:text-left max-w-prose font-[family-name:var(--font-geist-mono)]">
            Welcome to the Astro Practical App! <br />This tool guides you through astronomy lab exercises.
          </p>
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Start by selecting an exercise from the dropdown below.
            </li>
            <li>Follow the guided steps provided for each exercise.</li>
          </ol>



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

          {/* AladinViewer */}
          <div className="w-full flex justify-center mb-10">
            <AladinViewer />
          </div>

          <div
            ref={exerciseContainerRef}
            className="w-full scroll-mt-24 outline-none"
            aria-live="polite">

            {renderExerciseComponent()}
          </div>




          <div className="h-32" />

        </main>
        <footer className="row-start-3 flex flex-col items-center justify-center text-xs text-center text-gray-500 dark:text-gray-400 gap-2 px-4">
          <p>
            This tool is currently in <strong>beta</strong>. Functionality and content may change.
          </p>
          <p>
            If you encounter issues or have feedback, please contact your tutor or lab demonstrator.
          </p>
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
