import React from "react";
// import { findDOMNode } from 'react-dom';
import { Row, Col } from "antd";
import classNames from "classnames";

class Layout extends React.Component {
  static defaultProps = {
    leftWidth: 260,
    leftFixed: false,
    showBtn: true
  };
  constructor(props) {
    super(props);
    this.initShowLeft = props.leftFixed
      ? false
      : props.showLeft === undefined
      ? true
      : props.showLeft;
    this.state = {
      showLeft: this.initShowLeft
    };
  }
  componentDidMount() {
    this.setState({ showLeft: this.initShowLeft });
  }
  componentWillReceiveProps(nextPorps) {
    const { showLeft: l } = this.state;
    const { showLeft } = nextPorps;

    if (showLeft !== undefined && l !== showLeft) {
      this.setState({ showLeft });
    }
  }
  onCollapse = e => {
    const { onCollapse } = this.props;
    const { showLeft } = this.state;
    this.setState({ showLeft: !showLeft });
    typeof onCollapse === "function" && onCollapse(!showLeft);
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.preventDefault();
  };
  getLeftWidth() {
    const { leftWidth } = this.props;
    const style = {};
    if (typeof leftWidth === "number") {
      style.width = leftWidth;
      style.marginLeft = -leftWidth;
    } else if (typeof leftWidth === "string" && leftWidth.indexOf("%") > 0) {
      const persent = Number(leftWidth.replace("%", ""));
      const width = `${(persent * 100) / (100 - persent)}%`;
      style.width = width;
      style.marginLeft = `-${width}`;
    }
    return style;
  }
  getPaddingLeft() {
    const { showLeft } = this.state;
    const { leftWidth, leftFixed } = this.props;
    return leftFixed ? 0 : showLeft ? leftWidth : 0;
  }
  render() {
    const prefixCls = "wea-left-right-layout";
    const { showLeft } = this.state;
    const {
      children,
      leftCom,
      showBtn,
      leftFixed,
      leftWidth,
      btnTitle,
      className = "",
      style
    } = this.props;
    const leftWidthStyle = this.getLeftWidth();
    const leftFixedStyle = leftFixed
      ? {
          position: "absolute",
          left: showLeft ? leftWidth : 0,
          transition: "left .1s ease-in-out"
        }
      : {};
    const classnames = classNames({
      [`${prefixCls}-btn`]: true,
      [`${prefixCls}-btn-hide`]: !showLeft,
      [`${prefixCls}-btn-show`]: showLeft
    });
    const paddingLeft = this.getPaddingLeft();
    return (
      <Row
        ref="layout"
        className={`${prefixCls} ${className}`}
        style={{ paddingLeft, ...style }}
      >
        <Col
          className={`${prefixCls}-left`}
          style={{ ...leftWidthStyle, ...leftFixedStyle }}
        >
          {leftCom}
        </Col>
        <Col span={24} className={`${prefixCls}-right`}>
          {showBtn && (
            <div
              className={classnames}
              onClick={this.onCollapse}
              style={leftFixedStyle}
              {...btnTitle}
            />
          )}
          {children}
        </Col>
      </Row>
    );
  }
}

export default Layout;