const TooltipIcon = ({ title, description }) => (
  <div className="group relative flex items-center">
    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-500 text-white text-xs font-bold cursor-pointer">
      ?
    </div>
    <div className="absolute top-0 left-0 translate-x-4 -translate-y-full w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
      <p className="font-semibold pb-1">{title}</p>
      <p>{description}</p>
    </div>
  </div>
);

export default TooltipIcon;