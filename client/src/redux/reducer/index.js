import {
  GET_COUNTRYS,
  GET_COUNTRY_SEARCH,
  GET_CONTINENT,
  BY_ORDER,
  ORDER_BY_POPULATION,
  GET_DETAIL,
  GET_ACTIVITY,
  BY_ACTIVITY,
  POST_ACTIVITY,
  PAGE_PAGINATED,
  BY_CONT_ACTI,
} from "../actionstypes/index.js";

const initialState = {
  getCountries: [],
  byContinent: [],
  byActivities: [],
  getActivities: [],
  detail: [],
  page: 1,
  byContActi: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRYS:
      return {
        ...state,
        getCountries: action.payload,
        byContinent: action.payload,
        byActivities: action.payload,
        delete: action.payload,
      };
    case GET_COUNTRY_SEARCH:
      let filteredCountries = state.byContinent.filter((country) =>
        country.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        getCountries: filteredCountries,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_CONTINENT:
      const byContinent = state.byContinent;
      const getCont =
        action.payload === "All" || action.payload === "Cont"
          ? byContinent
          : byContinent.filter((e) => e.continents === action.payload);
      return {
        ...state,
        getCountries: getCont,
      };
    case BY_ORDER:
      const orderCountries =
        action.payload === "Asc"
          ? state.getCountries.sort((a, b) => (a.name > b.name ? 1 : -1))
          : state.getCountries.sort((a, b) => (a.name > b.name ? -1 : 1));
      return {
        ...state,
        getCountries: orderCountries,
      };
    case ORDER_BY_POPULATION:
      const orderPopulation =
        action.payload === "Max"
          ? state.getCountries.sort((a, b) =>
              a.population > b.population ? -1 : 1
            )
          : state.getCountries.sort((a, b) =>
              a.population > b.population ? 1 : -1
            );
      return {
        ...state,
        getCountries: orderPopulation,
      };
    case BY_CONT_ACTI:
      return {
        ...state,
        byContActi: action.payload,
      };
    case GET_ACTIVITY:
      const byContActiv = state.byContActi;
      const contiActiv = action.payload;
      const filterConti =
        byContActiv === "All" || byContActiv === "Cont"
          ? contiActiv
          : contiActiv.filter((c) =>
              c.countries.find((cou) => cou.continents === byContActiv)
            );
      return {
        ...state,
        getActivities: filterConti,
      };
    case BY_ACTIVITY:
      const byActivities = state.byContinent;
      const getActiv =
        action.payload === "All"
          ? byActivities.filter((e) => e.activities.length > 0)
          : byActivities.filter((a) =>
              a.activities.find(
                (el) => el.name.toLowerCase() === action.payload
              )
            );
      return {
        ...state,
        getCountries: getActiv,
      };
    case POST_ACTIVITY:
      return {
        ...state,
      };
    case "CLEAR":
      return {
        ...state,
        detail: [],
      };
    case PAGE_PAGINATED:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}
