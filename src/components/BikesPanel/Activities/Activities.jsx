import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { BtnWrapper, Btn } from '../../../styled/styled';
import InfoHeader from '../../../UX/InfoHeader/InfoHeader';
import ActivityTile from './ActivityTile/ActivityTile';
import { formatDistance } from '../../../utils/distanceFormatters';
import { secondsToHours, timeFormatter } from '../../../utils/timeFormatters';
import InfoBox from '../../../UX/InfoBox/InfoBox';
import { STRAVA_SYNC_URL } from '../../../CONST';
import { removeActivity, openConfirmDialog } from '../../../store/actions/index';
import Pagination from '../../../UX/Pagination/Pagination';

const useStyles = makeStyles({
  activitiesList: {},
});
const Activities = ({ history }) => {
  const classes = useStyles();
  const activities = useSelector((store) => store.activities);
  const bikes = useSelector((store) => store.bikes);
  const isStravaAuth = useSelector((state) => !!state.strava.auth.accessToken);
  const dispatch = useDispatch();
  const activitiesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const activitiesFrom = currentPage * activitiesPerPage;

  const addNewActivityHandler = () => {
    history.push('/activity/add');
  };
  const stravaClickHandler = () => {
    if (isStravaAuth) {
      history.push('/strava');
    } else {
      window.location = STRAVA_SYNC_URL;
    }
  };
  const editActivityHandler = (activity) => {
    history.push({
      pathname: '/activity/edit',
      activity,
    });
  };
  const deleteActivityHandler = (activity) => {
    dispatch(openConfirmDialog({
      title: 'Delete activity',
      description: 'The activity will be deleted permanently. Are you sure?',
      confirm: () => { dispatch(removeActivity(activity)); },
    }));
  };

  const newActivities = activities.slice()
    .sort((a, b) => (new Date(a.startDate) > new Date(b.startDate) ? -1 : 1));
  const activitiesToRender = newActivities
    .slice(activitiesFrom, activitiesFrom + activitiesPerPage)
    .map((activity) => {
      const bike = bikes.find((b) => b.id === activity.bikeId);
      return (
        <ActivityTile
          key={activity.id}
          id={activity.id}
          startDate={timeFormatter(activity.startDate, false)}
          strava={activity.strava}
          title={activity.title}
          bike={bike ? bike.name : 'unknown'}
          time={secondsToHours(activity.movingTime)}
          distance={formatDistance(activity.distance, 'km')}
          editHandler={!activity.strava ? () => editActivityHandler(activity) : null}
          deleteHandler={!activity.strava ? () => deleteActivityHandler(activity) : null}
        />
      );
    });
  const menuItems = [
    {
      name: 'Add new',
      func: addNewActivityHandler,
    },
    {
      name: 'Sync with Strava',
      func: stravaClickHandler,
    },
  ];
  return (
    <>
      <InfoHeader
        title="Activities"
        menuItems={menuItems}
      />
      <div className={classes.activitiesList}>
        {activitiesToRender.length
          ? activitiesToRender
          : (
            <>
              <InfoBox
                type="warning"
                title="You have not any activities yet"
              />
              <BtnWrapper>
                {!isStravaAuth || !activitiesToRender.length ? (
                  <Btn variant="outlined" color="primary" onClick={stravaClickHandler}>
                    Sync with Strava
                  </Btn>
                ) : null}
                <Btn variant="outlined" color="primary" onClick={addNewActivityHandler}>
                  Add new activity
                </Btn>
              </BtnWrapper>
            </>
          )}
      </div>
      {activities.length > activitiesPerPage ? (
        <Pagination
          elemenstLength={activities.length}
          perPage={activitiesPerPage}
          pageClick={(page) => { setCurrentPage(page); }}
        />
      ) : null}

    </>
  );
};

export default withRouter(Activities);
