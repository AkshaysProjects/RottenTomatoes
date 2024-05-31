// Define props interface for InfoItem component
export interface IInfoItemProps {
  label: string;
  value: string | number;
}

export default function InfoItem({ label, value }: IInfoItemProps) {
  return (
    <div>
      {/* Display info item label and value */}
      <div className="text-gray-400">{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
}
