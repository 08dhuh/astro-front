const TooltipIcon = ({ title, description }) => (
  <span className="relative inline-flex">
    <span
      className="peer w-4 h-4 inline-flex items-center justify-center rounded-full bg-gray-500 text-white text-[10px] font-bold cursor-default select-none"
      role="button"
      tabIndex={0}
      aria-label={title}
    >
      ?
    </span>

    <div
      role="tooltip"
      className="pointer-events-none absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-2
                 rounded bg-gray-800 p-2 text-xs text-white opacity-0 shadow-lg
                 transition-opacity transition-transform duration-200
                 peer-hover:opacity-100 peer-focus:opacity-100"
    >
      <p className="font-semibold pb-1">{title}</p>
      <p>{description}</p>
    </div>
  </span>
);

export default TooltipIcon;
