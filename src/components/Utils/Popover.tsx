import React, { forwardRef, useImperativeHandle } from 'react';;

interface PopoverProps {
  id: string;
  children: React.ReactNode;
  useButton?: boolean;
  buttonName?: string;
  title: string
  classNameButton: string;
  classNameMainDiv: string;
}

const Popover = forwardRef((props: PopoverProps, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    setIsOpen(false);
  }

  const open = () => {
    setIsOpen(true);
  }


  useImperativeHandle(ref, () => ({
    open, close
  }));

  return (
    <div>
      {(props.useButton) &&<a className={" cursor-pointer "+ props.classNameButton} onClick={handleOnClick} aria-describedby={props.id}>
        {props.buttonName || "Click me"}
      </a>}
      {isOpen &&
        <div className={`${isOpen ? "" : "hidden"} w-screen h-screen  
          fixed inset-0 bg-black bg-opacity-50 
          flex justify-start items-start md:items-center md:justify-center z-50
          `}>

          <div id={props.id} role="tooltip" className={`absolute w-full h-full md:h-fit md:w-3/4
            bg-white p-2 shadow-lg rounded ${props.classNameMainDiv}`}>

            <div className='flex flex-row justify-end pr-4'>
              <h1 className='secondary-title'>{props.title}</h1>
              <button onClick={() => setIsOpen(false)}
                className='text-red-800 text-xl'>
                X
              </button>
            </div>

            
            {props.children}
          </div>


        </div>}

    </div>
  );
});

export default Popover;
