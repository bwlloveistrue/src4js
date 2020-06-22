import React from "react";
import Layout from "./Layout";
import LayoutCol from "./LayoutCol";
import LayoutResize from "./LayoutResize";

class LeftRightLayout extends React.Component {
  static defaultProps = {
    col: 2,
    showBtn: true,
    showTitleL: false,
    showTitleM: false,
    resize: false,
    titleLeft: "",
    titleMiddle: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      showLeft: props.showLeft === undefined ? true : props.showLeft,
      showMid: props.showMid === undefined ? true : props.showMid
    };
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
  onCollapse(side, bool) {
    const { onCollapse, col } = this.props;
    this.setState(side === "left" ? { showLeft: bool } : { showMid: bool });
    const arr = [bool];
    if (col === 3) arr.unshift(side);
    typeof onCollapse === "function" && onCollapse(...arr);
  }
  render() {
    const {
      col,
      children,
      leftWidth,
      midWidth,
      showTitleL,
      showTitleM,
      titleLeft,
      titleMiddle,
      resize
    } = this.props;
    const titleleft = showTitleL ? { title: titleLeft } : {};
    const titlemiddle = showTitleM ? { title: titleMiddle } : {};
    if (col === 2) {
      return typeof leftWidth === "number" && !resize ? (
        <Layout {...this.props} btnTitle={titleleft} />
      ) : typeof leftWidth === "number" ? (
        <LayoutResize {...this.props} />
      ) : (
        <LayoutCol {...this.props} />
      );
    }

    if (col === 3) {
      const { showBtnL, showBtnM, midCom } = this.props;
      return typeof leftWidth === "number" && typeof midWidth === "number" ? (
        <Layout
          {...this.props}
          showLeft={this.state.showLeft}
          showBtn={showBtnL !== undefined ? showBtnL : this.state.showMid}
          onCollapse={bool => this.onCollapse("left", bool)}
          btnTitle={titleleft}
        >
          <Layout
            {...this.props}
            leftCom={midCom}
            leftWidth={midWidth}
            showBtn={showBtnM}
            showLeft={this.state.showMid}
            onCollapse={bool => this.onCollapse("middle", bool)}
            btnTitle={titlemiddle}
          >
            {children}
          </Layout>
        </Layout>
      ) : (
        <LayoutCol
          {...this.props}
          showMid={this.state.showMid}
          onCollapse={(side, bool) => this.onCollapse(side, bool)}
        />
      );
    }
    return null;
  }
}

export default LeftRightLayout;