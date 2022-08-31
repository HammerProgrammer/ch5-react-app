import React, { useState } from "react";
import {
  useCrestronPublishDigital,
  useCrestronSubscribeDigital,
} from "@norgate-av/react-crestron-ch5-hooks";
import IOSSwitch from "./IOSSwitch";

const Onoff = ({ publishId, subscribeId }) => {
  const [switchState, setSwitchState] = useState("off");
  const [action] = useCrestronPublishDigital(publishId);
  const [] = useCrestronSubscribeDigital(subscribeId, (value, signalName) => {
    console.log(`Signal: ${signalName}, New Value: ${value}`);
    setSwitchState(value);
  });

  return (
    <IOSSwitch
      value={switchState}
      //   onTouchStart={() => action.push()}
      //   onTouchEnd={() => action.release()}
      onChange={(e) => {
        setSwitchState(e.target.value);
        action.click();
        // action.push();
        // action.release();
      }}
    />
  );
};

export default Onoff;
