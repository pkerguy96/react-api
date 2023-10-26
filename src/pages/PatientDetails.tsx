import { Box, Divider } from "@mui/material";
import { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
  //@ts-ignore
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import getPatients from "../hooks/getPatients";
import { useParams } from "react-router";
import { Patient } from "./AddPatientForm";
import LoadingSpinner from "../components/LoadingSpinner";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";

const PatientDetails = () => {
  //get id in the url
  const { id } = useParams();
  //get cached patients
  const { data, isLoading } = getPatients();
  const [activeBtn, setActiveBtn] = useState("one");
  const handleBtnClick = (ButtonName: string) => {
    setActiveBtn(ButtonName);
  };

  // Check if `data` is loaded
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // filter the patient stored in cache
  if (!id) {
    return <div>No ID specified.</div>;
  }
  const filteredPatient = (data as Patient[]).find(
    (patient: Patient) => patient.id === parseInt(id)
  );
  if (!filteredPatient) {
    return <div>Patient not found for ID: {id}</div>;
  }

  const appointments = filteredPatient.appointments;
  return (
    <>
      <Box className="parent w-full flex flex-col gap-4">
        <Box className="w-full flex gap-4 flex-col lg:flex-row lg:items-start">
          <Box className="flex gap-4 w-full lg:flex-[2] flex-col lg:flex-row">
            <Box className="w-full flex lg:flex-[1] flex-col bg-[#ffff] p-4 rounded-lg gap-4">
              <Box className="w-full flex flex-col">
                <p className="text-2xl font-mono font-bold  text-center uppercase">
                  {filteredPatient.nom} {filteredPatient.prenom}
                </p>
                <p className="text-md font-light tracking-wider text-center text-[#b9bec5]">
                  {filteredPatient.phoneNumber
                    ? filteredPatient.phoneNumber
                    : "N/A"}
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
                    Genre
                  </p>
                  <p className="text-md text-center">{filteredPatient.sex}</p>
                </Box>
                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Naissance
                  </p>
                  <p className="text-md text-center">{filteredPatient.date}</p>
                </Box>
                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Téléphone
                  </p>
                  <p className="text-md text-center">
                    {filteredPatient.phoneNumber}
                  </p>
                </Box>
              </Box>
              <Divider orientation="horizontal" flexItem />

              <Box className="flex gap-4 flex-wrap">
                <Box className="w-full flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Addresse
                  </p>
                  <p
                    className="text-md text-center"
                    style={{ wordWrap: "break-word" }}
                  >
                    {filteredPatient.address}
                  </p>
                </Box>
              </Box>

              <Divider orientation="horizontal" flexItem />

              <Box className="flex gap-4">
                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Cin
                  </p>
                  <p className="text-md text-center"> {filteredPatient.cin}</p>
                </Box>

                <Box className="flex-1 flex flex-col gap-1">
                  <p className="text-md font-mono font-bold text-center text-[#b9bec5]">
                    Mutuelle
                  </p>
                  <p className="text-md text-center">
                    {filteredPatient.mutuelle}
                  </p>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="w-full lg:flex-1 p-4 rounded-lg bg-[#fff] flex flex-col gap-4">
            <Box className="w-full flex justify-between">
              <p className="text-md font-mono font-bold">Notes</p>
              <p className="text-md font-mono font-bold text-[#1976d2] cursor-pointer">
                Voir tout
              </p>
            </Box>
            <Box className="w-full bg-[#eff1f7] p-4">
              <p
                className="text-gray-500"
                style={{ maxWidth: "100%", overflowWrap: "break-word" }}
              >
                {!filteredPatient.note
                  ? "Aucune note disponible."
                  : filteredPatient.note}
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
              Rendez-vous
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
              Opérations
            </Box>
          </Box>
          {Object.values(appointments).length === 0 ? (
            <p className=" flex  justify-center font-bold">
              Aucun rendez-vous enregistré pour ce patient.
            </p>
          ) : (
            <VerticalTimeline className="bg-[#f5f5f5] max-h-[500px] overflow-auto !w-full !m-0 !p-4 !rounded-md">
              {Object.values(appointments).map((appointment: any, index) => (
                <VerticalTimelineElement
                  key={index}
                  className="vertical-timeline-element--work"
                  date={appointment.date}
                  contentStyle={{
                    background: "rgb(33, 150, 243)",
                    color: "#fff",
                  }}
                  dateClassName="custom-date-color"
                  contentArrowStyle={{
                    borderRight: "8px solid  rgb(33, 150, 243)",
                  }}
                  iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                  icon={<HealthAndSafetyOutlinedIcon />}
                >
                  <h3 className="vertical-timeline-element-title uppercase">
                    {appointment.title}
                  </h3>
                  {appointment.note ? <p>{appointment.note}</p> : null}
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PatientDetails;
