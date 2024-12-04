import React from 'react';

interface PopoverProps {
  id: string;
  children: React.ReactNode;
}

export default function Popover({ id, children }: PopoverProps) {
  return (
    <div className="relative">
      <button className="popover-button" aria-describedby={id}>
        Toggle Popover
      </button>
      <div id={id} role="tooltip" className="popover-content absolute bg-white p-4 shadow-lg rounded">
        {children}
      </div>
    </div>
  );
}
