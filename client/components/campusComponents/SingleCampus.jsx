import React, { Component } from 'react';
import { connect } from 'react-redux';
import { singleCampus } from '../../store/storeComponents/campusStoreComponents/singleCampus';
import { deleteCampus } from '../../store/storeComponents/campusStoreComponents/deleteCampus';
import { HashRouter as Router, Link } from 'react-router-dom';
import StudentTab from '../studentComponents/StudentTab.jsx';
import SelectStudent from '../studentComponents/SelectStudent.jsx';

class SingleCampus extends Component {
  componentDidMount() {
    const campusId = this.props.match.params.campusId * 1;
    this.props.singleCampus(campusId);
  }
  render() {
    const campus = this.props.campus;
    if (!campus) {
      return <h1 className="center">...Loading</h1>;
    } else if (!campus.name) {
      return <h1 className="center">Campus can't be found. ¯\_(ツ)_/¯</h1>;
    } else {
      return (
        <Router>
          <div id="singleCampus">
            <div>
              <img src={campus.imageURL} width="400" height="400" />
              <p>
                {campus.address} <br />
                {campus.addressExtended}
              </p>
            </div>
            <div>
              <h1>{campus.name}</h1>
              <p>{campus.description}</p>
              <div>
                <Link to={`/campuses/${campus.id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => {
                    this.props.deleteCampus(campus.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="listHeader">
            <h1>Students on Campus</h1>
            <SelectStudent campus={campus.id} />
          </div>
          {campus.Students && campus.Students.length ? (
            <div id="studentListing">
              {campus.Students.map((student) => {
                return (
                  <div key={student.id}>
                    <StudentTab campus={true} tab={student} />
                  </div>
                );
              })}
            </div>
          ) : (
            <h3 className="center">
              There are no students currently registered to this campus.
            </h3>
          )}
        </Router>
      );
    }
  }
}

const mapStateToProps = ({ campus }) => {
  return {
    campus,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    singleCampus: (campusId) => {
      dispatch(singleCampus(campusId));
    },
    deleteCampus: (campusId) => {
      dispatch(deleteCampus(campusId, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
