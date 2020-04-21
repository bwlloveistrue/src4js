const Baron = require("./react-baron");
import $ from 'jquery'

class NewScroll extends React.Component {
  static defaultProps = {
    direction: "v"
  };
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0
    };
  }
  scrollerToTop() {
    if (!this.refs.weaBaron) return;
    if (this.refs.weaBaron.getScroller())
      this.refs.weaBaron.getScroller().scrollTop = 0;
    if (this.refs.weaBaron.getBar()) this.refs.weaBaron.getBar().top = 0;
  }
  scrollToLast() {
    if (!this.refs.weaBaron) return;
    this.refs.weaBaron.scrollToLast && this.refs.weaBaron.scrollToLast();
  }
  scroll(number) {
    if (!this.refs.weaBaron) return;
    if (this.refs.weaBaron.getScroller())
      this.refs.weaBaron.getScroller().scrollTop = number;
    if (this.refs.weaBaron.getBar()) this.refs.weaBaron.getBar().top = number;
  }
  getScrollTop() {
    let v = 0;
    if (this.refs.weaBaron && this.refs.weaBaron.getScroller())
      v = this.refs.weaBaron.getScroller().scrollTop;
    return v;
  }
  update = () => {
    if (!this.refs.weaBaron) return;
    this.refs.weaBaron && this.refs.weaBaron.baron.update();
  };
  onScroll(...args) {
    const scrollTop = this.getScrollTop();
    this.setState({ scrollTop });
    this.props.onScroll && this.props.onScroll(...args);
  }
  render() {
    const { toTop, toTopTitle = "滚动到顶部", height, direction } = this.props;
    const { scrollTop } = this.state;
    const style = this.props.style || {};
    if (height) style.height = height;
    return (
      <div
        className={`wea-new-scroll ${this.props.className || ""}`}
        ref="weaNewScroll"
        style={style}
        id={this.props.scrollId}
      >
        <Baron
          $={$}
          {...this.props}
          ref="weaBaron"
          clipperCls={`clipper ${direction === "h" ? "_h" : ""}`}
          scrollerCls={`scroller ${
            navigator.userAgent.indexOf("Firefox") >= 0 ? "firefox-width" : ""
          } ${direction === "h" ? "_h" : ""}`}
          trackCls={`track ${
            navigator.userAgent.indexOf("Firefox") >= 0 ? "firefox-track" : ""
          }`}
          barCls="bar"
          onScroll={this.onScroll.bind(this)}
          barOnCls="baron"
        >
          {this.props.children}
        </Baron>
        {toTop && scrollTop > 0 && (
          <div
            className="returnToTop"
            title={toTopTitle}
            onClick={this.scrollerToTop.bind(this)}
          >
            <span className="icon-coms-upper" />
          </div>
        )}
      </div>
    );
  }
}

export default NewScroll;