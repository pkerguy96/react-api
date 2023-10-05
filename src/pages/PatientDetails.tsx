//@ts-nocheck
import { Box, Button, ButtonGroup, Divider, Paper } from "@mui/material";
import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import "react-vertical-timeline-component/style.min.css";
const PatientDetails = () => {
  const [activeBtn, setActiveBtn] = useState("one");
  const handleBtnClick = (ButtonName: string) => {
    setActiveBtn(ButtonName);
  };
  return (
    <>
      <Box className="parent w-full flex flex-col gap-4">
        <Box className="w-full flex gap-4 flex-col lg:flex-row lg:items-start">
          <Box className="flex gap-4 w-full lg:flex-[2] flex-col lg:flex-row">
            <Box className="w-full flex lg:flex-[1] flex-col bg-[#ffff] p-4 rounded-lg gap-4">
              <Box className="w-full flex flex-col">
                <p className="text-2xl font-mono font-bold  text-center">
                  Aymen Elkor
                </p>
                <p className="text-md font-light tracking-wider text-center text-[#b9bec5]">
                  0693954343.
                </p>
              </Box>
              <Box className="w-full flex gap-4">
                <Box className="w-full flex flex-col">
                  <p className="text-xl font-mono font-bold text-center">15</p>
                  <p className="text-md font-light tracking-wider text-center  text-[#b9bec5]">
                    Past
                  </p>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box className="w-full flex flex-col">
                  <p className="text-xl font-mono font-bold text-center">2</p>
                  <p className="text-md font-light tracking-wider text-center  text-[#b9bec5]">
                    Upcoming
                  </p>
                </Box>
              </Box>
            </Box>
            <Box className="w-full flex lg:flex-[1.5] flex-col bg-[#ffff] p-4 rounded-lg gap-4">
              <Box className="flex gap-4">
                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Gender
                  </p>
                  <p className="text-md text-center">Female</p>
                </Box>
                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Birthday
                  </p>
                  <p className="text-md text-center">Feb 24th,1997</p>
                </Box>
                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Phone Number
                  </p>
                  <p className="text-md text-center">0693954343</p>
                </Box>
              </Box>
              <Divider orientation="horizontal" flexItem />

              <Box className="flex gap-4 flex-wrap">
                <Box className="w-full flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Address
                  </p>
                  <p
                    className="text-md text-center"
                    style={{ wordWrap: "break-word" }}
                  >
                    rue alfred bouge quartier mohammadie n7
                  </p>
                </Box>
                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    City
                  </p>
                  <p className="text-md text-center">Youssoufia</p>
                </Box>
                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Zip Code
                  </p>
                  <p className="text-md text-center">46300</p>
                </Box>
              </Box>

              <Divider orientation="horizontal" flexItem />

              <Box className="flex gap-4">
                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Cin
                  </p>
                  <p className="text-md text-center">HA1995</p>
                </Box>
                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Sex
                  </p>
                  <p className="text-md text-center">Male</p>
                </Box>
                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Mutuelle
                  </p>
                  <p className="text-md text-center">CNSS</p>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="w-full lg:flex-1 p-4 rounded-lg bg-[#fff] flex flex-col gap-4">
            <Box className="w-full flex justify-between">
              <p className="text-md font-mono font-bold">Notes</p>
              <p className="text-md font-mono font-bold text-[#1976d2] cursor-pointer">
                See all
              </p>
            </Box>
            <Box className="w-full bg-[#eff1f7] p-4">
              <p className="">im diabetic</p>
              <p
                className=""
                style={{ maxWidth: "100%", overflowWrap: "break-word" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <p
                className=""
                style={{ maxWidth: "100%", overflowWrap: "break-word" }}
              >
                Lorem ipsum dolor sit amet
              </p>
            </Box>
          </Box>
        </Box>
        <Box className="w-full bg-white gap-4 flex flex-col rounded-lg p-4">
          <Box className="w-full rounded-md overflow-hidden flex">
            <Box
              component={"button"}
              className="px-4 py-2 flex-1 text-center cursor-pointer"
              sx={{
                color: activeBtn === "one" ? "#fff" : "#9ea8b2",
                backgroundColor:
                  activeBtn === "one" ? "rgb(33, 150, 243)" : "#f5f5f5",
              }}
              onClick={() => handleBtnClick("one")}
            >
              Appointments
            </Box>
            <Box
              component={"button"}
              className="px-4 py-2 flex-1 text-center cursor-pointer"
              sx={{
                color: activeBtn === "three" ? "#fff" : "#9ea8b2",
                backgroundColor:
                  activeBtn === "three" ? "rgb(33, 150, 243)" : "#f5f5f5",
              }}
              onClick={() => handleBtnClick("three")}
            >
              Records
            </Box>
          </Box>

          <VerticalTimeline className="bg-[#f5f5f5] max-h-[500px] overflow-auto !w-full !m-0 !p-4 !rounded-md">
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "rgb(33, 150, 243)",
                color: "#fff",
              }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(33, 150, 243)",
              }}
              date="2011 - present"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<AccessibilityIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                Creative Director
              </h3>
              <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
              <p>
                Creative Direction, User Experience, Visual Design, Project
                Management, Team Leading
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2010 - 2011"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<AccessibilityIcon />}
            >
              <h3 className="vertical-timeline-element-title">Art Director</h3>
              <h4 className="vertical-timeline-element-subtitle">
                San Francisco, CA
              </h4>
              <p>
                Creative Direction, User Experience, Visual Design, SEO, Online
                Marketing
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2008 - 2010"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<AccessibilityIcon />}
            >
              <h3 className="vertical-timeline-element-title">Web Designer</h3>
              <h4 className="vertical-timeline-element-subtitle">
                Los Angeles, CA
              </h4>
              <p>User Experience, Visual Design</p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </Box>
      </Box>
    </>
  );
};

export default PatientDetails;
