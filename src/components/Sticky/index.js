import { Component } from 'react';
import './index.scss';

class Sticky extends Component {
  render() {
    const {
      holderHeight,
      isSticky
    } = this.props;

    const height = isSticky ? holderHeight : 0;
    const fixedClass = isSticky ? 'fixed' : '';

    return (
      <div className="sticky">
        <div className="sticky__holder" style={{ height }}></div>
        <div className={`sticky__content ${fixedClass}`}>{this.props.children}</div>
      </div>
    );
  }
}

export default Sticky;
