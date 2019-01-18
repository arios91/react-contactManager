import React, {Component} from 'react';

const Context = React.createContext();
const reducer = (state, action) => {
    switch(action.type){
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            };
        case 'ADD_CONTACT':
            return{
                ...state,
                contacts: [action.payload, ...state.contacts]
            };
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        contacts: [
            {
                id: 1,
                name: "John Doe",
                email: "Jdoe@gmail.com",
                phone: '123-456-7890'
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "jSmith@gmail.com",
                phone: '956-789-4582'
            },
            {
                id: 3,
                name: "Karen Williams",
                email: "kWilliams@gmail.com",
                phone: '120-756-0489'
            }
        ],

        dispatch: action => this.setState(state => reducer(state, action))
    }

    render(){
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;