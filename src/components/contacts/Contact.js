import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Consumer} from '../../context'
import axios from 'axios';


class Contact extends Component {
    state = {
        showContactInfo: true
    };

    onShowClick = e => {
        this.setState({showContactInfo: !this.state.showContactInfo})
    };

    //on arrow functions, the 'async' goes before the params instead of before the function name
    onDeleteClick = async (id, dispatch) => {
        //dont need to create a const res variable since the delete call isn't giving anything back
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        //call dispatch to delete
        dispatch({type: 'DELETE_CONTACT', payload: id})
    };

    render() {
        const {id, name, email, phone} = this.props.contact;
        const {showContactInfo} = this.state;

        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4>
                                {name}
                                <i  style={{cursor : 'pointer'}}
                                    className="fas fa-sort-down"
                                    onClick={this.onShowClick}/>
                                <i  style={{cursor : 'pointer', float: 'right', color: 'red'}}
                                    className="fas fa-times"
                                    onClick={this.onDeleteClick.bind(this, id, dispatch)}/>
                                <Link to={`contact/edit/${id}`}>
                                    <i  style={{cursor : 'pointer', float: 'right', color: 'black'}}
                                        className="fas fa-pencil-alt mr-3"></i>
                                </Link>
                            </h4>
                            {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>
                            ) : null}
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default Contact;