type RiskLevel = {
  label: string;
  value: number;
  color: string;
};

type ImageSecurityCardProps = {
  title: string;
  totalLabel: string;
  data: RiskLevel[];
};

const ImageSecurityCard = ({
  title,
  totalLabel,
  data,
}: ImageSecurityCardProps) => {
  const total = data.reduce((sum, level) => sum + level.value, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-sm font-semibold text-black mb-1">{title}</h3>
      <p className="text-sm font-semibold text-gray-800 mb-4">
        {total} {totalLabel}
      </p>

      {/* Progress Bar */}
      <div className="flex h-4 w-full overflow-hidden rounded-full mb-4">
        {data.map((level, idx) => {
          const width = (level.value / total) * 100;
          return (
            <div
              key={idx}
              className="h-full"
              style={{
                width: `${width}%`,
                backgroundColor: level.color,
              }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
        {data.map((level, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: level.color }}
            />
            <span>
              {level.label} ({level.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSecurityCard;
