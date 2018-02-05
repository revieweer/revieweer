import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {signUserIn,signinReset} from '../../actions';
import CenterCard363 from '../centerCard363';

class Signin extends Component {
    componentWillMount(){
        this.props.signinReset();
    }
    componentWillUnmount(){
        this.props.signinReset();
    }
    handleFormSubmit(d) {
        this.props.signUserIn(d);
        this.props.change('password', '');
    }
    render() {
        const {handleSubmit, emailStateError, passwordError, normalError, signinReset} = this.props;
        return (
            <CenterCard363>
                <div className='card'>
                <h4 className="card-header">
                    Signin Your Revieweer
                </h4>
                    <img src='../../assets/logo-sm.png' style={{'margin': '10px auto', 'transform': 'scale(0.6)'}}/>
                    <div className="card-body">
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} onChange={signinReset}>
                        <div className="form-group">
                            <label>
                                Email: {emailStateError&&<span className='danger-hint'>{emailStateError}</span>}
                            </label>
                            <Field
                                type= 'email'
                                name="email"
                                component="input"
                                className={`form-control form-control-lg ${(emailStateError)?'is-invalid':''}`}
                                placeholder="sample@mail.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Password: {passwordError&&<span className='danger-hint'>{passwordError}</span>}
                            </label>
                            <Field
                                type= 'password'
                                name="password"
                                component="input"
                                className={`form-control form-control-lg ${(passwordError)?'is-invalid':''}`}
                                placeholder="password"
                            />
                        </div>
                        {normalError && <div className='alert alert-warning'>
                            {normalError}
                        </div>}
                        <div style={{'paddingTop': '30px'}}>
                            <button type="submit" className="btn btn-lg btn-light btn-block">Sign in</button>
                        </div>
                        <div style={{'paddingTop': '20px'}}>
                            <Link to='/signup' className="btn btn-link btn-block">Haven't had an account? signup now</Link>
                        </div>
                    </form>
                    </div>
                </div>
            </CenterCard363>
        );
    }
}

function mapStateToProps({signin}) {
    const {emailStateError, passwordError, normalError} = signin;
    return {
        emailStateError, passwordError, normalError
    }
}

export default connect(mapStateToProps, {signinReset,signUserIn})(reduxForm({
    form: 'signin'
})(Signin));