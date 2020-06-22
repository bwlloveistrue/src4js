import React from "react";
import { Row, Col } from "antd";
import classNames from "classnames";

class LayoutCol extends React.Component {
  static defaultProps = {
    col: 2,
    showBtnL: true,
    showBtnM: true
  };
  constructor(props) {
    super(props);
    this.state = {
      showLeft: props.showLeft === undefined ? true : props.showLeft,
      showMid: props.showMid === undefined ? true : props.showMid
    };
  }
  componentDidMount() {
    const { showLeft, showMid } = this.props;
    this.setState({
      showLeft: showLeft === undefined ? true : showLeft,
      showMid: showMid === undefined ? true : showMid
    });
  }
  componentWillReceiveProps(nextPorps) {
    const { showLeft: l, showMid: m } = this.state;
    const { showLeft, showMid } = nextPorps;

    const newState = {};
    if (showLeft !== undefined && l !== showLeft) {
      newState.showLeft = showLeft;
    }
    if (showMid !== undefined && m !== showMid) {
      newState.showMid = showMid;
    }
    Object.keys(newState).length > 0 && this.setState(newState);
  }
  onCollapse = (side, e) => {
    const { onCollapse, col } = this.props;
    const { showLeft, showMid } = this.state;
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
  render() {
    const prefixCls = "wea-left-right-layout";
    const { showLeft, showMid } = this.state;
    const {
      col,
      children,
      leftCom,
      midCom,
      showBtn,
      showBtnL,
      showBtnM,
      showTitleL,
      showTitleM,
      titleLeft,
      titleMiddle,
      className = "",
      style
    } = this.props;
    const classNameL = classNames({
      [`${prefixCls}-btn`]: true,
      [`${prefixCls}-btn-hide`]: !showLeft,
      [`${prefixCls}-btn-show`]: showLeft
    });
    const classNameM = classNames({
      [`${prefixCls}-btn`]: true,
      [`${prefixCls}-btn-hide`]: !showMid,
      [`${prefixCls}-btn-show`]: showMid
    });
    const openCol = { xs: 8, sm: 7, md: 6, lg: 5 };
    const closeCol = { xs: 0, sm: 0, md: 0, lg: 0 };
    const leftCol = showLeft ? { ...openCol } : { ...closeCol };
    const midCol = col === 3 && showMid ? { ...openCol } : { ...closeCol };
    const rightCol = {
      xs: 24 - leftCol.xs - midCol.xs,
      sm: 24 - leftCol.sm - midCol.sm,
      md: 24 - leftCol.md - midCol.md,
      lg: 24 - leftCol.lg - midCol.lg
    };
    const titleleft = showTitleL ? { title: titleLeft } : {};
    const titlemiddle = showTitleM ? { title: titleMiddle } : {};
    return (
      <Row className={`${prefixCls} ${className}`} style={style}>
        <Col {...leftCol} className={`${prefixCls}-left`}>
          {leftCom}
        </Col>
        <Col {...midCol} className={`${prefixCls}-left ${prefixCls}-right`}>
          {col === 3 && showBtnL && showMid && (
            <div
              className={classNameL}
              onClick={e => this.onCollapse("left", e)}
              {...titleleft}
            />
          )}
          {midCom}
        </Col>
        <Col {...rightCol} className={`${prefixCls}-right`}>
          {col === 2 && showBtn && (
            <div
              className={classNameL}
              onClick={e => this.onCollapse("left", e)}
              {...titleleft}
            />
          )}
          {col === 3 && showBtnM && (
            <div
              className={classNameM}
              onClick={e => this.onCollapse("middle", e)}
              {...titlemiddle}
            />
          )}
          {children}
        </Col>
      </Row>
    );
  }
}

export default LayoutCol;