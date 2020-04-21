import React from "react";
import { Modal, Row, Col, Button } from "antd";
import isEqual from "../Tools/isEqual";
import isString from "lodash/isString";
// import isEmpty from "lodash/isEmpty";
import NewScroll from "../NewScroll";
import isFunction from "lodash/isFunction";
import WindowFunc from "../Tools/window";
import $ from 'jquery'

function noop() {}

const getModuleRender = (modules = {}, key, content, context) => {
  const module = modules[key];
  if (module) {
    if (typeof module === "function") {
      content = module(context);
    }
    content = module;
  }
  return content;
}

class NewDialog extends React.Component {
  static defaultProps = {
    style: { width: 520, height: 400 },
    icon: "icon-coms-ModelingEngine",
    maskClosable: false,
    closable: true,
    mask: true,
    iconBgcolor: "#2db7f5",
    iconFontColor: "#fff",
    draggable: true,
    overflowHidden: true,
    resize: false
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalBody: "",
      title: props.title || "",
      url: props.url || "",
      style: props.style,
      icon: props.icon,
      closable: props.closable,
      buttons: props.buttons || [],
      maskClosable: props.maskClosable,
      iconBgcolor: props.iconBgcolor,
      iconFontColor: props.iconFontColor,
      path:
        window.location.hash &&
        window.location.hash.split("#/")[1].split("?")[0],
      height: this.calcHeight(props.style.height),
      percent: 80,
      end: true,
      moreBtn: props.moreBtn
    };
    this.instanceIsMounted = false;
    this.onCancel = this.onCancel.bind(this);
    this.onScale = this.onScale.bind(this);
    this.id = `wdg${new Date().getTime()}`;

