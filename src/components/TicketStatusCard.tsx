type TicketStatus = {
  label: string;
  value: number;
  color: string;
};

type TicketStatusCardProps = {
  title: string;
  totalLabel: string;
  data: TicketStatus[];
};

const TicketStatusCard = ({
  title,
  totalLabel,
  data,
}: TicketStatusCardProps) => {
  const total = data.reduce((sum, status) => sum + status.value, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-sm font-semibold text-black mb-1">{title}</h3>
      <p className="text-sm font-semibold text-gray-800 mb-4">
        {total} {totalLabel}
      </p>

      {/* Percentage Bar */}
      <div className="flex h-3 w-full overflow-hidden rounded-full mb-4">
        {data.map((status, idx) => {
          const width = (status.value / total) * 100;
          return (
            <div
              key={idx}
              className="h-full"
              style={{
                width: `${width}%`,
                backgroundColor: status.color,
              }}
            />
          );
        })}
      </div>

      {/* Tag list */}
      <div className="flex flex-wrap gap-2 text-sm">
        {data.map((status, idx) => (
          <div
            key={idx}
            className="flex items-center px-2 py-1 rounded-full text-white"
            style={{ backgroundColor: status.color }}
          >
            {status.label}: {status.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketStatusCard;
