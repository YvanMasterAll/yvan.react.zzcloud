import {connect} from 'react-redux';
import {actions} from '../redux/configure';
import {Home} from '../views/home';
import * as types from '../redux/types'

const mapStateToProps = (state) => {
    return {
        currentTime: state.currentTime.currentTime,
        records: state.record.records
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateTime: (...args) => dispatch(actions.currentTime.updateTime(...args)),
        record_list: (...args) => dispatch({type: types.record_list, payload: args})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)