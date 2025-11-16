"use client";
import { useState } from "react";

import LabDataTable from './LabDataTable';
import HubblePlot from './HubblePlot';

export default function Prac() {

  const [rows, setRows] = useState([Array(10).fill("")]);


  const questions = [
    "2. Why might we measure the wavelength of two emission lines per galaxy instead of one?",
    "3. In your spreadsheet, fill out the relevant columns using your recorded apparent magnitudes and the equation log10(D) = (m - M + 5) / 5.",
    "4. How might the apparent recessional velocity of the galaxies affect the wavelength of the light they emit?",
    "5. Why do we call it apparent recessional velocity?",
    "6. Now plot a Hubble diagram by graphing the velocities in km·s⁻¹ (y-axis) vs. the distances in Mpc (x-axis). Fit a linear trendline through the origin. Label your graph and give it a title. Determine the Hubble parameter from your graph and write it below.\n\nYour value for the Hubble Parameter:",
    "7. The current best value for the Hubble Parameter is H₀ = 67.8 km·s⁻¹·Mpc⁻¹. How much does your value differ from this? What factors could have affected your result? How might you improve the accuracy of your result?",
    //"8. Write the equation for time as a function of H₀. (Hint: remember that v = d / t and H₀ = v / d)",
    //"9. Now convert the units of H₀ to s⁻¹ to obtain a time for the age of the universe. (Hint: 1 Mpc = 3.0857×10¹⁹ km)",
    //"10. Write a brief conclusion summarising what you have learnt in this lab.",
  ];

  const plotData = rows
    .filter(row => row[7] && row[9]) //index 7: avg velocity, index 9: distance
    .map(row => ({
      velocity: parseFloat(row[7]),
      distance: parseFloat(row[9])
    }))
    .filter(d => !isNaN(d.velocity) && !isNaN(d.distance));

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        The Hubble Redshift–Distance Relation
      </h1>

      {/* Introduction */}
      <details className="mb-8 bg-gray-100 border border-gray-300 p-4 rounded">
        <summary className="font-semibold text-lg cursor-pointer">Introduction</summary>
        <div className="mt-2 space-y-2 text-sm">

          <p>The late biologist J.B.S. Haldane once wrote: “The universe is not only queerer than we suppose, but
            queerer than we can suppose.” One of the queerest things about the universe is that virtually all the
            galaxies in it (with the exception of a few nearby ones) are moving away from the Milky Way. This
            curious fact was first discovered in the early 20th century by astronomer Vesto Slipher, who noted
            that absorption lines in the spectra of most spiral galaxies had longer wavelengths (were “redder”)
            than those observed from stationary objects. Assuming that the redshift was caused by the Doppler
            shift, Slipher concluded that the redshifted galaxies were all moving away from us. </p>
          <p>In the 1920’s, Edwin Hubble measured the distances of the galaxies for the first time, and when he
            plotted these distances against the velocities for each galaxy he noted something even queerer: The
            further a galaxy was from the Milky Way, the faster it was moving away. Was there something
            special about our place in the universe that made us a centre of cosmic repulsion? </p>
          <p>Astrophysicists readily interpreted Hubble’s relation as evidence of a universal expansion. The
            distance between all galaxies in the universe was getting bigger with time, like the distance between
            raisins in a rising loaf of bread. An observer on ANY galaxy, not just our own, would see all the other
            galaxies travelling away, with the furthest galaxies travelling the fastest. Also like the raisins in a loaf
            of bread, the galaxies weren’t really moving, any more than raisins in bread are moving across the
            dough, rather the dough is expanding around them. So the velocity of the galaxies was an apparent
            velocity due to the expansion of the space in between them. </p>
          <p>This was a remarkable discovery. The expansion is believed today to be a result of a “Big Bang”
            which occurred between 13.7 billion years ago, a date which we can calculate by
            making measurements like those of Hubble. The rate of expansion of the universe tells us how long it
            has been expanding. We determine the rate by plotting the velocities of galaxies against
            their distances, and determining the slope of the graph, a number called the Hubble Parameter, H0,
            which tells us how fast a galaxy at a given distance is receding from us. So Hubble’s discovery of the
            correlation between velocity and distance is fundamental in measuring the history of the universe. </p>
          <p> The technique we will use is fundamental to cosmological research these days. Hubble’s first
            measurements were made three-quarters of a century ago, and we have now measured the velocities
            and distances of about a million of the galaxies we can see. The redshift distance relation thus
            continues to help us map the universe in space and time.  </p>
          <p>
            In this lab, we will explore how redshift and distance are related for galaxies
            and how this leads to Hubble's Law. You'll examine emission line data,
            calculate velocities and distances, and estimate the Hubble constant.
          </p>
        </div>
      </details>

      {/* Q1 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          1. Fill in the Galaxy Data Table
        </h2>
        <LabDataTable rows={rows} setRows={setRows} />
        <p className="text-sm mt-2 italic text-gray-600">
          NOTE:
        </p>
      </div>


      {questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="mb-2 font-semibold whitespace-pre-line">{q}</p>

          {i === 4 && (
            <HubblePlot data={plotData} />
          )}

          <textarea
            className="w-full border border-gray-400 p-2 min-h-[100px]"
            placeholder="Type your response here..."
          />
        </div>
      ))}

    </div>
  );
}
