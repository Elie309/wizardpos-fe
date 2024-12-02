import { useState, forwardRef, useImperativeHandle } from 'react';

const Drawer = forwardRef(({ title, children, onDrawerClose }: {title: string, children: React.ReactElement, onDrawerClose: () => void}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const openDrawer = () => {
    setIsOpen(true);
  }

  const isDrawerOpen = () => {
    return isOpen;
  }

  const handleCloseButtonClick = () => {

    setIsOpen(false);
    onDrawerClose();
    
  }

  useImperativeHandle(ref, () => ({
    closeDrawer, openDrawer, isDrawerOpen
  }));

  return (
    <div className={`fixed top-0 left-0 z-50 w-full sm:w-8/12 md:w-6/12 xl:w-3/12 h-full bg-white shadow-lg 
     transition-transform  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className='flex flex-row justify-end p-4'>

      <h2 className='secondary-title'>{title}</h2>
      <button onClick={handleCloseButtonClick} 
        className='text-red-800 text-xl'>
        X
      </button>
      </div>

      <div className="p-4">
        {children}
      </div>
    </div>
  );
});

export default Drawer;

