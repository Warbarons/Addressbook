import React, { Component } from 'react';
import AddressList from './components/AddressList.jsx';
import { connect } from "react-redux";
import {addContact, deleteContact} from "../actions/contactActions";
import PropTypes from "prop-types";

const mapStateToProps = state => (
    { contacts: state.contacts }
);

const mapDispatchToProps = {addContact, deleteContact};

class Addressbook extends Component {
    render() {
        return (
            <div className="abContainer">
                <h2 className="headline">Addressbook</h2>
                <div className="flex15">Firstname</div>
                <div className="flex15">Lastname</div>
                <div className="flex25">Email</div>
                <div className="flex25">Country</div>
                <div className="flex10">Edit</div>
                <div className="flex10">Delete</div>
                <AddressList
                    deleteContact={this.props.deleteContact}
                    addressbook={this.props.contacts}
                    history={this.props.history} />
            </div>
        );
    }
}

Addressbook.propTypes = {
    contacts: PropTypes.array.isRequired,
    deleteContact: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Addressbook);
