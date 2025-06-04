export default function Prac() {
  const questions = [
    "1. Open an Excel spreadsheet on your computer and label the columns as:",
    "2. Why might we measure the wavelength of two emission lines per galaxy instead of one?",
    "3. In your spreadsheet, fill out the relevant columns using your recorded apparent magnitudes and the equation log10(D) = (m - M + 5) / 5.",
    "4. How might the apparent recessional velocity of the galaxies affect the wavelength of the light they emit?",
    "5. Why do we call it apparent recessional velocity?",
    "6. Now plot a Hubble diagram by graphing the velocities in km·s⁻¹ (y-axis) vs. the distances in Mpc (x-axis). Fit a linear trendline through the origin. Label your graph and give it a title. Determine the Hubble parameter from your graph and write it below.\n\nYour value for the Hubble Parameter:",
    "7. The current best value for the Hubble Parameter is H₀ = 67.8 km·s⁻¹·Mpc⁻¹. How much does your value differ from this? What factors could have affected your result? How might you improve the accuracy of your result?",
    "8. Write the equation for time as a function of H₀. (Hint: remember that v = d / t and H₀ = v / d)",
    "9. Now convert the units of H₀ to s⁻¹ to obtain a time for the age of the universe. (Hint: 1 Mpc = 3.0857×10¹⁹ km)",
    "10. Write a brief conclusion summarising what you have learnt in this lab.",
  ];

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-2xl font-bold mb-6"> THE HUBBLE REDSHIFT-DISTANCE
        RELATION </h1>
      {questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="mb-2 font-semibold">{q}</p>
          <textarea
            className="w-full border border-gray-400 p-2 min-h-[100px]"
            placeholder="Type your response here..."
          />
        </div>
      ))}
    </div>
  );
}
