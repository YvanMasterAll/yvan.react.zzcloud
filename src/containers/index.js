import {connect} from 'react-redux';
import {actions} from '../redux/configure';
import {Index} from '../views/index';

const mapStateToProps = (state) => {
    return {
        currentTime: state.currentTime.currentTime,
        user: state.currentUser.user,
        loggedIn: state.currentUser.loggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateTime: (...args) => dispatch(actions.currentTime.updateTime(...args)),
        login: (...args) => dispatch(actions.currentUser.login(...args)),
        logout: (...args) => dispatch(actions.currentUser.logout(...args))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)