import React from 'react';
import SelectControlSingleValue from './SelectControlSingleValue';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { getValueAndAncestorsFromTree } from '../../../utils';

import CategoryField from "./CategoryField";

const styles = theme => ({});

class MultiFields extends React.Component {
  state = {
    fieldValues: []
  };

  textFieldValueError = this.props.field.subfields
    ? Object.values(this.props.field.subfields).reduce((a, v) => {
        a[v.name] = { value: "", error: !"".match(v.regexValidation) };
        return a;
      }, {})
    : false;

  selectValue = {
    leafkey: {
      value: ""
    }
  };

  handleClickAdd = e => {
    const fieldValues = [...this.state.fieldValues];
    fieldValues.push({
      ...JSON.parse(JSON.stringify(this.textFieldValueError)),
      ...JSON.parse(JSON.stringify(this.selectValue))
    });

    this.setState({
      fieldValues
    });
  };

  handleClickRemove = index => e => {
    const length = this.state.fieldValues.length;
    if (index === 0 && length === 1) {
      this.setState({
        fieldValues: [
          {
            ...JSON.parse(JSON.stringify(this.textFieldValueError)),
            ...JSON.parse(JSON.stringify(this.selectValue))
          }
        ]
      });
      this.props.handleChange(null, false);
    } else {
      const fieldValues = this.state.fieldValues.filter(
        (fieldValue, loop_index) => loop_index !== index
      );
      this.setState({
        fieldValues
      });
      this.checkErrorAndPropagateResToParent(fieldValues);
    }
  };

  checkErrorAndPropagateResToParent = values => {
    let res = [];
    let textFieldErrors = false;
    Object.values(values).forEach((obj, index) => {
      res.push({});
      Object.entries(obj).forEach(([key, value]) => {
        res[index][key] = value.value;
        if (value.error && values[index].leafkey.value) {
          textFieldErrors = true;
        }
      });
    });
    this.props.handleChange(res, textFieldErrors);
  };

  handleChangeSelect = index => (value, error) => {
    const fieldValues = [...this.state.fieldValues];
    fieldValues[index].leafkey.value = value;

    this.setState({
      fieldValues
    });
    this.checkErrorAndPropagateResToParent(fieldValues);
  };

  handleChangeTitleTextField = (index, field) => (value, error) => {
    const fieldValues = [...this.state.fieldValues];
    fieldValues[index][field.name].error = error;
    fieldValues[index][field.name].value = value;

    this.setState({
      fieldValues
    });
    this.checkErrorAndPropagateResToParent(fieldValues);
  };

  componentDidMount() {
    this.handleClickAdd();
  }

  render() {
    return (
      <>
        {this.state.fieldValues.map((fieldValue, index) => {
          return (
            <div key={index}>
              <CategoryField
                handleClickRemove={this.handleClickRemove(index)}
              />
              {index === this.state.fieldValues.length - 1 && (
                <div style={{ marginTop: this.props.theme.spacing(1.5) }}>
                  <Button
                    // disabled={this.props.error}
                    fullWidth
                    variant="outlined"
                    onClick={this.handleClickAdd}
                  >
                    add another category
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  }
}

export default {
  MultiFieldsWithStyles: withStyles(styles, { withTheme: true })(MultiFields),
  MultiFieldsOriginal: MultiFields
};
