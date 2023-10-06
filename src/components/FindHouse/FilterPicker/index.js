import { Component } from 'react';
import { PickerView } from 'antd-mobile';
import FilterFooter from '../FilterFooter';

class FilterPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }

  onCancel() {
    this.props.onCancel();
  }

  onConfirm() {
    this.props.onConfirm(this.state.value);
  }

  render() {
    const { data, cols } = this.props;
    return (
      <div className="filter-picker">
        <PickerView
          onChange={this.onChange}
          value={this.state.value}
          cols={cols}
          data={data}
        />
        <FilterFooter
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
      </div>
    );
  }
}

export default FilterPicker;
