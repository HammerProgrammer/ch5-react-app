import React, { useState, useEffect } from "react";
import {
  useCrestronSubscribeAnalog,
  useCrestronPublishAnalog,
} from "@norgate-av/react-crestron-ch5-hooks";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const Dimmer = ({ name, subscribeId, publishId, children, ...rest }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [] = useCrestronSubscribeAnalog(subscribeId, (value, signalName) => {
    console.log(`Signal: ${signalName}, New Value: ${value}`);
    setSliderValue(bit16ToPercentage(value));
  });
  const [action] = useCrestronPublishAnalog(publishId);
  const minAnalogValue = 0;
  const maxAnalogValue = 65535;

  //   useEffect(() => {
  //     console.log("Received: " + state.value);
  //     setSliderValue(bit16ToPercentage(state.value));
  //   }, [state.value]);

  function bit16ToPercentage(value) {
    if (value >= minAnalogValue && value <= maxAnalogValue)
      return Math.round((value / maxAnalogValue) * 100);
    return 0;
  }

  function percentageToBit16(value) {
    if (value >= 0 && value <= 100)
      return Math.round((value / 100) * maxAnalogValue);
    return 0;
  }

  return (
    <Stack
      sx={{ height: 300 }}
      spacing={2}
      direction="column"
      alignItems="center"
      step={1}
      min={0}
      max={100}
    >
      <Slider
        orientation="vertical"
        valueLabelDisplay="auto"
        value={sliderValue}
        onChange={(_, value) => setSliderValue(value)}
        onChangeCommitted={(_, value) =>
          action.setValue(percentageToBit16(value))
        }
      />
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        {children}
      </Typography>
    </Stack>
  );
};

export default Dimmer;
