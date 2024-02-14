//@ts-nocheck
import { Box, Button, Paper } from "@mui/material";
import React, { useEffect, useRef } from "react";
import pic0 from "/case1/case1_008.dcm?url";
import pic1 from "/case1/case1_010.dcm?url";
import pic2 from "/case1/case1_012.dcm?url";
import pic3 from "/case1/case1_014.dcm?url";
import pic4 from "/case1/case1_016.dcm?url";
import pic5 from "/case1/case1_018.dcm?url";
import pic6 from "/case1/case1_020.dcm?url";
import pic7 from "/case1/case1_022.dcm?url";
import pic8 from "/case1/case1_024.dcm?url";
import pic9 from "/case1/case1_026.dcm?url";
import pic10 from "/case1/case1_028.dcm?url";
import pic11 from "/case1/case1_030.dcm?url";
import SettingsOverscanOutlinedIcon from "@mui/icons-material/SettingsOverscanOutlined";
import IconButton from "@mui/material/IconButton";
import ExposureOutlinedIcon from "@mui/icons-material/ExposureOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import SwipeVerticalOutlinedIcon from "@mui/icons-material/SwipeVerticalOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import FormatColorFillOutlinedIcon from "@mui/icons-material/FormatColorFillOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import DownloadingOutlinedIcon from "@mui/icons-material/DownloadingOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import GestureOutlinedIcon from "@mui/icons-material/GestureOutlined";
/* lol */
import { styled, alpha } from "@mui/material/styles";

import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

/* lol */
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useParams } from "react-router";
import getUrls from "../hooks/getUrls";
import { UploadServiceApiClient, UrlList } from "../services/UploadsService";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import getGlobalById from "../hooks/getGlobalById";
import { CACHE_KEY_Url } from "../constants";
import axios from "axios";

const DicomPageViewer = () => {
  const { id } = useParams();
  const data = localStorage.getItem("user_login");

  let Userid;
  if (data) {
    const parsedData = JSON.parse(data);
    // Now you can use the parsedData
    Userid = parsedData.user.id;
  } else {
    console.log("Data not found in localStorage");
  }
  const iframeSrc = `http://127.0.0.1:8000/file-upload/${id}?userId=${Userid}&iframe=true`;

  return (
    <Paper id="paperContainer" className="fullscreen-container flex flex-col">
      <iframe
        src={iframeSrc}
        className="relative w-full aspect-[10/13] lg:aspect-[16/10]"
      ></iframe>
    </Paper>
  );
};
export default DicomPageViewer;
