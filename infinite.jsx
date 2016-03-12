import React, { Children, Component } from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';

class InfiniteScroll extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    nextPage: React.PropTypes.func.isRequired,
    threshold: React.PropTypes.number
  };
  componentDidMount() {
    this.throttledScroll = throttle(this.onScroll.bind(this), 500);
    window.addEventListener('scroll', this.throttledScroll, false);
    window.addEventListener('resize', this.throttledScroll, false);
    this.onScroll();
  }
  componentDidUpdate() {
    this.throttledScroll();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScroll, false);
    window.removeEventListener('resize', this.throttledScroll, false);
  }
  onScroll() {
    const windowBottom = window.scrollY + window.innerHeight;
    const node = ReactDOM.findDOMNode(this);
    const nodeBottom = node.offsetTop + node.offsetHeight;
    const delta = nodeBottom - windowBottom;
    if (delta < this.props.threshold) {
      this.props.nextPage();
    }
  }
  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

export default InfiniteScroll;
