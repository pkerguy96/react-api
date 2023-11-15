//@ts-nocheck
import { Box, Button, Paper } from "@mui/material";
import React, { useEffect } from "react";
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
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const app = new dwv.App();
const tools = {
  WindowLevel: {},
  ZoomAndPan: {},
  Opacity: {},
  Scroll: {},
  Livewire: {},
  Floodfill: {},
  Draw: {
    options: [
      "Arrow",
      "Ruler",
      "Protractor",
      "Rectangle",
      "Roi",
      "Ellipse",
      "Circle",
      "FreeHand",
    ],
  },
};
window.a = app;
const actions = {
  WindowLevel: () => {
    app.setTool("WindowLevel");
  },
  ZoomAndPan: () => {
    app.setTool("ZoomAndPan");
  },
  Opacity: () => {
    app.setTool("Opacity");
  },
  Scroll: () => {
    app.setTool("Scroll");
  },
  Livewire: () => {
    app.setTool("Livewire");
  },
  Floodfill: () => {
    app.setTool("Floodfill");
  },
  Undo: () => {
    app.undo();
  },
  Redo: () => {
    app.redo();
  },
  Reset: () => {
    app.resetDisplay();
  },
  Draw: (shape, color) => {
    app.setTool("Draw");
    app.setToolFeatures({
      shapeName: shape,
      shapeColour: color,
    });
  },
};

