import React, { useState } from "react";
import Header from "./HeaderSideBar";
import Menu from "./Menu";
import Settings from "./Settings";
import InfoUser from "./InfoUser";

import Switch from "./Switch.js";
import { useDispatch, useSelector } from "react-redux";

export default function SideBar({ isOpenSideBar }) {
  const { userId } = useSelector(state => ({ ...state.User }));
  const [options, setOptions] = useState(0);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const dispatch = useDispatch();
  const openSettings = () => {
    setIsOpenSettings(!isOpenSettings);
  };

  const changeOption = value => {
    if (value !== options) setOptions(value);
  };
  const onClick = () => {
    dispatch({
      type: "TOGGLE"
    });
  };

  return (
    <>
      <div className={isOpenSideBar ? "sideBar isOpen" : "sideBar"}>
        <div>
          {userId && <Header onClick={onClick} userId={userId} />}
          <Menu options={options} changeOption={changeOption} />
        </div>
        {userId && (
          <Switch
            userId={userId}
            options={options}
            changeOption={changeOption}
          />
        )}
        <InfoUser toggle={openSettings} />
        <Settings toggle={openSettings} isOpen={isOpenSettings} />
      </div>{" "}
    </>
  );
}
