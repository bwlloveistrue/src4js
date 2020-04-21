import { Row, Col } from 'antd';
import React from 'react';
import WeaHelpfulTip from '../HelpfulTip';
import styleLess from './style.less';

class SearchGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGroup: props.showGroup ? props.showGroup : false
    };
  }
  componentWillReceiveProps(nextProps) {
    
  }

  onAdSearch() {
    // 支持高级搜索内input框的onEnter触发搜索
    const { onAdSearch } = this.props;
    typeof onAdSearch === "function" && onAdSearch();
  }

  render() {
    const {
      title,
      items,
      needTigger = true,
      col = 2,
      customComponent = "",
      children,
      fontSize,
      style = {},
      center,
      size,
      hide,
      multiCol,
      titleTip = null
    } = this.props;
    const { showGroup } = this.state;
    return (
      <div
        className={`${styleLess.weaSearchGroup} ${this.props.className || ""} ${
          hide ? "wea-hide" : "wea-show"
        }`}
        style={style}
      >
        {title && (
          <Row className={`${styleLess.weaTitle}`}>
            <Col span={customComponent === "" ? 23 : 10}>
              <div style={{ fontSize }} className="wea-f12 text-elli">
                {title}
                {titleTip && (
                  <span style={{ "margin-left": "5px" }}>
                    <WeaHelpfulTip {...titleTip} />
                  </span>
                )}
              </div>
            </Col>
            {customComponent && (
              <Col
                className={"wea-f12"}
                span={13}
                style={{ textAlign: "right", paddingRight: 10 }}
              >
                {customComponent}
              </Col>
            )}
            {needTigger && (
              <Col
                className={"wea-f12"}
                span={1}
                style={{ textAlign: "right", paddingRight: 10 }}
              >
              <i
                  className={showGroup ? "icon-coms-up" : "icon-coms-down"}
                  onClick={() => {
                    this.setState({ showGroup: !showGroup });
                    this.props.onVisibleChange &&
                      this.props.onVisibleChange(!showGroup);
                  }}
                />
              </Col>
            )}
          </Row>
        )}
        <Row
          className={`${styleLess.weaContent} ${center ? styleLess.center : ""} ${
            multiCol ? "multiCol" : ""
          } ${title ? "pt15" : ""}`}
          style={showGroup ? {} : { display: "none" }}
          gutter={{ md: 8, lg: 24, xl: 48 }}
        >
          <div className={`${styleLess.weaFormCellWrapper} ${styleLess.clearfix}  ${size || ""}`}>
            {items &&
              items.map(obj => {
                if (obj) {
                  let cellNum = obj.col || col;
                  if (center) cellNum = 1;
                  return (
                    <Col
                      className={`${styleLess.weaFormCell} ${obj.hide ? styleLess.wea-hide : ""}`}
                      span={24 / cellNum}
                      key = {obj.key}
                    >
                      {obj.com}
                    </Col>
                  );
                }
              })}
            {children}
          </div>
        </Row>
      </div>
    );
  }
}

export default SearchGroup;



// WEBPACK FOOTER //
// ./ecology9/wea-search-group/index.js