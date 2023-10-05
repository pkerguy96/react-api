import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";

import PeopleIcon from "@mui/icons-material/People";

import { Link } from "react-router-dom";
/* newly added  */
import DateRangeSharpIcon from "@mui/icons-material/DateRangeSharp";
import List from "@mui/material/List";
import BadgeIcon from "@mui/icons-material/Badge";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard" className="no-underline">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/Appointments" className="no-underline">
      <ListItemButton>
        <ListItemIcon>
          <DateRangeSharpIcon />
        </ListItemIcon>
        <ListItemText primary="Appointments" />
      </ListItemButton>
    </Link>
    <Link to="/Patients" className="no-underline">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Patients" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
interface Props {
  toggle: boolean;
  isSideBarOpen: boolean;
  handleClick: () => void;
}
export function SecondaryListItems({
  isSideBarOpen,
  toggle,
  handleClick,
}: Props) {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Gestion du médecin
      </ListSubheader>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Les infirmières" />
        {toggle ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={toggle && isSideBarOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/Nurses" className="no-underline">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BadgeIcon />
              </ListItemIcon>
              <ListItemText primary="gérer les infirmières" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </React.Fragment>
  );
}
