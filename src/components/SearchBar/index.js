import { withRouter } from 'react-router-dom';
import { Flex } from 'antd-mobile';
import './index.scss';

function SearchBar(props) {
  const cityName = props.cityName;
  const mapIconColor = props.mapIconColor || null;

  return (
    <Flex className="search-bar" style={props.style}>
      <Flex  className="search-bar__search">
        <div className="city" onClick={() => props.history.push('/citylist')}>
          <span>{cityName}</span>
          <i className="iconfont icon-arrow"></i>
        </div>
        <div className="address">
          <i className="iconfont icon-seach"></i>
          <span>请输入小区或地址</span>
        </div>
      </Flex>
      <i
        className="search-bar__map iconfont icon-map"
        style={{ color: mapIconColor }}
        onClick={() => props.history.push('/map')}
      ></i>
    </Flex>
  );
}

const SearchBarWithRouter = withRouter(SearchBar);

export default SearchBarWithRouter;
