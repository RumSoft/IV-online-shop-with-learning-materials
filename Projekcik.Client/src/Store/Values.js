const requestValuesType = 'REQUEST_VALUES';
const receiveValuesType = 'RECEIVE_VALUES';
const initialState = { values: [], isLoading: false };

export const actionCreators = {
  requestValues: startDateIndex => async (dispatch, getState) => {
    dispatch({ type: requestValuesType, startDateIndex });

    const url = `https://projekcik-prz.azurewebsites.net/api/values`;
    const response = await fetch(url);
    const values = await response.json();
    console.log(Date(), values);

    dispatch({ type: receiveValuesType, startDateIndex, values });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestValuesType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveValuesType) {
    return {
      ...state,
      values: action.values,
      isLoading: false
    };
  }

  return state;
};
