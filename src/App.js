import React from "react";
import {
  bridgeReceiveIntegerFromNative,
  bridgeReceiveBooleanFromNative,
  bridgeReceiveObjectFromNative,
  bridgeReceiveStringFromNative,
} from "@crestron/ch5-crcomlib";

import { publishEvent } from "@crestron/ch5-crcomlib";
import {
  useCrestronSubscribeAnalog,
  useCrestronSubscribeSerial,
  useCrestronPublishAnalog,
  useCrestronPublishBoolean,
} from "@norgate-av/react-crestron-ch5-hooks";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Dimmer from "./components/Dimmer";
import IOSSwitch from "./components/IOSSwitch";
import Onoff from "./components/Onoff";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

window["bridgeReceiveIntegerFromNative"] = bridgeReceiveIntegerFromNative;
window["bridgeReceiveBooleanFromNative"] = bridgeReceiveBooleanFromNative;
window["bridgeReceiveObjectFromNative"] = bridgeReceiveObjectFromNative;
window["bridgeReceiveStringFromNative"] = bridgeReceiveStringFromNative;

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ p: 2 }}>
          <Card sx={{ minWidth: 375 }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Typography
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Dimmers
                </Typography>
                <Onoff subscribeId="200" publishId="200" />
              </Stack>
              <Stack
                sx={{ height: 300 }}
                spacing={10}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                mt={3}
              >
                <Dimmer subscribeId={101} publishId={101}>
                  Light 1
                </Dimmer>
                <Dimmer subscribeId={102} publishId={102}>
                  Light 2
                </Dimmer>
                <Dimmer subscribeId={103} publishId={103}>
                  Light 3
                </Dimmer>
                <Dimmer subscribeId={104} publishId={104}>
                  Light 4
                </Dimmer>
                <Dimmer subscribeId={105} publishId={105}>
                  Light 5
                </Dimmer>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
