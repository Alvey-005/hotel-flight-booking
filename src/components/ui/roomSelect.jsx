import React, { useState , useEffect} from "react";
import { MdAccountCircle } from "react-icons/md";
import OptionsPanel from "./OptionsPanel";
import { Button } from "./button";

const Room = ({updateFormData, adult, children, room}) => {
  const [openOptions, setOpenOptions] = useState(false);
  
  // Lift the state to the Room component
  const [options, setOptions] = useState({
    adult: adult,
    children: children,
    room: room,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1,
    }));

  };
  // useEffect(() => {
  //   // Call the updateFormData function whenever options change
  //   // updateFormData(name, options[name]);
    
  // }, [options, updateFormData]);

  const optionArray = [
    {
      name: "adult",
      label: "Adult",
      minValue: 1,
      disabled: false,
    },
    {
      name: "children",
      label: "Children",
      minValue: 1,
      disabled: false,
    },
    {
      name: "room",
      label: "Room",
      minValue: 1,
      disabled: false,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-2.5">
      <MdAccountCircle style={{ width: '30px', height: '30px' }} />
      <span
        onClick={() => setOpenOptions(!openOptions)}
        className="text-[lightgray] cursor-pointer"
      >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
      {openOptions && (
    <div className="z-[2] absolute bg-[white] text-[gray]  shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[10px] top-[60px] p[10px">
    {optionArray.map((option) => (
            <OptionsPanel
              key={option.name}
              options={options}
              handleOption={handleOption}
              optionData={option}
            />
          ))}
          <div className="flex justify-center p-[10px]">
        <Button onClick={() => {setOpenOptions(false);
        Object.entries(options).forEach(([name, value]) => {
          updateFormData(name, value);
        });
        }}>Done</Button>
      </div>
        </div>
      )}
            
    </div>
  );
};

export default Room;
