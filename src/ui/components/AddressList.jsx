import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddressItem from './AddressItem.jsx';

class AddressList extends Component {
    drawItem() {
        return this.props.addressbook.map((item) =>
            (<AddressItem
                key={item.id}
                item={item}
                history={this.props.history}
                deleteContact={this.props.deleteContact}/>
            )
        )
    }

    render() {
        return (
            <div>
                {this.drawItem()}
            </div>
        );
    }
}

AddressList.propTypes = {
    history: PropTypes.object.isRequired,
    deleteContact: PropTypes.func.isRequired,
    addressbook: PropTypes.array.isRequired
};

export default AddressList;