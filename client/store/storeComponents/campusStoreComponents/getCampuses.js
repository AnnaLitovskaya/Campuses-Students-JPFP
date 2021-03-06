import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES';

const getCampuses = () => {
  return async (dispatch) => {
    try {
      const campuses = (await axios.get('/api/campuses')).data;
      dispatch(_getCampuses(campuses));
    } catch (ex) {
      console.log(ex);
    }
  };
};

const _getCampuses = (campuses) => {
  return {
    type: GET_CAMPUSES,
    campuses,
  };
};

export { getCampuses, GET_CAMPUSES };
