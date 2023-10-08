import { useState } from "react";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import { Paper } from "@mui/material";
import AppointmentModal from "./AppointmentModal";
import { EventClickArg } from "@fullcalendar/core/index.js";
import moment from "moment";
const AppointmentsCalendar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState(""); // Store the selected date

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleEventClick = (info: EventClickArg) => {
    console.log("eventClick :", info.event.startStr);
    // Handle the click on a custom event
    /*    console.log("Date clicked:", info.dateStr || info.event.startStr); */
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
      // It's a datetime (has time component)
      console.log("Datetime:", info.dateStr);
    } else {
      setOpenModal(true);
      const selecteddate = new Date(info.dateStr);
      const formattedDateStr = moment(selecteddate).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      setSelectedDateStr(formattedDateStr);
    }
  };
  // Generate custom events for each date cell (e.g., for the entire month)
  const customEvents = [
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 1",
      start: "2023-10-01",
    },
    {
      title: "Custom Event 2",
      start: "2023-10-02T15:00:00",
      end: "2023-10-02T15:10:00",
      background: "blue",
    },
    // Add more custom events as needed
  ];

  return (
    <Paper className="p-4 " elevation={3}>
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "title",
          right: "prev,next,dayGridMonth,timeGridWeek,timeGridDay", // user can switch between the two
        }}
        initialView="dayGridMonth"
        events={customEvents}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        slotDuration="00:30:00"
      />
      <AppointmentModal
        dateTime={selectedDateStr}
        open={openModal}
        onClose={handleCloseModal}
      />
      ;
    </Paper>
  );
};
export default AppointmentsCalendar;
