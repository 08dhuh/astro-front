"use client";
import { useState } from "react";

import LabDataTable from './LabDataTable';
import HubblePlot from './HubblePlot';

export default function Prac() {

  const [rows, setRows] = useState([Array(10).fill(""), Array(10).fill("")]);


  const questions = [

    "2. Now plot a Hubble diagram by graphing the velocities in km·s⁻¹ (y-axis) vs. the distances in Mpc (x-axis). \nFit a linear trendline through the origin. Determine the Hubble parameter from your graph and write it below.\n\nYour value for the Hubble Parameter:",
    "3. The current best value for the Hubble Parameter is H₀ = 67.8 km·s⁻¹·Mpc⁻¹. How much does your value differ from this? \nWhat factors could have affected your result? How might you improve the accuracy of your result?",

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
      <details open className="mb-6 bg-gray-100 border border-gray-300 p-4 rounded">
        <summary className="font-semibold text-lg cursor-pointer">
          Instructions
        </summary>

        <div className="mt-2 space-y-2 text-sm">

          <p>
            In order to measure the Hubble Parameter we need two quantities:
            <br />• the distance to each galaxy
            <br />• the apparent recessional velocity of each galaxy
          </p>
          <p>
            The apparent recessional velocity used in this exercise is the value in Column H,
            which is the average of the velocities derived from the wavelength shifts of the
            Ca II H and K absorption lines. These lines normally appear at wavelengths
            3968.5 Å (H) and 3933.7 Å (K) if the galaxy is not moving. In real observations
            they are redshifted to longer wavelengths depending on how quickly the galaxy
            is receding.
          </p>
          <p>
            Using the draggable Δλ adjuster beneath the spectrum plot, shift the template markers
            so the dashed lines align with the dips of the Ca II H and K absorption features for
            each galaxy. Record the measured wavelengths λ₀,K and λ₀,H in Columns B and C.
          </p>
          <p>
            Columns D through H depend on the values you enter in Columns B and C. Rather than
            calculating each value manually, you will define the relationships between columns
            using the "Formulae" inputs. These formulas may use column letters (B–J) and the
            constants k–n, which represent fixed physical parameters. The calculations will then
            be carried out automatically according to the expressions you provide.
          </p>
          <p>
            For example, the formula for Column H is pre-filled as
            <span className="font-mono"> H = (F + G) / 2 </span>.
            Once you have defined formulas for Columns D, E, F, and G, the value in Column H will
            be computed automatically.
          </p>
          <p>
            For Column J, the distance is calculated from the apparent magnitude in Column I using
            the standard distance-modulus relation. When you select a galaxy in Column A, its
            apparent B-band magnitude is filled in for you in Column I.
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
      <div key={0} className="mb-6">
        <p className="text-l font-semibold mb-4 whitespace-pre-line">
          <span>{questions[0]}</span>
          <input
            type="text"
            className="w-20 text-right border border-gray-300 px-2 py-1 rounded text-sm ml-2"
          />
          &nbsp;km·s⁻¹·Mpc⁻¹
        </p>


      </div>
      <div className="w-full flex justify-center mb-6">
        <HubblePlot data={plotData} />
      </div>

      <div key={1} className="mb-12">
        <h2 className="text-l font-semibold mb-4 whitespace-pre-line">{questions[1]}
        </h2>

      </div>


    </div>
  );
}
