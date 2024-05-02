import * as React from "react";
import Menu from "@mui/material/Menu";
import AlarmIcon from "@mui/icons-material/Alarm";
import { Box, Button, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import getGlobal from "../hooks/getGlobal";
import {
  WaitingroomCounter,
  incrementPatientApiClient,
  waitingRoomApiClient,
} from "../services/WaitingroomService";
import { CACHE_KEY_WaitingRoom } from "../constants";
import addGlobal from "../hooks/addGlobal";
import axiosInstance from "../services/Http";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export default function WaitingRoomMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const queryClient = useQueryClient();
  const { data } = getGlobal(
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
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
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
          <span className=" justfont-bold !text-blue-500">{data}</span>
          <IconButton color="inherit" size="small">
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
          >
            Clear
          </Button>
        </Box>
      </Menu>
    </div>
  );
}
