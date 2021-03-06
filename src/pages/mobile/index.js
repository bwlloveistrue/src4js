import React, { Component } from 'react'
import { Switch,HashRouter, Route, Redirect } from 'react-router-dom'
import OrderTaker from './orderTaker'
// import Nav from './views/nav/Nav'
// import Reg from './views/reg/Reg'
// import Ferget from './views/Ferget'
// import Citylist from './views/citylist/Citylist'
// import MapDetail from './views/map/Map'
// import Search from './views/search/Search'
// import Microchat from './views/nav/chat/Microchat'
// import Sets from './views/sets/Set'
class Mobile extends Component {

    
    
    componentDidMount(){
        console.log(this)
    }

    render() {
        return (
            <div style={{width:'100%',height:'100%'}}>
                <HashRouter>
                    {/* 多路线匹配，匹配下面的Route，只要匹配成功一个，立即返回，性能高 */}
                    <Switch>
                        {/* exact： 精准匹配，只匹配path完全相等字符串 */}
                        <Route exact path='/mobile/orderTaker' component={OrderTaker} />
                        {/* <Route path='/login' component={Login} />
                        <Route path='/reg' component={Reg} />
                        <Route path='/ferget' component={Ferget} />
                        <Route path='/citylist' component={Citylist} />
                        <Route path='/map' component={MapDetail} />
                        <Route path='/search' component={Search} />
                        <Route path='/microchat' component={Microchat} />
                        <Route path='/setting' component={Sets} /> */}
                        {/* <Redirect from='/mobile' to='/mobile/orderTaker'/> */}
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default Mobile;