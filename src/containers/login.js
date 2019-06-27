import {connect} from 'react-redux';
import {actions} from '../redux/configure';
import {Login} from '../views/login';

const mapStateToProps = (state) => {
    return {
        user: state.currentUser.user,
        loggedIn: state.currentUser.loggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (...args) => dispatch(actions.currentUser.login(...args))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)