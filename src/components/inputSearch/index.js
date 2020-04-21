import { Input, Button } from "antd";
// import Input from '../../_antd1.11.2/input'
// import Button from '../../_antd1.11.2/button'
import classNames from "classnames";
import uniqueId from "lodash/uniqueId";
import isFunction from "lodash/isFunction";

const InputGroup = Input.Group;

class InputSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      focus: false
    };
    this.index = uniqueId("weaInputSearch_");
  }
  componentWillReceiveProps(nextProps, nextState) {
    nextProps.value !== "undefined" &&
      nextProps.value !== this.props.value &&
      nextProps.value !== this.state.value &&
      this.setState({ value: nextProps.value || "" });
  }
  handleFocusBlur(e) {
    if (typeof this.props.onFocusChange === "function") {
      this.props.onFocusChange(e.target === document.activeElement);
    }
    isFunction(this.props.onBlur) && this.props.onBlur(e.target.value);
    this.setState({
      focus: e.target === document.activeElement
    });
  }
  handleInputChange(e) {
    const { placeholderExtra } = this.props;
    this.setState(
      {
        value: e.target.value
      }
    );
    if (this.props.onSearchChange) {
      this.props.onSearchChange(e.target.value);
    }
    isFunction(this.props.onChange) && this.props.onChange(e.target.value);
  }
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  }
  handleInputClick(e, value) {
    // 处理右键粘贴问题
    const { placeholderExtra } = this.props;
    this.setState(
      {
        value
      }
    );
    if (value && this.props.onSearchChange) {
      this.props.onSearchChange(e.target.value);
    }
    isFunction(this.props.onChange) && this.props.onChange(e.target.value);
  }
  enterKeyDown(e) {
    e.keyCode == 13 && this.handleSearch();
  }
  render() {
    const {
      style,
      placeholder,
      textDecoration,
      placeholderExtra,
      className = ""
    } = this.props;
    const btnCls = classNames({
      "ant-search-btn": this.state.focus
    });
    return (
      <div
        className={`wea-input-focus ${className}`}
        onKeyDown={this.enterKeyDown.bind(this)}
        style={style}
      >
        <Input
          placeholder={placeholder}
          value={this.state.value}
          onFocus={this.handleFocusBlur.bind(this)}
          onBlur={this.handleFocusBlur.bind(this)}
          onChange={this.handleInputChange.bind(this)}
          onClick={this.handleInputClick.bind(this)}
          className={`${textDecoration && "text-decoration"}`}
        />
        
        <Button
          className={`${btnCls} wea-input-focus-btn`}
          type="ghost"
          icon="search"
          onClick={this.handleSearch.bind(this)}
        />
        <span className="placeHolder-tip" id={`${this.index}`}>
          {placeholderExtra}
        </span>
      </div>
    );
  }
  clear = () => {
    this.setState({
      value: ""
    });
    if (this.props.onSearchChange) {
      this.props.onSearchChange("");
    }
    isFunction(this.props.onChange) && this.props.onChange("");
  };
}
export default InputSearch;



// WEBPACK FOOTER //
// ./ecology9/wea-input-search/index.js