import * as React from "react";
import Menu from "@mui/material/Menu";
import AlarmIcon from "@mui/icons-material/Alarm";
import { Box, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import getGlobal from "../hooks/getGlobal";
import {
  WaitingroomCounter,
  clearPatientCounterApiClient,
  decrementPatientApiClient,
  incrementPatientApiClient,
  waitingRoomApiClient,
} from "../services/WaitingroomService";
import { CACHE_KEY_WaitingRoom } from "../constants";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function WaitingRoomMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();
  const { data, isLoading } = getGlobal(
    {} as WaitingroomCounter,
    [CACHE_KEY_WaitingRoom[0]],
    waitingRoomApiClient,
    undefined
  );

  const incrementPatient = useCallback(async () => {
    try {
      const response = await incrementPatientApiClient.getone();

      if (response.status >= 200 && response.status < 300) {
        queryClient.invalidateQueries(CACHE_KEY_WaitingRoom);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  const decrementPatient = useCallback(async () => {
    try {
      const response = await decrementPatientApiClient.getone();

      if (response.status >= 200 && response.status < 300) {
        queryClient.invalidateQueries(CACHE_KEY_WaitingRoom);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  const resetPatientCounter = useCallback(async () => {
    try {
      const response = await clearPatientCounterApiClient.getone();

      if (response.status >= 200 && response.status < 300) {
        queryClient.invalidateQueries(CACHE_KEY_WaitingRoom);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AlarmIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          style: {
            maxHeight: "300px", // Adjust the maximum height as needed
            width: "300px", // Adjust the width as needed
            padding: "9px", // Adjust the padding as needed
          },
          "aria-labelledby": "basic-button",
        }}
      >
        <Box className="flex items-center justify-between">
          <span className="  font-medium text-md ">Nombre patients</span>
          <IconButton onClick={handleClose} color="inherit" size="small">
            <CloseOutlinedIcon />
          </IconButton>
        </Box>

        <Box className="flex items-center justify-center   flex-row gap-8 ">
          <IconButton color="inherit" size="small" onClick={incrementPatient}>
            <AddIcon />
          </IconButton>
          <span className=" justfont-bold !text-blue-500">
            {data !== undefined ? data : 0}
          </span>
          <IconButton
            color="inherit"
            size="small"
            onClick={decrementPatient}
            disabled={data === undefined || data === null || data <= 0}
          >
            <RemoveIcon />
          </IconButton>
        </Box>
        <Box className="flex mt-3">
          <Button
            className=" !ml-auto"
            variant="outlined"
            size="small"
            color="error"
            endIcon={<DeleteIcon />}
            onClick={resetPatientCounter}
          >
            Clear
          </Button>
        </Box>
      </Menu>
    </div>
  );
}
