import { Component, createRef } from 'react';
import { Toast } from 'antd-mobile';
import { Spring } from 'react-spring/renderprops';
import FilterTitle from '../FilterTitle';
import FilterPicker from '../FilterPicker';
import FilterMore from '../FilterMore';
import api from '../../../utils/api';
import './index.scss';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      activeType: '',
      conditionsData: {},
      selectedData: {
        area: ['area', 'null'],
        mode: ['null'],
        price: ['null'],
        more: []
      }
    };
    this.filterMoreRef = createRef();
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onOpen(activeType) {
    this.setState({ activeType });
    if (activeType === 'more') {
      this.filterMoreRef.current.setState({ selectedValues: [...this.state.selectedData.more] });
    }
    document.body.classList.add('body-fixed');
  }

  onClose() {
    this.closePicker();
  }

  onCancel() {
    this.closePicker();
  }

  onConfirm(data) {
    console.log(1);
    const { selectedData, activeType } = this.state;
    this.setState({
      selectedData: {
        ...selectedData,
        [activeType]: data
      }
    }, () => {
      this.props.onFilter(this.state.selectedData)
    });
    this.closePicker();
  }

  closePicker() {
    this.setState({ activeType: '' });
    document.body.classList.remove('body-fixed');
  }

  async renderConditionsData(id) {
    const [err, res] = await api.getHousesCondition({ id });

    if (err) {
      Toast.fail('获取房屋查询信息失败');
      return;
    }

    this.setState({ conditionsData: res.data.body });
  }

  get titleSelectedStatus() {
    const selectedData = this.state.selectedData;
    const status = {
      area: false,
      mode: false,
      price: false,
      more: false
    };
    Object.keys(selectedData).forEach(key => {
      switch (key) {
        case 'area':
          status[key] = selectedData[key].join('') !== 'areanull';
          break;
        case 'mode':
        case 'price':
          status[key] = selectedData[key].join('') !== 'null';
          break;
        case 'more':
          status[key] = selectedData[key].length > 0;
          break;
        default:
          break;
      }
    });
    return status;
  }

  get renderFilterPicker() {
    const {
      activeType,
      conditionsData: { area, subway, rentType, price }
    } = this.state;
    const defaultValue = this.state.selectedData[activeType];
    let data = [];
    let cols = 3;

    switch (activeType) {
      case 'area':
        data = [area ? area : '无数据', subway ? subway : '无数据'];
        break;
      case 'mode':
        data = rentType ? rentType : ['无数据'];
        cols = 1;
        break;
      case 'price':
        data = price ? price : ['无数据'];
        cols = 1;
        break;
      default:
        break;
    }

    return (
      <FilterPicker
        key={activeType}
        data={data}
        cols={cols}
        defaultValue={defaultValue}
        onCancel={this.onCancel}
        onConfirm={this.onConfirm}
      />
    );
  }

  get renderFilterMore() {
    const { roomType, oriented, floor, characteristic } = this.state.conditionsData;
    const defaultValue = this.state.selectedData.more;
    const activeType = this.state.activeType
    const isOpen = activeType === 'more';
    return (
      <FilterMore
        defaultValue={[...defaultValue]}
        onClose={this.onClose}
        onConfirm={this.onConfirm}
        isOpen={isOpen}
        ref={this.filterMoreRef}
        data={{
          roomType,
          oriented,
          floor,
          characteristic
        }}
      />
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.renderConditionsData(this.props.id);
    }
  }

  render() {
    const activeType = this.state.activeType;
    const isActiveComponent = ['area', 'mode', 'price'].indexOf(activeType) !== -1;

    return (
      <div className="filter">
        <Spring from={{ opacity: 0 }} to={{ opacity: isActiveComponent ? 1 : 0 }}>
          {props => {
            if (props.opacity === 0) {
              return null
            }
            return <div className="filter-mask" style={props} onClick={this.onClose}></div>;
          }}
        </Spring>
        <div className="filter-content">
          <FilterTitle
            onOpen={this.onOpen}
            activeType={activeType}
            selectedStatus={this.titleSelectedStatus}
          />
          {isActiveComponent ? this.renderFilterPicker : null}
          {this.renderFilterMore}
        </div>
      </div>
    );
  }
}

export default Filter;
