import React from 'react';

import './Field.css';

class Field extends React.Component {
  static defaultProps = {
    name: '',
    type: 'text',
    value: '',
    placeholder: '',
    validate: [],
    onValueChange: () => {},
    onValueError: () => {}
  };

  state = {
    error: null
  };

  componentDidMount() {
    const { name, value, onValueError } = this.props;

    onValueError(name, this.getError(value));
  }

  getError(value) {
    const { validate, name } = this.props;

    for (let i = 0; i < validate.length; i++) {
      const validator = validate[i];
      const error = validator(value, name);

      if (error) {
        return error;
      }
    }

    return false;
  }

  onChange = evt => {
    const value = evt.target.value;
    const error = this.getError(value);

    if (error && this.state.error !== error) {
      this.setState({
        error
      });
    }

    if (!error && this.state.error) {
      this.setState({
        error: null
      });
    }

    this.props.onValueChange(this.props.name, value);
    this.props.onValueError(this.props.name, error);
  };

  render() {
    if (!this.props.as) return null;

    return this.props.as({
      meta: { ...this.props, onChange: this.onChange },
      error: this.state.error
    });
  }
}

export default Field;
