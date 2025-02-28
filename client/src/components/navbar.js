import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import {getUserProfile} from '../actions';

class Navbar extends Component {
    constructor(){
        super();
        this.state = {
            pathname: ''
        }
    }
    componentWillMount(){
        this.props.getUserProfile();
    }
    componentDidMount(){
        const pathname = this.context.router.history.location.pathname;
        this.setState({ pathname })
    }
    renderClass(base, router){
        return (this.state.pathname.indexOf(router)!=-1)?`${base} revieweer-active`:base;
    }
    renderSignButton(){
        const {isLoggedIn, profile, isAdmin} = this.props;
        if (isLoggedIn && profile.name){
            return (
                <span>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {profile.name.first}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <NavLink className='dropdown-item' to="/user">Profile</NavLink>
                            <NavLink className='dropdown-item' to="/user/settings">Settings</NavLink>
                            <NavLink className='dropdown-item' to="/user/reviews">My Reviews</NavLink>
                            {isAdmin && <NavLink className="dropdown-item" to="/admin/insight">Admin Insight</NavLink>}
                            <div className="dropdown-divider"></div>
                            <NavLink className="dropdown-item" to="/signout">Log Out</NavLink>
                        </div>
                    </li>
                </span>
            )
        }else{
            return (
                [
                    <li className="nav-item" key="1">
                        <NavLink to="/signin" className="nav-link">Sign in</NavLink>
                    </li>,
                    <li className="nav-item" key="2">
                        <NavLink to="/signup" className="nav-link hightlight">Sign Up</NavLink>
                    </li>
                ]
            )
        }
    }
    render() {
        return (
            <nav className="navbar navbar-expand sticky-top navbar-light">
                <LoadingBar className='revieweer-loading-bar' />
                <NavLink className="navbar-brand" to="/">
                    <img src="../assets/svgs/logo-r.svg" height="20" className='d-sm-none'/>
                    <img src="../assets/svgs/logo-long.svg" height="20" className='d-none d-sm-block'/>
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className={this.renderClass('nav-link', 'explore')} to="/explore">Explore</NavLink>
                        </li>
                        {this.props.isAdmin && <li className="nav-item">
                            <NavLink className={this.renderClass('nav-link', 'admin')} to="/admin/insight/products">Admin</NavLink>
                        </li>}
                    </ul>
                    <ul className="navbar-nav">
                        {this.renderSignButton()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({auth, profile}){
    return {
        isLoggedIn: auth.authenticated,
        profile: profile,
        isAdmin: auth.isAdmin
    }
}

export default connect(mapStateToProps, {getUserProfile})(Navbar)