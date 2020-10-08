import React from 'react';
import { connect } from 'react-redux';

import { clearProducts, purchaseEnd } from '../actions';
import { calculatePrice } from '../utils/helpers';
import validators from '../utils/validators';

import Field from './Field';
import './Shipping.css';

const shippingOptions = [
  { label: 'Free shipping', value: '0' },
  { label: 'Express shipping - additional 9.99 €', value: '9.99' },
  { label: 'Courier shipping - additional 19.99 €', value: '19.99' }
];

const fields = [
  {
    name: 'name',
    label: 'Name*',
    validate: [validators.required, validators.lengthRange(3, 50)]
  },
  {
    name: 'address',
    label: 'Address*',
    validate: [validators.required, validators.lengthRange(5, 100)]
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'youremail@example.com',
    validate: [validators.isEmail]
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '+380',
    validate: [validators.isPhone]
  }
];

class Shipping extends React.Component {
  state = {
    fields: {
      name: '',
      email: '',
      address: '',
      shippingType: '0',
      phone: ''
    },

    errorFields: new Set()
  };

  onFieldChange = (name, value) => {
    this.setState(state => ({
      fields: { ...state.fields, [name]: value }
    }));
  };

  onInputError = (field, error) => {
    const errorFields = this.state.errorFields;

    if (error) {
      errorFields.add(field);
    } else {
      errorFields.delete(field);
    }

    this.setState({
      errorFields
    });
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.errorFields.size) return;

    this.props.clearProducts();
    this.props.purchaseEnd();
    this.props.history.push('/success');
  };

  renderOptions(options) {
    return options.map(item => (
      <option value={item.value} key={item.value}>
        {item.label}
      </option>
    ));
  }

  renderSelect = ({ meta }) => {
    const freeShipping = calculatePrice(this.props.products) > 300;

    return (
      <div className="form-field">
        <label className="form-field__label">{meta.label}</label>
        <select
          name={meta.name}
          className="form-field__input form-field__input--select"
          onChange={meta.onChange}
          value={freeShipping ? '0' : this.state.fields.shippingType}
          disabled={freeShipping}
        >
          {this.renderOptions(meta.options)}
        </select>
      </div>
    );
  };

  renderError(error) {
    return error ? <span className="form-field__error">{error}</span> : null;
  }

  renderInput = ({ error, meta }) => {
    const className = `form-field__input ${
      error ? 'form-field__input--invalid' : ''
    }`;
    const fieldName = `${meta.name}-field`;
    const attributes = {
      placeholder: meta.placeholder,
      type: meta.type,
      value: meta.value,
      onChange: meta.onChange,
      onBlur: meta.onChange
    };

    return (
      <div className="form-field">
        <label className="form-field__label" htmlFor={fieldName}>
          {meta.label}
        </label>
        <div>
          <input
            {...attributes}
            id={fieldName}
            name={fieldName}
            className={className}
          />
          {this.renderError(error)}
        </div>
      </div>
    );
  };

  renderInputFields() {
    return fields.map(settings => {
      return (
        <Field
          {...settings}
          key={settings.name}
          value={this.state.fields[settings.name]}
          as={this.renderInput}
          onValueChange={this.onFieldChange}
          onValueError={this.onInputError}
        />
      );
    });
  }

  render() {
    return (
      <div className="shipping">
        <form
          className="form"
          action="/"
          method="post"
          onSubmit={this.onFormSubmit}
        >
          {this.renderInputFields()}
          <Field
            name="shippingType"
            label="Shipping options"
            options={shippingOptions}
            as={this.renderSelect}
            onValueChange={this.onFieldChange}
          />
          <button
            className="form__btn btn"
            type="submit"
            disabled={!!this.state.errorFields.size}
          >
            Pay
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.data || []
});

export default connect(mapStateToProps, {
  clearProducts,
  purchaseEnd
})(Shipping);
