// components/BatteryGauge.tsx
import React from "react";
import BatteryGauge from "react-battery-gauge";

interface BatteryGaugeProps {
  value: number;
  size?: number;
  orientation?: "vertical" | "horizontal";
  label?: string;
}

const BatteryState: React.FC<BatteryGaugeProps> = ({
  value,
  size = 150,
  label,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      {label && (
        <div style={{ marginBottom: "8px", fontWeight: "bold" }}>{label}</div>
      )}
      <BatteryGauge value={value} size={size} />
    </div>
  );
};

export default BatteryState;
