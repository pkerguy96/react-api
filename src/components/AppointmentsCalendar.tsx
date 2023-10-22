import { useState } from "react";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { Paper } from "@mui/material";
import AppointmentModal from "./AppointmentModal";
import { EventClickArg } from "@fullcalendar/core/index.js";
import moment from "moment";
import getAppointment from "../hooks/getAppointments";
import AppointmentConfirmation from "./AppointmentConfirmation";
const AppointmentsCalendar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState(""); // Store the selected date
  const [confirmationData, setConfirmationData] = useState({
    id: 0,
    doctor_id: 0, // Replace with an appropriate default value
    patient_id: 0, // Replace with an appropriate default value
    note: "",
    title: "",
    date: "",
  });
  const { data } = getAppointment();

  const openAppointmentConfirmationModal = (data: any) => {
    setConfirmationData(data);
    setOpenModalConfirmation(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenModalConfirmation(false);
  };
  const handleEventClick = (info: EventClickArg) => {
    const appointmentinfo = info.event.extendedProps;
    const _def = info.event._def.title;
    const date = info.event.startStr;
    const id = info.event.id;

    const data = {
      id: id,
      doctor_id: appointmentinfo.doctor_id,
      patient_id: appointmentinfo.patient_id,
      note: appointmentinfo.note,
      title: _def,
      date: date,
    };

    openAppointmentConfirmationModal(data);
  };

  const handleDateClick = (info: DateClickArg) => {
    const dateTimeRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

    if (dateTimeRegex.test(info.dateStr)) {
      setOpenModal(true);
      const selecteddate = new Date(info.dateStr);
      const formattedDateStr = moment(selecteddate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      setSelectedDateStr(formattedDateStr);
    } else {
      setOpenModal(true);
      const selecteddate = new Date(info.dateStr);
      const formattedDateStr = moment(selecteddate).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      setSelectedDateStr(formattedDateStr);
    }
  };

  return (
    <Paper className="p-4" elevation={3}>
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "title",
          right: "prev,next,dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        timeZone="GMT"
        //@ts-ignore
        events={data}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        slotDuration="00:30:00"
        slotMinTime="08:00:00"
        allDaySlot={false}
      />
      <AppointmentConfirmation
        data={confirmationData}
        open={openModalConfirmation}
        onClose={handleCloseModal}
      />
      <AppointmentModal
        dateTime={selectedDateStr}
        open={openModal}
        onClose={handleCloseModal}
      />
    </Paper>
  );
};
export default AppointmentsCalendar;
