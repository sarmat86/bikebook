import React, { useEffect } from 'react';
import stravaApi from 'strava-v3';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BikesNav from './Navigation/Navigation';
import AddBike from './AddBike/AddBike';
import BikeItem from './BikeItem/BikeItem';
import ControlLayout from '../Layouts/ControlLayout/ControlLayout';
import BikeList from './BikeList/BikeList';
import Spinner from '../../UX/Spinner/Spinner';
import Strava from '../ServicesSync/Strava/Strava';
import * as bikesData from '../../mock/constans';


const BikesPanel = () => {
  const bikeList = useSelector((state) => state.bikes.list);
  return (
    <ControlLayout>
      <BikesNav />
      {bikeList ? (
        <Switch>
          <Route path="/bike-list">
            <BikeList />
          </Route>
          <Route exact path="/bike/add">
            <AddBike bikeTypes={bikesData.BIKE_TYPES} />
          </Route>
          <Route path="/bike">
            <BikeItem />
          </Route>
          <Route path="/strava">
            <Strava />
          </Route>
          {/* <Redirect exact from="/" to="/" /> */}
        </Switch>
      ) : <Spinner />}
    </ControlLayout>
  );
};
export default BikesPanel;
