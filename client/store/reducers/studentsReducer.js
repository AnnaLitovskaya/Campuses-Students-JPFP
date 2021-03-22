import { GET_STUDENTS } from '../getStudents';

const studentsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STUDENTS: {
      return [...action.students];
    }
    default: {
      return state;
    }
  }
};

export default studentsReducer;