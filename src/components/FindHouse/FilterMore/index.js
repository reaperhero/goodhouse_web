import { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import FilterFooter from '../FilterFooter';
import './index.scss';

export class FilterMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: props.defaultValue
    };
  }

  activeClass(value) {
    const selectedValues = this.state.selectedValues;
    return selectedValues.indexOf(value) !== -1 ? 'active' : '';
  }

  renderData(data) {
    if (data) {
      return data.map(item => {
        return (
          <span
            className={`filter-more__tag ${this.activeClass(item.value)}`}
            key={item.value}
            onClick={this.handleClick.bind(this, item.value)}
          >{item.label}</span>
        );
      });
    }
    return null;
  }

  handleClick(value) {
    const selectedValues = this.state.selectedValues;
    const selectedIndex = selectedValues.indexOf(value);

    if (selectedIndex === -1) {
      selectedValues.push(value);
    } else {
      selectedValues.splice(selectedIndex, 1);
    }

    this.setState({
      selectedValues
    });
  }

  render() {
    const { onClose, data, onConfirm, isOpen } = this.props;
    const {
      roomType,
      oriented,
      floor,
      characteristic
    } = data;

    return (
      <div className="filter-more">
        <Spring to={{ opacity: isOpen ? 1 : 0 }}>
          {props => {
            if (props.opacity === 0) {
              return null;
            }
            return <div className="filter-more__mask" onClick={() => {
              onClose();
              this.forceUpdate();
            }} style={props}></div>;
          }}
        </Spring>
        <Spring to={{ transform: `translate(${isOpen ? '0px' : '100%'}, 0px)` }}>
          {props =>
            <>
              <dl className="filter-more__list" style={props}>
                <dt>户型</dt>
                <dd>{this.renderData(roomType)}</dd>
                <dt>朝向</dt>
                <dd>{this.renderData(oriented)}</dd>
                <dt>楼层</dt>
                <dd>{this.renderData(floor)}</dd>
                <dt>房屋亮点</dt>
                <dd>{this.renderData(characteristic)}</dd>
              </dl>
              <FilterFooter
                className="filter-more__footer"
                style={props}
                onCancel={() => this.setState({ selectedValues: [] })}
                onConfirm={() => onConfirm(this.state.selectedValues)}
                cancelText="清除"
              />
            </>}
        </Spring>
      </div>
    );
  }
}

export default FilterMore;
