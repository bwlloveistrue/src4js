import React from "react";
import { Row, Col } from "antd";
import classNames from "classnames";

class LayoutResize extends React.Component {
  static defaultProps = {
    col: 2
  };
  constructor(props) {
    super(props);
    this.state = {
      showLeft: props.showLeft === undefined ? true : props.showLeft,
      leftWidth: props.leftWidth,
      leftMinWidth: 20,
      leftMaxWidth: 600
    };
  }
  componentDidMount() {
    const { showLeft, leftWidth } = this.props;
    this.setState({
      showLeft: showLeft === undefined ? true : showLeft,
      leftWidth: leftWidth === undefined ? true : leftWidth
    });
  }
  componentWillReceiveProps(nextProps) {
    const { showLeft: l, leftWidth: w } = this.state;
    const { showLeft, leftWidth } = nextProps;

    const newState = {};
    if (showLeft !== undefined && l !== showLeft) {
      newState.showLeft = showLeft;
    }
    if (leftWidth !== undefined && w !== leftWidth) {
      newState.leftWidth = leftWidth;
    }
    Object.keys(newState).length > 0 && this.setState(newState);
  }
  onCollapse = (side, e) => {
    const { onCollapse, col } = this.props;
    const { showLeft } = this.state;
    const arr = [side === "left" ? !showLeft : !showMid];
    if (col === 3) arr.unshift(side);
    this.setState(
      side === "left" ? { showLeft: !showLeft } : { showMid: !showMid }
    );
    typeof onCollapse === "function" && onCollapse(...arr);
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.preventDefault();
  };

  onStart = () => {};
  onDrag = (ev, ui) => {
    this.setState(
      {
        leftWidth: ui.x
      },
      () => {
        const { onDrag } = this.props;
        typeof onDrag == "function" && onDrag(ui.x);
      }
    );
  };
  render() {
    const prefixCls = "wea-left-right-layout";
    const { leftWidth, leftMinWidth, leftMaxWidth, showLeft } = this.state;
    const {
      col,
      leftCom,
      children,
      showBtn,
      titleLeft,
      showTitleL,
      className = "",
      style
    } = this.props;
    const classNameL = classNames({
      [`${prefixCls}-btn`]: true,
      [`${prefixCls}-btn-hide`]: !showLeft,
      [`${prefixCls}-btn-show`]: showLeft
    });
    const openCol = { xs: 8, sm: 7, md: 6, lg: 5 };
    const closeCol = { xs: 0, sm: 0, md: 0, lg: 0 };
    const leftCol = showLeft ? { ...openCol } : { ...closeCol };
    const titleleft = showTitleL ? { title: titleLeft } : {};
    const leftWidthstyle = {};
    leftWidthstyle.width = leftWidth;
    return (
      <Row className={`${prefixCls} ${className}`} style={style}>
        <Col
          {...leftCol}
          className={`${prefixCls}-left`}
          style={{ width: leftWidthstyle.width + 4 }}
        >
          {leftCom}
        </Col>
        <Col className={`${prefixCls}-right`}>
          {col === 2 && showBtn && (
            <div
              className={classNameL}
              onClick={e => this.onCollapse("left", e)}
              {...titleleft}
            />
          )}
          {children}
        </Col>
      </Row>
    );
  }
}
export default LayoutResize;



// WEBPACK FOOTER //
// ./ecology9/wea-left-right-layout/LayoutResize.js