import { Box } from "@mui/material";
import { useState } from "react";
import "react-vertical-timeline-component/style.min.css";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import getPatientDetails from "../hooks/getPatientDetails";
import AppointmentVerticalTimeline from "../components/AppointmentVerticalTimeline";
import PatientsdetailsComponent from "../components/PatientsdetailsComponent";
import React from "react";
import OperationVerticalTimeline from "../components/OperationVerticalTimeline";

const PatientDetails = React.memo(() => {
  const [activeBtn, setActiveBtn] = useState("one");
  //get id in the url
  const { id } = useParams();
  //get cached patients
  const { data, isLoading } = id
    ? getPatientDetails(Number(id))
    : { data: null, isLoading: true };
  console.log(data);

  const handleBtnClick = (ButtonName: string) => {
    setActiveBtn(ButtonName);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log(activeBtn);

  if (!id) {
    return <div>No ID specified.</div>;
  }
  const { appointments, operations } = data;
  console.log(operations);
  return (
    <>
      <Box className="parent w-full flex flex-col gap-4">
        <PatientsdetailsComponent info={data} isLoading={isLoading} />
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
          {activeBtn === "one" && Object.values(appointments).length === 0 ? (
            <p className="flex justify-center font-bold">
              Aucun rendez-vous enregistré pour ce patient.
            </p>
          ) : null}

          {activeBtn === "one" && Object.values(appointments).length > 0 && (
            <AppointmentVerticalTimeline
              Appointments={appointments}
              isLoading={isLoading}
            />
          )}

          {activeBtn === "three" && Object.values(operations).length === 0 ? (
            <p className="flex justify-center font-bold">
              Aucune opération enregistrée pour ce patient.
            </p>
          ) : null}

          {activeBtn === "three" && Object.values(operations).length > 0 && (
            <OperationVerticalTimeline
              Operations={operations}
              isLoading={isLoading}
            />
          )}
        </Box>
      </Box>
    </>
  );
});

export default PatientDetails;
