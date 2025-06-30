export default function Prac() {
  const questions = [
    "1. For each of the clusters, retrieve the data, analyse the HR diagram, and fill in the blanks to complete the survey data.",
    "2. Which cluster is the oldest and how old is it?",
    "3. Which cluster is the youngest and how young is it?",
    "4. How do the ages of these star clusters compare with the age of the Milky Way (~13 Gyr)? Comment on when you think they formed in the lifetime of the Milky Way. Do you think you can draw a strong conclusion with the number of clusters you have fitted?",
    "5. Which cluster is the most distant, and which is the closest? Comment on what these clusters tell us about how big the Milky Way galaxy could be.",
    "6. Write a short summary of what you’ve learnt in this lab.",
  ];

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-2xl font-bold mb-6">
        Analysing the HR Diagrams of Star Clusters
      </h1>

      <details className="mb-8 bg-gray-100 border border-gray-300 p-4 rounded">
        <summary className="font-semibold text-lg cursor-pointer">Introduction</summary>
        <div className="mt-2 space-y-2 text-sm">
          <p>
            In this exercise, you'll have to read the right sections of the appendix to
            know how to get the data out of the program. You'll then use the table to answer some questions.
          </p>
        </div>
      </details>

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
