interface Props {
  chances: number;
}

function Healthbar({ chances }: Props) {
  const health = [...Array(chances).fill('')];

  return (
    <div className="flex text-center items-center ">
      <div className="flex items-center gap-0.5">
        {health.map((_, index) => (
          <span
            key={`life-${index + 1}`}
            className="border border-slate-500 bg-slate-300 w-6 h-4 rounded-md"
          ></span>
        ))}
      </div>
      <div className="text-slate-500 px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export default Healthbar;
