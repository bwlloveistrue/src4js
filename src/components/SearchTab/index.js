import React from "react";
import { Tabs, Row, Col, Button, Menu } from "antd";
import classnames from "classnames";
import InputSearch from "../inputSearch";
import $ from 'jquery'

const TabPane = Tabs.TabPane;

class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maskDarkB: 0,
      maskDarkH: 0,
      lsPaddingRight: 0
    };
    this.calc = false;
  }
  componentDidUpdate() {
    const { showSearchAd } = this.props;
    const { maskDarkB, maskDarkH } = this.state;
    let h = this.getMaskDarkH();
    let b = this.getMaskDarkB();
    if (showSearchAd && (h !== maskDarkH || b !== maskDarkB)) {
      this.setState({ maskDarkH: h, maskDarkB: b });
    }
  }
  componentDidMount() {
    const { onTabMounted, autoCalculateWidth } = this.props;
    onTabMounted && onTabMounted();
    this.updateLsPadding(false);
    if (autoCalculateWidth) {
      window.addEventListener("resize", this.updateLsPadding);
    }
  }
  componentWillUnmount() {
    const { autoCalculateWidth } = this.props;
    if (autoCalculateWidth) {
      window.removeEventListener("resize", this.updateLsPadding);
    }
  }
  updateLsPadding = () => {
    if (this.weaTabRight) {
      const { lsPaddingRight } = this.state;
      const clientWidth = this.weaTabRight.clientWidth;
      if (lsPaddingRight !== clientWidth) {
        this.setState({ lsPaddingRight: clientWidth });
      }
    }
  };
  onSearch(v) {
    if (typeof this.props.onSearch === "function") {
      this.props.onSearch(v);
    }
  }
  onSearchChange(v) {
    if (typeof this.props.onSearchChange === "function") {
      this.props.onSearchChange(v);
    }
  }
  onChange(key) {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(key);
    }
  }
  onMenuChange(o) {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(o.key);
    }
  }
  setShowSearchAd(bool) {
    if (typeof this.props.setShowSearchAd === "function") {
      this.props.setShowSearchAd(bool);
    }
  }
  setShowSearchDrop(bool) {
    if (typeof this.props.setShowSearchDrop === "function") {
      this.props.setShowSearchDrop(bool);
    }
  }
  getKey(obj) {
    const { keyParams } = this.props;
    if (!keyParams) {
      return "0";
    }
    if (!obj) return "";
    let theKey = "";
    keyParams.forEach(name => {
      theKey += obj[name] + "_";
    });
    if (theKey && theKey !== "") {
      theKey = theKey.substring(0, theKey.length - 1);
    }
    return theKey;
  }
  getButtonsAd = () => {
    const { onAdSearch, onAdReset, onAdCancel } = this.props;
    const ads = [
      <Button
        type="primary"
        onClick={() => {
          typeof onAdSearch === "function" && onAdSearch();
          this.setShowSearchAd(false);
        }}
      >
        {"搜索"}
      </Button>,
      <Button
        type="ghost"
        onClick={() => {
          typeof onAdReset === "function" && onAdReset();
        }}
      >
        {"重置"}
      </Button>,
      <Button
        type="ghost"
        onClick={() => {
          typeof onAdCancel === "function" && onAdCancel();
          this.setShowSearchAd(false);
        }}
      >
        {"取消"}
      </Button>
    ];
    return ads;
  };
  render() {
    const {
      className = "",
      style = {},
      datas,
      counts,
      keyParam,
      buttons,
      selectedKey,
      countParam,
      showSearchAd,
      buttonsAd,
      searchsAd,
      searchType,
      searchsBaseValue,
      hasDropMenu,
      dropIcon,
      leftStyle,
      rightStyle,
      buttonsDrop,
      showSearchDrop,
      searchsDrop,
      onlyShowRight,
      type = "line",
      onEdit,
      advanceHeight = 300,
      hasMask = true,
      showAddBtn = false,
      addBtnProps = {},
      replaceLeft,
      searchsBasePlaceHolder,
      searchsBasePlaceHolderExtra,
      searchsAdQuick,
      buttonsAdQuick,
      subMenuClass,
      autoCalculateWidth = false
    } = this.props;
    const { maskDarkH, maskDarkB, lsPaddingRight } = this.state;
    const searchModlaBtns = buttonsAd || this.getButtonsAd();
    const tabType = type.indexOf("editable") > -1 ? "editable-card" : type;
    const tabClassName = classnames({
      "wea-tab-edit": type === "editable-inline"
    });

    const isIE8 = window.navigator.appVersion.indexOf("MSIE 8.0") >= 0;
    // const isIE9 = window.navigator.appVersion.indexOf('MSIE 9.0') >= 0;
    const searchBase = `${searchType}`.indexOf("base") >= 0;
    const searchAdvanced = `${searchType}`.indexOf("advanced") >= 0;
    const searchDrop = `${searchType}`.indexOf("drop") >= 0;
    const hasAddButton = type === "editable-inline" && showAddBtn;
    let nowSelectedKey =
      selectedKey || selectedKey === 0 ? selectedKey.toString() : "";
    if (hasDropMenu && datas) {
      datas.forEach(data => {
        const dataKey =
          data[keyParam] || data[keyParam] === 0
            ? data[keyParam].toString()
            : "";
        const dropMenu = data.dropMenu;
        if (dropMenu) {
          if (dataKey === nowSelectedKey) {
            nowSelectedKey = [dataKey, `item_${dataKey}`];
          }
          dropMenu.forEach(d => {
            if (d.requestid === nowSelectedKey) {
              nowSelectedKey = [dataKey, d.requestid];
            }
          });
        }
      });
    }
    let leftDom = "";
    if (!onlyShowRight) {
      if (hasDropMenu) {
        leftDom = (
          <Menu
            mode="horizontal"
            selectedKeys={nowSelectedKey}
            onClick={this.onMenuChange.bind(this)}
          >
            {datas &&
              datas.map(data => {
                const dataKey =
                  data[keyParam] || data[keyParam] === 0
                    ? data[keyParam].toString()
                    : "";
                const countKey = data[countParam];
                const showCount = counts && data.showcount;
                const tab = showCount ? (
                  <span>
                    {data.title + (showCount ? " (" : "")}
                    {showCount ? (
                      <span style={data.color ? { color: data.color } : {}}>
                        {counts[countKey] || "0"}
                      </span>
                    ) : (
                      ""
                    )}
                    {showCount ? ")" : ""}
                  </span>
                ) : (
                  data.title
                );
                const dropMenu = data.dropMenu;
                if (dropMenu) {
                  return (
                    <Menu.SubMenu
                      title={tab}
                      key={dataKey}
                      className={subMenuClass}
                      onTitleClick={this.onMenuChange.bind(this)}
                    >
                      <Menu.Item
                        style={{ display: "none" }}
                        key={`item_${dataKey}`}
                      />
                      {dropMenu.map(d => {
                        return (
                          <Menu.Item key={d.requestid}>
                            {d.requestname}
                          </Menu.Item>
                        );
                      })}
                    </Menu.SubMenu>
                  );
                } else {
                  return <Menu.Item key={dataKey}>{tab}</Menu.Item>;
                }
              })}
          </Menu>
        );
      } else {
        leftDom = [
          <Tabs
            {...this.props}
            className={tabClassName}
            style={hasAddButton ? { float: "left", maxWidth: "100%" } : null}
            type={tabType}
            defaultActiveKey={nowSelectedKey}
            activeKey={nowSelectedKey}
            onChange={this.onChange.bind(this)}
            onEdit={(targetKey, action) => {
              typeof onEdit === "function" && onEdit(targetKey, action);
            }}
          >
            {datas &&
              datas.map(data => {
                const dataKey =
                  data[keyParam] || data[keyParam] === 0
                    ? data[keyParam].toString()
                    : "";
                const countKey = data[countParam];
                const showCount = counts && data.showcount;
                const tab = showCount ? (
                  <span>
                    {data.title + (showCount ? " (" : "")}
                    {showCount ? (
                      <span style={data.color ? { color: data.color } : {}}>
                        {counts[countKey] || "0"}
                      </span>
                    ) : (
                      ""
                    )}
                    {showCount ? ")" : ""}
                  </span>
                ) : (
                  data.title
                );
                return (
                  <TabPane
                    key={data.title}
                    tab={tab}
                    className={
                      tabClassName
                        ? `${tabClassName}-pane${data.editable ? "" : "-nodel"}`
                        : ""
                    }
                    title={data.titleText || data.title}
                    key={dataKey}
                  >
                    {data.com || ""}
                  </TabPane>
                );
              })}
          </Tabs>,
          showAddBtn && (
            <Button
              type="dashed"
              onClick={() => {
                typeof onEdit === "function" && onEdit(null, "add");
              }}
              style={{
                marginRight: -45,
                color: "#999",
                padding: "6px 13px",
                marginTop: 6
              }}
              {...addBtnProps}
            >
              <i className="icon-coms-plus" />
            </Button>
          )
        ].filter(Boolean);
      }
    }
    if (searchsAdQuick) {
      leftDom = (
        <Row>
          <Col
            className={`wea-tab-search-ad-quick-left ${
              buttonsAdQuick ? "wea-tab-search-ad-quick-left-with-btns" : ""
            }`}
            span={24}
          >
            {searchsAdQuick}
          </Col>
          <Col className="wea-tab-search-ad-quick-right">{buttonsAdQuick}</Col>
        </Row>
      );
    }
    if (replaceLeft) {
      leftDom = replaceLeft;
    }
    return (
      <div
        className={`wea-tab ${className} ${
          searchsAdQuick ? "wea-tab-search-ad-quick" : ""
        } ${searchAdvanced && !searchBase ? "wea-tab-search-ad" : ""}`}
        style={{
          ...style,
          ...(tabType === "card" ? { backgroundColor: "#f4f4f4" } : {})
        }}
      >
        <Row>
          <Col
            className={`wea-tab-left ${className}-left`}
            xs={isIE8 ? 15 : 9}
            sm={9}
            md={12}
            lg={15}
            style={{
              ...(autoCalculateWidth ? { paddingRight: lsPaddingRight } : {}),
              ...leftStyle,
              ...(hasAddButton ? { paddingRight: 45 } : {})
            }}
          >
            {leftDom}
          </Col>
          <Col
            className={`wea-tab-right ${className}-right ${
              searchsAdQuick ? "wea-tab-right-search-ad-quick" : ""
            }`}
            xs={isIE8 ? 9 : 15}
            sm={15}
            md={12}
            lg={9}
            style={{ textAlign: "right", ...rightStyle }}
          >
            {buttons || searchBase || searchAdvanced || searchDrop ? (
              <div
                className="wea-search-tab"
                ref={el => (this.weaTabRight = el)}
              >
                {buttons &&
                  buttons.map((data, index) => {
                    return (
                      <span key={index} style={{ marginLeft: 15 }}>
                        {data}
                      </span>
                    );
                  })}
                {searchBase && (
                  <InputSearch
                    value={searchsBaseValue}
                    placeholder={searchsBasePlaceHolder}
                    placeholderExtra={searchsBasePlaceHolderExtra}
                    onSearch={this.onSearch.bind(this)}
                    onSearchChange={this.onSearchChange.bind(this)}
                  />
                )}
                {searchAdvanced && (
                  <Button
                    type="ghost"
                    className="wea-advanced-search text-elli"
                    onClick={this.setShowSearchAd.bind(this, true)}
                  >
                    {"高级搜索"}
                  </Button>
                )}
                {searchDrop && (
                  <span style={{ marginLeft: 15 }}>{dropIcon}</span>
                )}
              </div>
            ) : null}
          </Col>
        </Row>
        <div
          className={`wea-search-container ${
            searchsAdQuick ? "wea-search-container-search-ad-quick" : ""
          }`}
          ref="containerWrapper"
          style={{ display: showSearchAd ? "block" : "none" }}
        >
          <Button
            type="ghost"
            className="wea-advanced-search text-elli"
            onClick={this.setShowSearchAd.bind(this, false)}
          >
            {"高级搜索"}
          </Button>
          <div
            className="wea-advanced-searchsAd"
            style={{ height: advanceHeight }}
          >
            {searchsAd}
          </div>
          <div className="wea-search-buttons">
            <div style={{ textAlign: "center" }}>
              {searchModlaBtns &&
                searchModlaBtns.map((data, index) => {
                  return (
                    <span key={index} style={{ marginLeft: 15 }}>
                      {data}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
        {hasMask && (
          <div
            className="mask-dark"
            style={{
              display: showSearchAd ? "block" : "none",
              height: maskDarkH,
              bottom: maskDarkB
            }}
          />
        )}
        {hasMask && (
          <div
            className="mask-wrapper"
            style={{ display: showSearchAd ? "block" : "none" }}
            onClick={() => this.props.hideSearchAd && this.props.hideSearchAd()}
          />
        )}
        <div
          className="wea-search-container"
          style={{ display: showSearchDrop ? "block" : "none" }}
        >
          <span
            className="wea-Drop-search"
            onClick={this.setShowSearchDrop.bind(this, false)}
          >
            {dropIcon}
          </span>
          <div
            className="wea-advanced-searchsAd"
            style={{ height: advanceHeight }}
          >
            {searchsDrop}
          </div>
          <div className="wea-search-buttons">
            <div style={{ textAlign: "center" }}>
              {buttonsDrop &&
                buttonsDrop.map((data, index) => {
                  return (
                    <span key={index} style={{ marginLeft: 15 }}>
                      {data}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  getMaskDarkH() {
    let v = 0;
    if (this.refs.containerWrapper) {
      const dom = $(this.refs.containerWrapper);
      v = window.innerHeight - dom.height() - dom.offset().top - 10;
    }
    return v;
  }
  getMaskDarkB() {
    let v = 0;
    if (this.refs.containerWrapper) {
      const dom = $(this.refs.containerWrapper);
      this.calc = true;
      v = -dom.height() - this.getMaskDarkH();
    }
    return v;
  }
}

export default SearchTab;



// WEBPACK FOOTER //
// ./ecology9/wea-tab/index.js