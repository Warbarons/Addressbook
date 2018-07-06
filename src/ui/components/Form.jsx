import React, {Component} from 'react';
import PropTypes from "prop-types";

class Form extends Component {
    constructor() {
        super();
        this.submitHandler = this.submitHandler.bind(this);
    }

    validate () {
        if (this.form.checkValidity() === false) {
            for (let i = 0; i < this.form.length; i++) {
                const error = this.form[i].parentNode.querySelector('.form-feedback');

                if (error && this.form[i].nodeName.toLowerCase() !== 'button') {
                    if (!this.form[i].validity.valid) {
                        error.textContent = this.form[i].validationMessage;
                    } else {
                        error.textContent = '';
                    }
                }
            }

            return false;
        } else {
            for(let i = 0; i < this.form.length; i++) {
                const error = this.form[i].parentNode.querySelector('.form-feedback');
                if (error && this.form[i].nodeName.toLowerCase() !== 'button') {
                    error.textContent = '';
                }
            }

            return true;
        }
    };

    submitHandler(event) {
        event.preventDefault();
        if (this.props.action === 'save') {
            if (this.validate()) {
                this.props.save();
                document.getElementById('save-success').innerText = 'Save successful';
            }
        } else if (this.props.action === 'delete') {
            this.props.delete();
            document.getElementById('save-success').innerText = 'Contact removed';
        }
        if (!this.validate()) {
            document.getElementById('save-success').innerText = '';
        }
    }

    render() {
        return (
            <form className="abContainer" noValidate ref={form => (this.form = form)} onSubmit={this.submitHandler}>
                {this.props.children}
            </form>
        );
    }
}

Form.propTypes = {
    save: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired
};

export default Form;
