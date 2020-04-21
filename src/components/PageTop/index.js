import React from "react";
import { Row, Col, Menu, Progress } from "antd";
import $ from 'jquery'

const Item = Menu.Item;

class PageTop extends React.Component {
  static displayName = "PageTop";
  static defaultProps = {
    icon: "",
    iconBgcolor: "",
    title: "",
    buttons: [],
    buttonSpace: 0,
    breadcrumb: [],
    className: "",
    style: {}
  };
  constructor(props) {
    super(props);
    this.instanceIsMounted = false;
    this.hash = `pageTop_${Math.random()
      .toString(36)
      .substr(2, 6)}_${new Date().getTime()}`;
    this.state = {
      percent: 85,
      height: 0,
    };
  }
  componentDidMount() {
    this.instanceIsMounted = true;
    this.scrollheigth();
    window.addEventListener("resize", this.onWindowResize);
  }
  componentWillReceiveProps(nextProps) {
    
  }
  componentDidUpdate() {
    this.scrollheigth();
  }
  componentWillUnmount() {
    // 防止节点卸载问题。。。
    window.removeEventListener("resize", this.onWindowResize);
    this.instanceIsMounted = false;
  }
  onWindowResize = () => {
    this.instanceIsMounted && this.scrollheigth();
  };
  scrollheigth() {
    const { heightSpace, getHeight} = this.props;
    const heightOther =
      heightSpace !== undefined ? heightSpace :  10;
    const content = this.refs.content;
    if (content) {
      const top = $(content).offset() ? $(content).offset().top : 0;
      const scrollheigth =
        document.documentElement.clientHeight -
        top -
        heightOther;
      const { height } = this.state;
      if (height !== scrollheigth) {
        this.setState({ height: scrollheigth });
      }
    }
  }
  render() {
    const { percent, height } = this.state;
    const {
      children,
      icon,
      iconBgcolor,
      title,
      buttons,
      buttonSpace,
      isFixed,
      breadcrumb,
      className,
      style
    } = this.props;
    const _breadcrumb = [];
    breadcrumb.forEach((bc, index) => {
      index > 0 &&
        _breadcrumb.push(<i className="icon-coms-Browse-box-Add-to" />);
      _breadcrumb.push(<a {...bc}>{bc.name}</a>);
    });
    if (
      (!document.title || document.title === "undefined") &&
      typeof title === "string"
    ) {
      document.title = title;
    }
    return (
      <div
        className={`wea-new-top-wapper ${className}`}
        id={this.hash}
        style={style}
      >
        <Row className={!!isFixed ? "wea-new-top-fixed" : "wea-new-top"}>
          <Col span={14} style={{ paddingLeft: 20, lineHeight: "50px" }}>
            <div className="wea-new-top-title wea-f14">
              {iconBgcolor ? (
                <div
                  className="icon-circle-base"
                  style={{ background: iconBgcolor || "" }}
                >
                  {icon}
                </div>
              ) : (
                <span style={{ verticalAlign: "middle", marginRight: 10 }}>
                  {icon}
                </span>
              )}
              <span
                className="wea-new-top-title-breadcrumb"
                style={{ verticalAlign: "middle" }}
                {...(_breadcrumb.length > 0 || typeof title !== "string"
                  ? {}
                  : { title })}
              >
                {_breadcrumb.length > 0 ? _breadcrumb : title}
              </span>
            </div>
          </Col>
          <Col
            span={10}
            style={{
              textAlign: "right",
              lineHeight: "50px",
              paddingRight: 14,
              position: "absolute",
              right: 0,
              top: 0,
              width: "auto"
            }}
          >
            {buttons.map(data => {
              return (
                <span
                  key={data.key}
                  style={{
                    display: "inline-block",
                    lineHeight: "28px",
                    verticalAlign: "middle",
                    marginLeft: !!buttonSpace ? buttonSpace : 10
                  }}
                >
                  {data}
                </span>
              );
            })}
          </Col>
        </Row>
        {children && (
          <div ref="content" className="wea-new-top-content" style={{ height }}>
            {children}
          </div>
        )}
      </div>
    );
  }
}

export default PageTop;



// WEBPACK FOOTER //
// ./ecology9/wea-top/index.js