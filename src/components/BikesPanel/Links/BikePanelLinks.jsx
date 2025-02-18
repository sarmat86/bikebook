import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import StravaIcon from '../../../icons/Strava/StravaIcon';

const BikePanelLinks = () => (
  <>
    <Link to="/bike-list">
      <ListItem button>
        <ListItemIcon>
          <DirectionsBikeIcon />
        </ListItemIcon>
        <ListItemText primary="Your bikes" />
      </ListItem>
    </Link>
    <Link to="/activities">
      <ListItem button>
        <ListItemIcon>
          <DoubleArrowIcon />
        </ListItemIcon>
        <ListItemText primary="Activites" />
      </ListItem>
    </Link>
    <Link to="/strava">
      <ListItem button>
        <ListItemIcon>
          <StravaIcon />
        </ListItemIcon>
        <ListItemText primary="Strava" />
      </ListItem>
    </Link>
  </>
);
export default BikePanelLinks;