    this.loadCss = false;
  }
  componentWillUnmount() {
    this.instanceIsMounted = false;
    if (window[this.id]) {
      window[this.id] = null;
    }
  }
  componentWillReceiveProps(nextProps) {
    if ("visible" in nextProps) {
      let newState = { visible: nextProps.visible };
      if (nextProps.visible !== this.props.visible && !nextProps.visible) {
        newState = {
          ...newState,
          height: this.calcHeight(nextProps.style.height)
        };
      }
      this.setState(newState);
    }
    if (this.props.url !== nextProps.url) {
      this.setState({ url: nextProps.url });
    }
    if (!isEqual(this.props.style, nextProps.style)) {
      this.setState({
        style: nextProps.style,
        height: this.calcHeight(nextProps.style.height)
      });
    }
    if ("buttons" in this.props) {
      this.setState({ buttons: nextProps.buttons });
    }
    if (this.props.title !== nextProps.title) {
      this.setState({ title: nextProps.title });
    }
    if (this.props.icon !== nextProps.icon) {
      this.setState({ icon: nextProps.icon });
    }
    if (this.props.iconBgcolor !== nextProps.iconBgcolor) {
      this.setState({ iconBgcolor: nextProps.iconBgcolor });
    }
    if (this.props.iconFontColor !== nextProps.iconFontColor) {
      this.setState({ iconFontColor: nextProps.iconFontColor });
    }
    const { loading } = this.props;
    if (!loading && nextProps.loading) {
      this.timer = setInterval(() => {
        const percent = this.state.percent;
        const newP = percent < 96 ? percent + 1 : 96;
        this.instanceIsMounted && this.setState({ end: false, percent: newP });
      }, 10);
    } else if (loading && !nextProps.loading) {
      this.setState({ percent: 100 });
      this.timer && clearInterval(this.timer);
      setTimeout(() => {
        this.instanceIsMounted && this.setState({ percent: 80, end: true });
      }, 300);
    }
  }
  componentDidMount() {
    this.instanceIsMounted = true;
    window.initWeaDialog = params => {
      let state = {};
      if (params.style) {
        state.style = params.style;
      }
      if (params.buttons) {
        state.buttons = params.buttons;
      }
      if (params.url) {
        state.url = params.url;
      }
      if (params.modalBody) {
        state.modalBody = params.modalBody;
      }
      if (params.title) {
        state.title = params.title;
      }
      if (params.icon) {
        state.icon = params.icon;
      }
      if (params.closable !== undefined) {
        state.closable = params.closable;
      }
      if (params.scalable !== undefined) {
        state.scalable = params.scalable;
      }
      if (params.maskClosable !== undefined) {
        state.maskClosable = params.maskClosable;
      }
      if (params.iconBgcolor) {
        state.iconBgcolor = params.iconBgcolor;
      }
      if (params.iconFontColor) {
        state.iconFontColor = params.iconFontColor;
      }
      if (params.moreBtn) {
        state.moreBtn = params.moreBtn;
      }
      this.setState(state);
    };
    window.showWeaDialog = () => {
      this.setState({ visible: true });
    };
    window.closeWeaDialog = () => {
      this.onCancel();
    };
  }

  componentWillUnmount() {
    window.initWeaDialog = noop;
    window.showWeaDialog = noop;
    window.closeWeaDialog = noop;
  }

  callback(...args) {
    isFunction(this.props.callback) && this.props.callback(...args);
  }
  onCancel() {
    this.setState({
      visible: false,
      height: this.calcHeight(this.props.style.height)
    });
    isFunction(this.props.onCancel) && this.props.onCancel();
  }
  onScale(e, state, height) {
    this.setState({ height });
    this.props.onChangeHeight && this.props.onChangeHeight(height);
    isFunction(this.props.onScale) && this.props.onScale(e, state);
  }
  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false });
    WindowFunc.getTop().dialogMapper[this.id] = null;
  }
  close() {
    this.setState({ visible: false });
    WindowFunc.getTop().dialogMapper[this.id] = null;
    this.props.onCancel && this.props.onCancel();
  }
  destroy() {
    WindowFunc.getTop().dialogMapper[this.id] = null;
  }
  calcHeight(h) {
    let maxH = this.props.maxHeight || WindowFunc.getTop().innerHeight - 180;
    if (h && typeof h === "number") {
      h = h > maxH ? maxH : h;
    }
    if (isString(h) && /^\d+/.test(h)) {
      h = Number(h.match(/^\d*/)[0]);
      h = h > maxH ? maxH : h;
    }
    if (this.props.setHeight) {
      h = Number(this.props.setHeight);
    }
    this.props.onChangeHeight && this.props.onChangeHeight(h);
    return h;
  }
  formatUrl(url = "") {
    if (url) {
      let c = "?";
      if (/\?/.test(url)) c = "&";
      url = `${url}${c}dialogId=${this.id}`;
    }
    return url;
  }
  getFooter = (modules = {}) => {
    const { buttons } = this.state;
    const { bottomLeft } = this.props;
    let module_3_1 = bottomLeft ? (
      <div
        className="ext-link"
        style={{ float: "left", cursor: "pointer", paddingLeft: 20 }}
      >
        {isString(bottomLeft) ? (
          <span dangerouslySetInnerHTML={{ __html: bottomLeft }} />
        ) : (
          <span>{bottomLeft}</span>
        )}
      </div>
    ) : (
      ""
    );
    module_3_1 = getModuleRender(modules, "module_3_1", module_3_1, this);
    let module_3_2 =
      buttons && buttons.length !== 0 ? (
        <div className="footer-btns">
          {isString(buttons) ? (
            <div dangerouslySetInnerHTML={{ __html: buttons }} />
          ) : (
            buttons
          )}
        </div>
      ) : (
        ""
      );
    module_3_2 = getModuleRender(modules, "module_3_2", module_3_2, this);
    let module_3 = module_3_1 || module_3_2 ? [module_3_1, module_3_2] : "";
    module_3 = getModuleRender(modules, "module_3", module_3, this);
    return {
      module_3,
      module_3_1,
      module_3_2
    };
  };

  getTitle = (modules = {}) => {
    const { hideIcon = false } = this.props;
    let { title, icon, iconBgcolor, iconFontColor } = this.state;
    let module_1_1_1 = !hideIcon ? (
      <div
        className="wea-browser-single-icon-circle wea-dialog-icon"
        style={{ background: iconBgcolor, color: iconFontColor }}
      >
        <i className={icon} />
      </div>
    ) : (
      ""
    );
    module_1_1_1 = getModuleRender(modules, "module_1_1_1", module_1_1_1, this);
    let module_1_1_2 = (
      <div
        style={{ verticalAlign: "middle", paddingLeft: 35 }}
        className="text-elli wea-f14"
        title={isString(title) ? title : ""}
      >
        {isString(title) ? title : title}
      </div>
    );
    module_1_1_2 = getModuleRender(modules, "module_1_1_2", module_1_1_2, this);
    let module_1_1 = title ? (
      <Row>
        <Col span={22} style={{ paddingLeft: 20, lineHeight: "48px" }}>
          <div className="prel">
            {module_1_1_1}
            {module_1_1_2}
          </div>
        </Col>
      </Row>
    ) : (
      ""
    );
    module_1_1 = getModuleRender(modules, "module_1_1", module_1_1, this);
    return {
      module_1_1,
      module_1_1_1,
      module_1_1_2
    };
  };

  render() {
    const {
      children,
      hasScroll = false,
      loading,
      overflowHidden,
      scalable,
      destroyBodyOnClose
    } = this.props;
    let {
      modalBody,
      visible,
      url,
      closable,
      style,
      maskClosable,
      buttons,
      title,
      height,
      percent,
      end
    } = this.state;
    if (this.props.visible !== undefined) visible = this.props.visible;
    const { props } = this;
    let body;
    if (modalBody) {
      body = modalBody;
      if (isString(modalBody))
        body = (
          <div
            dangerouslySetInnerHTML={{ __html: modalBody }}
          />
        );
    }
    let cn;
    if (!title) height -= 48;
    if (children) {
      cn = children;
      if (hasScroll)
        cn = <NewScroll height={height}>{children}</NewScroll>;
    }
    const sstyle = { height: height };
    if (!hasScroll && !overflowHidden) sstyle.overflow = "scroll";
    sstyle.borderRadius = title ? "" : "6px 6px 0 0";
    let module_1_1 = this.getTitle();
    let module_3 = this.getFooter();
    if (url) {
      if (!WindowFunc.getTop().dialogMapper) {
        WindowFunc.getTop().dialogMapper = {};
      }
      if (!WindowFunc.getTop().dialogMapper[this.id]) {
        WindowFunc.getTop().dialogMapper[this.id] = this;
      }
    }
    const ifStyle = {};
    if (!(buttons && buttons.length !== 0)) {
      ifStyle.borderRadius = "0 0 6px 6px";
    }
    if (!title) {
      ifStyle.borderRadius = "6px 6px 0 0";
    }
    if (!(buttons && buttons.length !== 0) && !title) {
      ifStyle.borderRadius = "6px";
    }

    return (
      <Modal
        draggable={props.draggable}
        parentClassName={props.parentClassName || ""}
        mask={props.mask}
        resize={props.resize}
        layout={props.layout}
        wrapClassName={`wea-dialog ${props.className || ""}`}
        zIndex={props.zIndex}
        title={module_1_1.module_1_1}
        width={style.width}
        closable={closable}
        scalable={scalable || this.state.scalable}
        onScale={this.onScale}
        maskClosable={maskClosable}
        visible={visible}
        onCancel={this.onCancel}
        footer={module_3.module_3}
        onAfterClose={props.onAfterClose}
        destroyOnClose={true}
      >
        {!destroyBodyOnClose || (destroyBodyOnClose && visible) ? (
          <div className="wea-dialog-body" style={sstyle}>
            {cn}
            {body}
          </div>
        ) : null}
      </Modal>
    );
  }
}

export default NewDialog;