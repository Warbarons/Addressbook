import React, {Component} from 'react';
import Countries from 'country-list';
import PropTypes from "prop-types";
const countries = new Countries();

class AddressItem extends Component {
    handleEdit(id) {
        this.props.history.push('/addcontact/' + id);
    };

    handleDelete(id) {
        this.props.deleteContact(id);
    }

    render () {
        return (
            <div className="abContainer">
                <div className="flex15">{this.props.item.firstname}</div>
                <div className="flex15">{this.props.item.lastname}</div>
                <div className="flex25">{this.props.item.email}</div>
                <div className="flex25">{countries.getName(this.props.item.country)}</div>
                <div className="flex10"><button onClick={this.handleEdit.bind(this, this.props.item.id)}>Edit</button></div>
                <div className="flex10"><button onClick={this.handleDelete.bind(this, this.props.item.id)}>Remove</button></div>
            </div>
        )
    }
}

AddressItem.propTypes = {
    history: PropTypes.object.isRequired,
    deleteContact: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

export default AddressItem;
