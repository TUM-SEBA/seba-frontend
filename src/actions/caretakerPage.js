export const CHANGEFILTERBY = "CHANGEFILTERBY";
export const CHANGESEARCH = "CHANGESEARCH";

export const changeFilterBy = (value) => (dispatch) =>
  dispatch({
    type: CHANGEFILTERBY,
    value,
  });

export const changeSearch = (value) => (dispatch) =>
  dispatch({
    type: CHANGESEARCH,
    value,
  });
