import { FC } from 'react';

interface SwitchProps {
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

const SwitchInput: FC<SwitchProps> = ({ name, value, onChange }) => {
  return (
    <label className="switch" >
      <input
        type="checkbox"
        name={name}
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="slider"></span>
    </label>
  );
};

export default SwitchInput;
