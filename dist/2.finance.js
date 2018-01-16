webpackJsonp([2],{258:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(5),u=n(71),f=a(n(53)),d=a(n(52)),h=n(59),g=a(n(260));n(315);var b=function(e){function t(e){return i(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,g.default))}return o(t,l.Component),c(t,[{key:"render",value:function(){return React.createElement("div",null,React.createElement("input",{type:"text",ref:"myTextInput"}),React.createElement("input",{type:"button",value:"focus the text input",onClick:this.myHandleClick}),React.createElement("br",null),"请输入：",React.createElement("input",{onChange:this.props.handleEmail}))}}]),t}(),v=function(e){function t(e,n){i(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return a.context.router,a.TabBarItems=[{title:"排行榜",icon:"/dingtalk/images/tab bar icon_paihangbang_normal.png",activeIcon:"/dingtalk/images/tab bar icon_paihangbang_active.png",path:"/home"},{title:"财务",icon:"/dingtalk/images/tab bar icon_caiwu_normal.png",activeIcon:"/dingtalk/images/tab bar icon_caiwu_active.png",badge:"new",badgeStyle:{right:-5},path:"/finance"},{title:"投入产出",icon:"/dingtalk/images/tab bar icon_touruchanchu_normal.png",activeIcon:"/dingtalk/images/tab bar icon_touruchanchu_active.png",path:"/inoutput"},{title:"实力线",icon:"/dingtalk/images/tab bar icon_shilixian_normal.png",activeIcon:"/dingtalk/images/tab bar icon_shilixian_active.png",path:"/strengthLine"},{title:"更多",icon:"/dingtalk/images/tab bar icon_more_normal.png",activeIcon:"/dingtalk/images/tab bar icon_more_active.png",badge:2,path:"/more"}],a.state={activeIndex:1},a}return o(t,l.Component),c(t,[{key:"componentDidMount",value:function(){h.DDReady.then(function(e){e.biz.navigation.setTitle({title:"财务",onSuccess:function(e){},onFail:function(e){log.e(JSON.stringify(e))}})})}}]),c(t,[{key:"getInitialState",value:function(){return{email:""}}},{key:"handleEmail",value:function(e){this.setState({email:e.target.value})}},{key:"render",value:function(){var e=this,n={title:{text:"财务",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},toolbox:{show:!0,feature:{mark:{show:!0},dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["pie","funnel"],option:{funnel:{x:"25%",width:"50%",funnelAlign:"left",max:1548}}},restore:{show:!0},saveAsImage:{show:!0}}},calculable:!0,series:[{name:"访问来源",type:"pie",radius:"55%",center:["50%","60%"],data:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"},{value:1548,name:"搜索引擎"}]}]};return React.createElement("div",{className:"page-chart"},React.createElement(d.default,{className:"page-echart",echarts:f.default,option:n,style:{height:"300px"},lazyUpdate:!0,onChartReady:this.onChartReadyCallback}),React.createElement("div",null,"用户邮箱：",this.state.email,React.createElement(b,{name:"email",handleEmail:this.handleEmail.bind(this)})),React.createElement("div",null,React.createElement(u.TabBar,{tabBarStyle:{},activeIndex:e.state.activeIndex,onChange:function(t,n){e.context.router.push(n)},iconHeight:24,cIconHeight:24,items:this.TabBarItems})))}}]),t}();t.default=v,v.contextTypes={router:Object},e.exports=t.default},259:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e){return e&&e.__esModule?e:{default:e}}(n(258));t.default=r.default,e.exports=t.default},260:function(e,t,n){"use strict";function i(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function a(i,r){try{var o=t[i](r),c=o.value}catch(e){return void n(e)}return o.done?void e(c):Promise.resolve(c).then(function(e){a("next",e)},function(e){a("throw",e)})}return a("next")})}}Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){return e&&e.__esModule?e:{default:e}}(n(121));t.default={defaults:function(){return{loaded:!1,list:[],error:!1}},fetch:function(e,t){var n=this,a=e.fn,r=e.setState;return i(o.default.mark(function e(){var i,c;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.DB.User.getSomeInfo(t);case 2:i=e.sent,c=i.list,r({loaded:!0,list:c});case 5:case"end":return e.stop()}},e,n)}))()}},e.exports=t.default},303:function(e,t,n){(e.exports=n(79)()).push([e.id,".page-chart{color:#666}",""])},315:function(e,t,n){var a=n(303);"string"==typeof a&&(a=[[e.id,a,""]]),n(87)(a,{}),a.locals&&(e.exports=a.locals)}});