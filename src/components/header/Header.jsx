import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useState } from "react";
const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="where to go?"
            id="destination"
            name="destination"
            className="headerSearchInput"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />

          <div className="dateDropDown">2023/02/24</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            id="optionDropDown"
            onClick={() => setOpenOptions((prevState) => !prevState)}
          >
            1.adult 2.children 3.room
          </div>
          {openOptions && <GuestOptionList />}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon searchIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

const GuestOptionList = () => {
  return (
    <div className="guestOptions">
      <OptionItem />
      <OptionItem />
      <OptionItem />
    </div>
  );
};
const OptionItem = () => {
  return (
    <div className="guestOptionItem">
      <span className="optionText">adult</span>
      <div className="optionCounter">
        <button className="optionCounterBtn">
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">2</span>
        <button className="optionCounterBtn">
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Header;