const DicomPageViewer = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const CANVAS = document.createElement("canvas");
  const CONTEXT = CANVAS.getContext("2d");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function download() {
    CANVAS.height = 800;
    CANVAS.width = 1400;
    const DOWNLOAD = document.querySelector("#download");
    const wrap = document.querySelector("#Dicom");
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    const canvases = wrap.querySelectorAll("canvas");
    if (canvases.length) {
      canvases.forEach((canvas) => {
        const factor = Math.min(
          CANVAS.width / canvas.width,
          CANVAS.height / canvas.height
        );

        CONTEXT.drawImage(
          canvas,
          CANVAS.width / 2 - (canvas.width * factor) / 2,
          CANVAS.height / 2 - (canvas.height * factor) / 2,
          canvas.width * factor,
          canvas.height * factor
        );
      });
    }
    44;

    DOWNLOAD.href = CANVAS.toDataURL("image/png");
    DOWNLOAD.click();
  }
  const toggleFullscreen = () => {
    const paperDiv = document.querySelector("#paperContainer");
    const dicom = document.querySelector("#Dicom");

    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    }

    if (!isFullscreen) {
      paperDiv?.classList.add("fixed", "inset-0", "z-[1300]");
      dicom?.classList.add("flex-1");
      dicom?.classList.remove("aspect-[16/7]");
      dicom
        ?.querySelector("canvas")
        ?.classList.remove("aspect-[16/7]", "w-full", "h-full");
    } else {
      paperDiv?.classList.remove("fixed", "inset-0", "z-[1300]");
      dicom?.classList.remove("flex-1");
      dicom?.classList.add("aspect-[16/7]");
      dicom
        ?.querySelector("canvas")
        ?.classList.add("aspect-[16/7]", "w-full", "h-full");
    }

    setIsFullscreen(!isFullscreen);
  };
  useEffect(() => {
    const wrap = document.querySelector("#Dicom");
    if (!wrap.dataset.t) {
      wrap.dataset.t = "true";
      app.init({
        dataViewConfigs: {
          "*": [
            {
              divId: "Dicom",
            },
          ],
        },
        tools: tools,
      });

      app.loadURLs([
        pic0,
        pic1,
        pic2,
        pic3,
        pic4,
        pic5,
        pic6,
        pic7,
        pic8,
        pic9,
        pic10,
        pic11,
      ]);

      window.addEventListener("resize", () => {
        app.onResize();
      });
    }
    window.a = app;
    return window.removeEventListener("resize", () => {
      setTimeout(() => {
        app.onResize();
      }, 500);
    });
  }, []);

  useEffect(() => {
    app.onResize();
  }, [isFullscreen]);

  return (
    <Paper id="paperContainer" className="fullscreen-container flex flex-col">
      <Box className="flex justify-between p-2 ">
        <Box className=" flex gap-2">
          <IconButton
            aria-label="WindowLevel"
            color="primary"
            size="large"
            onClick={() => actions["WindowLevel"]()}
          >
            <ExposureOutlinedIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="ZoomAndPan"
            color="primary"
            size="large"
            onClick={() => actions["ZoomAndPan"]()}
          >
            <SettingsOverscanOutlinedIcon fontSize="inherit" />
          </IconButton>
          <Tooltip title="Opacity">
            <IconButton
              aria-label="Opacity"
              color="primary"
              size="large"
              onClick={() => actions["Opacity"]()}
            >
              <OpacityOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Scroll">
            <IconButton
              aria-label="Scroll"
              color="primary"
              size="large"
              onClick={() => actions["Scroll"]()}
            >
              <SwipeVerticalOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Livewire">
            <IconButton
              aria-label="Livewire"
              color="primary"
              size="large"
              onClick={() => actions["Livewire"]()}
            >
              <BrushOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Floodfill">
            <IconButton
              aria-label="Floodfill"
              color="primary"
              size="large"
              onClick={() => actions["Floodfill"]()}
            >
              <FormatColorFillOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>

          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="outlined"
            disableElevation
            size="small"
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Tools
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                actions["Draw"]("Ellipse", "red");
                handleClose();
              }}
              disableRipple
            >
              <CircleOutlinedIcon />
              Ellipse
            </MenuItem>
            <MenuItem
              onClick={() => {
                actions["Draw"]("Ruler", "red");
                handleClose();
              }}
              disableRipple
            >
              <StraightenOutlinedIcon />
              Ruler
            </MenuItem>

            <MenuItem
              onClick={() => {
                actions["Draw"]("Protractor", "red");
                handleClose();
              }}
              disableRipple
            >
              <SquareFootOutlinedIcon />
              Protractor
            </MenuItem>
            <MenuItem
              onClick={() => {
                actions["Draw"]("Rectangle", "red");
                handleClose();
              }}
              disableRipple
            >
              <RectangleOutlinedIcon />
              Rectangle
            </MenuItem>
            <MenuItem
              onClick={() => {
                actions["Draw"]("Roi", "red");
                handleClose();
              }}
              disableRipple
            >
              <TimelineOutlinedIcon />
              Roi
            </MenuItem>

            <MenuItem
              onClick={() => {
                actions["Draw"]("FreeHand", "red");
                handleClose();
              }}
              disableRipple
            >
              <GestureOutlinedIcon />
              FreeHand
            </MenuItem>
          </StyledMenu>
        </Box>

        <Box className="flex gap-2">
          <Tooltip title="Undo">
            <IconButton
              aria-label="Undo"
              color="primary"
              size="large"
              onClick={() => actions["Undo"]()}
            >
              <UndoOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset">
            <IconButton
              aria-label="Reset"
              color="primary"
              size="large"
              onClick={() => actions["Reset"]()}
            >
              <ReplayOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton
              aria-label="Redo"
              color="primary"
              size="large"
              onClick={() => actions["Redo"]()}
            >
              <RedoOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="download">
            <IconButton
              aria-label="download"
              color="primary"
              size="large"
              onClick={download}
            >
              <DownloadingOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="download">
            <IconButton
              aria-label="download"
              color="primary"
              size="large"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <FullscreenExitOutlinedIcon fontSize="inherit" />
              ) : (
                <FullscreenOutlinedIcon fontSize="inherit" />
              )}
            </IconButton>
          </Tooltip>

          <a id="download" href="" download></a>

          {/* <Button variant="outlined" size="small" onClick={toggleFullscreen}>
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button> */}
        </Box>
      </Box>
      <Box id="Dicom" className="relative w-full aspect-[16/7]"></Box>
    </Paper>
  );
};
export default DicomPageViewer;
