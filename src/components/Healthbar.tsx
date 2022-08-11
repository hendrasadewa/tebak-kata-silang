interface Props {
  chances: number;
}

function Healthbar({ chances }: Props) {
  const health = [...Array(chances).fill('💚')];

  return (
    <div className="flex text-center justify-between">
      {health.map((life, index) => (
        <span key={`life-${index + 1}`}>{life}</span>
      ))}
    </div>
  );
}

export default Healthbar;
