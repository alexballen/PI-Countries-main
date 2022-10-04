import {
  GET_COUNTRYS,
  GET_COUNTRY_SEARCH,
  GET_CONTINENT,
  BY_ORDER,
  ORDER_BY_POPULATION,
  GET_DETAIL,
  GET_ACTIVITY,
  BY_ACTIVITY,
} from "../actionstypes/index.js";
import axios from "axios";

export const getCountrys = () => {
  return async (dispatch) => {
    try {
      const getCountries = await axios("http://localhost:3001/countries");
      dispatch({
        type: GET_COUNTRYS,
        payload: getCountries.data,
      });
    } catch (error) {
      console.log(error + " Error actions -> getCountrys");
    }
  };
};

export const getNameSearch = (name) => {
  return async (dispatch) => {
    try {
      const getName = await axios(
        "http://localhost:3001/countries/?name=" + name
      );
      dispatch({
        type: GET_COUNTRY_SEARCH,
        payload: getName.data,
      });
    } catch (error) {
      console.log(error + " Error actions -> getNameSearch");
    }
  };
};

export const getCountryId = (id) => {
  return async (dispatch) => {
    try {
      const getId = await axios.get("http://localhost:3001/countries/" + id);
      dispatch({
        type: GET_DETAIL,
        payload: getId.data,
      });
    } catch (error) {
      console.log(error + "Error actions -> getCountryId");
    }
  };
};

export const getActivitys = () => {
  return async (dispatch) => {
    try {
      const getAct = await axios.get("http://localhost:3001/activities");
      dispatch({
        type: GET_ACTIVITY,
        payload: getAct.data,
      });
    } catch (error) {
      console.log(error + "Error actions getActivitys");
    }
  };
};

export const byActivities = (payload) => {
  return {
    type: BY_ACTIVITY,
    payload,
  };
};

export const getContinent = (payload) => {
  return {
    type: GET_CONTINENT,
    payload,
  };
};

export const orderByCountry = (payload) => {
  return {
    type: BY_ORDER,
    payload,
  };
};

export const orderByPopulation = (payload) => {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
};