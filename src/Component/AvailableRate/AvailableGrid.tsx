import AvailableCard from "./AvailableCard";
import moment from "moment";

interface Machine {
  _id: string;
  deviceName: string;
}

interface AvailableGridProps {
  machines: Machine[];
  machineType: string;
  selectedDate: moment.Moment;
  viewMode: 'compact' | 'normal';
}

function AvailableGrid({ machines, machineType, selectedDate, viewMode }: AvailableGridProps) {
  // Hàm tách và sắp xếp deviceName phức tạp
  const parseDeviceName = (name: string) => {
    const match = name.match(/^([A-Za-z]+)(\d+)?(?:-(.+))?$/); // Tách prefix, số, và suffix
    if (match) {
      const [, prefix, number, suffix] = match;
      return {
        prefix: prefix || "", // Phần chữ cái
        number: parseInt(number, 10) || 0, // Phần số (nếu không có thì là 0)
        suffix: suffix || "", // Phần còn lại sau dấu "-"
      };
    }
    return { prefix: name, number: 0, suffix: "" }; // Trường hợp không khớp
  };

  // Sắp xếp machines theo deviceName
  const sortedMachines = [...machines].sort((a, b) => {
    const aParsed = parseDeviceName(a.deviceName);
    const bParsed = parseDeviceName(b.deviceName);

    // So sánh phần chữ cái (prefix)
    if (aParsed.prefix !== bParsed.prefix) {
      return aParsed.prefix.localeCompare(bParsed.prefix);
    }

    // So sánh phần số
    if (aParsed.number !== bParsed.number) {
      return aParsed.number - bParsed.number;
    }

    // So sánh phần còn lại (suffix)
    return aParsed.suffix.localeCompare(bParsed.suffix);
  });

  return (
    <div
      className={`grid ${
        viewMode === "compact" ? "grid-cols-3" : "grid-cols-2"
      } gap-2 overflow-y-auto`}
    >
      {sortedMachines.map((machine) => (
        <AvailableCard
          key={machine._id}
          machineName={machine.deviceName}
          deviceId={machine._id}
          selectedDate={selectedDate}
          machineType={machineType}
          viewMode={viewMode} // Truyền viewMode vào AvailableCard
        />
      ))}
    </div>
  );
}

export default AvailableGrid;
