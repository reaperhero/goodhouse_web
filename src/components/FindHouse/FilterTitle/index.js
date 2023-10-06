import { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import './index.scss';

class FilterTitle extends Component {
  constructor() {
    super();
    this.state = {
      filterTitleItems: [
        {
          title: '区域',
          type: 'area'
        },
        {
          title: '方式',
          type: 'mode'
        },
        {
          title: '租金',
          type: 'price'
        },
        {
          title: '筛选',
          type: 'more'
        }
      ]
    };
  }

  render() {
    const { activeType, onOpen, selectedStatus } = this.props;
    const filterTitleItems = this.state.filterTitleItems;
    const activeClass = type => activeType === type || selectedStatus[type] ? 'active' : '';
    return (
      <Flex className="filter-title" align="center">
        {filterTitleItems.map(filterTitleItem =>
          <Flex.Item
            className={`filter-title__item ${activeClass(filterTitleItem.type)}`}
            key={filterTitleItem.title}
            onClick={() => onOpen(filterTitleItem.type)}
          >
            {filterTitleItem.title}
            <i className="iconfont icon-arrow"></i>
          </Flex.Item>
        )}
      </Flex>
    );
  }
}

FilterTitle.propTypes = {
  activeType: PropTypes.string,
  onOpen: PropTypes.func,
  titleSelectedStatuses: PropTypes.object
};

export default FilterTitle;
