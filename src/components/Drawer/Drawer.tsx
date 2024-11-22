import { useState, forwardRef, useImperativeHandle } from 'react';

const Drawer = forwardRef(({ children }: {children: React.ReactElement}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const openDrawer = () => {
    setIsOpen(true);
  }

  useImperativeHandle(ref, () => ({
    toggleDrawer, openDrawer
  }));

  return (
    <div className={` drawer ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleDrawer} className='text-red-800'>
        {isOpen ? 'Close' : 'Open'} X
      </button>
      <div className="drawer-content">
        {children}
      </div>
    </div>
  );
});

export default Drawer;

