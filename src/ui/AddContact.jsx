import React, {Component} from 'react';
import { addContact, editContact, deleteContact } from '../actions/contactActions'
import { connect } from "react-redux";
import uuidv1 from "uuid";
import PropTypes from "prop-types";
import Form from './components/Form.jsx';
import Countries from 'country-list';
const countries = new Countries();
const countryList = ['Select country'].concat(countries.getNames());

const mapStateToProps = (state, props) => (
    {
        contact: state.contacts.find((contact) => {
            return contact.id === props.match.params.id
        })
    }
);

const mapDispatchToProps = {addContact, editContact, deleteContact};

class AddForm extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            firstname: this.props.contact ? this.props.contact.firstname : '',
            lastname: this.props.contact ? this.props.contact.lastname : '',
            email: this.props.contact ? this.props.contact.email : '',
            country: this.props.contact ? this.props.contact.country : '',
            id: this.props.contact ? this.props.contact.id : '',
            action: ''
        };
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleAdd(event) {
        if (this.props.contact !== undefined) {
            this.saveContact();
        } else {
            this.addContact();
        }
    };

    handleDelete(e) {
        this.props.deleteContact(this.state.id);
        this.clearForm();
        this.props.history.push('/addcontact');
    }

    saveContact() {
        this.props.editContact(this.state);
    }

    addContact() {
        let data = this.state;
        data.id = uuidv1();
        this.props.addContact(this.state);
        this.clearForm();
    }

    clearForm() {
        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            country: '',
            id: '',
            action: ''
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id && this.props.match.params.id === undefined) {
            this.clearForm();
        }
    }

    countryOptions() {
        return countryList.map((country, index) => {
            return (<option value={countries.getCode(country) ? countries.getCode(country) : ""} key={index}>{country}</option>);
        });
    }

    render() {
        return (
            <Form save={this.handleAdd} delete={this.handleDelete} action={this.state.action}>
                <h2 className="headline">Add contact</h2>
                <div className="flex25">Firstname</div>
                <div className="flex75">
                    <input type="text" name="firstname" minLength={2} value={this.state.firstname} onChange={this.handleChange} required={true} />
                    <div className="form-feedback" />
                </div>
                <div className="flex25">Lastname</div>
                <div className="flex75">
                    <input type="text" name="lastname" minLength={2} value={this.state.lastname} onChange={this.handleChange} required={true} />
                    <div className="form-feedback" />
                </div>
                <div className="flex25">E-mail</div>
                <div className="flex75">
                    <input type="email" name="email"value={this.state.email} onChange={this.handleChange} required={true} />
                    <div className="form-feedback" />
                </div>
                <div className="flex25">Country</div>
                <div className="flex75">
                    <select  name="country" value={this.state.country} onChange={this.handleChange} required={true}>
                        {this.countryOptions()}
                    </select>
                    <div className="form-feedback" />
                </div>
                <div className="flex25" />
                <div className="flex75">
                    <button name="action" onClick={this.handleChange} value="save">Save contact</button>
                    {this.props.contact && <button name="action" onClick={this.handleChange} value="delete">Remove contact</button>}
                    <div id="save-success" className="form-feedback" />
                </div>
            </Form>
        );
    }
}

AddForm.propTypes = {
    editContact: PropTypes.func.isRequired,
    addContact: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
