import * as actionTypes from './actionTypes';

export const setDistanceAlert = (compId, endDistance) => ({
  type: actionTypes.SET_DISTANCE_ALERT,
  data: {
    compId,
    endDistance,
  },
});
export const addComponent = (componentData, bikeData) => ({
  type: actionTypes.ADD_COMPONENT,
  data: {
    bike: bikeData,
    component: componentData,
  },
});

export const updateComponentsDistance = (bikeId, distance) => ({
  type: actionTypes.UPDATE_COMPONENTS_DISTANCE,
  data: {
    bikeId,
    distance,
  },
});

export const disableServiceAlert = (compId) => ({
  type: actionTypes.DISABLE_SERVICE_ALERT,
  data: {
    compId,
  },
});

export const switchToBike = (compId, bikeId) => ({
  type: actionTypes.SWITCH_TO_BIKE,
  data: {
    compId,
    bikeId,
  },
});
export const retireComponent = (compId) => ({
  type: actionTypes.RETIRE_COMPONENT,
  data: {
    compId,
  },
});
export const deleteComponent = (compId) => ({
  type: actionTypes.DELETE_COMPONENT,
  data: {
    compId,
  },
});