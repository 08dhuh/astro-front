"use client";
export default function ReferenceFooter({
  references = [],
  title = "References",
  compact = false,
  className = "",
  maxWidthClass = "max-w-prose",
}) {
  if (!references.length) return null;

  return (
    <footer
      className={`mt-12 text-center text-xs text-gray-500 break-words ${className}`}
      aria-labelledby="ref-heading"
    >
      <div className={`w-full ${maxWidthClass} mx-auto px-4 min-w-0`}>
        <p id="ref-heading" className="font-semibold mb-2">{title}</p>
        <ol className={`${compact ? "space-y-1" : "space-y-2"} list-none text-left`}>
          {references.map((r, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-2 shrink-0">[{i + 1}]</span>
              <span>{formatReference(r)}</span>
            </li>
          ))}
        </ol>
      </div>
    </footer>
  );
}
function formatReference(ref) {
  const {
    authors, //Mermilliod
    year, //1995
    title, //italicised title
    container, //journal/book/etc
    series, //optional, ASSL
    volume, //e.g. 203
    pages, //127–138
    editors, //D. Egret & M.A. Albrecht
    doi, //10.1007/...
    url, //links
    note,
  } = ref;

  return (
    <span>
      {authors && <span>{authors}. </span>}
      {year && <span>({year}). </span>}
      {title && <em>{title}</em>}
      {container && (
        <>
          {title ? ", in " : ""}
          <em>{container}</em>
        </>
      )}
      {series && <> ({series})</>}
      {editors && <>; eds. {editors}</>}
      {volume && <>, Vol. {volume}</>}
      {pages && <>, {pages}</>}
      {note && <>. {note}</>}
      {doi && (
        <>
          {" "}
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600"
          >
            doi:{doi}
          </a>
        </>
      )}
      {!doi && url && (
        <>
          {" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600"
          >
            {url}
          </a>
        </>
      )}
      .
    </span>
  );
}
