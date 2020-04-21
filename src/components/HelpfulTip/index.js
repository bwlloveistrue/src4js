import { Tooltip } from 'antd';
import './index.less';

class main extends React.Component {
  getPlaceClas = () => {
    const { placement } = this.props;
    let cls = '';
    if (placement === 'top' || placement === 'topLeft' || placement === 'topRight') {
      cls = 'wea-helpful-tip-wrapper-top';
    }
    if (placement === 'left' || placement === 'leftTop' || placement === 'leftBottom') {
      cls = 'wea-helpful-tip-wrapper-left';
    }
    if (placement === 'right' || placement === 'rightTop' || placement === 'rightBottom') {
      cls = 'wea-helpful-tip-wrapper-right';
    }
    return cls;
  };

  transferTitle = title => {
    return typeof title === 'string' ? <div dangerouslySetInnerHTML={{ __html: title }} /> : title;
  };

  render() {
    const { placement, isCenter, title, width, style, className = '' } = this.props;
    const placeCls = this.getPlaceClas();
    const centerClas = isCenter ? 'wea-helpful-tip-wrapper-center' : '';
    return (
      <span className={`wea-helpful-tip ${className}`} style={style}>
        <Tooltip
          {...this.props}
          ref="weatip"
          overlayClassName={`wea-helpful-tip-wrapper ${placeCls} ${centerClas}`}
          placement={placement}
          arrowPointAtCenter
          overlayStyle={{ width: width || 'auto' }}
          title={this.transferTitle(title) || ''}
        >
          {this.props.children || <em className="icon-coms-Explain" />}
        </Tooltip>
      </span>
    );
  }
}
export default main;
