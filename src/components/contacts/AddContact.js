import React, { Component } from 'react';
import {Consumer} from '../../context';
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';

class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    };

    onChange = e => this.setState({
        [e.target.name] : e.target.value
    });

    onSubmit = (dispatch, e) => {
        e.preventDefault();
        //deconstruct
        const {name, email, phone} = this.state;

        //check for errors
        if(name === ''){
            this.setState({errors: {
                name: 'Name is required'
            }});
            return;
        }
        if(email === ''){
            this.setState({errors: {
                email: 'Email is required'
            }})
            return;
        }
        if(phone === ''){
            this.setState({errors: {
                phone: 'Name is required'
            }})
            return;
        }

        //build new contact
        const newContact = {
            id: uuid(),
            name,
            email,
            phone,
            errors: {

            }
        }
        
        //add contact
        dispatch({type: 'ADD_CONTACT', payload: newContact});

        //clear state
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        })

        //redirect back to home page
        this.props.history.push('/');
    }

    render() {
        const {name, email, phone, errors} = this.state;

        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return(
                        <div className="card mb-3">
                            <div className="card-header">
                                Add Contact
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup
                                        label="Name"
                                        name="name"
                                        value={name}
                                        error={errors.name}
                                        placeholder="Full Name"
                                        onChange={this.onChange}/>
                                    <TextInputGroup
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        error={errors.email}
                                        placeholder="Email Address"
                                        onChange={this.onChange}/>
                                    <TextInputGroup
                                        label="Phone"
                                        name="phone"
                                        value={phone}
                                        error={errors.phone}
                                        placeholder="123-456-7890"
                                        onChange={this.onChange}/>
                                    <input type="submit" value="Add Contact" className="btn btn-primary btn-block"/>
                                </form>
                            </div>
                        </div>

                    )
                }}
            </Consumer>
        )
    }
}

export default AddContact;