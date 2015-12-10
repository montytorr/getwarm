var React = global.React || require('react');
var $ = require('jquery');
var Index = require('./index.jsx');
var Man = require('./man.jsx');
var Warm = require('warm-react');
var classie = require('classie');

var WarmApp = React.createClass({
    getInitialState: function() {
        return ({
            listing: [],
            quote: 'Be',
            page: {name :'Index', path : null},
            path: {target : Warm, hist : 'Warm'}
        });
    },
    pageChanger: function () {
        if (this.state.page.name == 'Index') {
            return (<Index />);
        }
        else {
            return (<Man path={this.state.page.path} />);
        }
    },
    goBackConstructor: function () {
        var previous = this.state.path.hist.split("/");
        previous = previous[previous.length - 1];
        if (this.state.path.hist !== 'Warm') {
            return (<li className='menu-sub-title' key='back'><a onClick={this.goBack}>{previous.charAt(0).toUpperCase() + previous.substring(1).toLowerCase()}</a></li>);
        }
    },
    goBack: function () {
        var hist = this.state.path.hist.split("/");
        hist.splice(-1,1);
        hist.splice(0,1);
        var newTarget = Warm;
        var newHist = 'Warm';
        hist.map(function (layer) {
            newTarget = newTarget[layer];
            newHist = newHist + '/' + layer;
        })
        this.setState({
            path : {target : newTarget, hist : newHist}
        });
    },
    subMenu: function (target) {
        this.setState({
            path : {target : this.state.path.target[target], hist : this.state.path.hist + '/' + target},
            page: {name : 'Man', path : this.state.path.target[target].readme}
        }, function () {
            document.getElementById("main-container").scrollTop = 0;
        });
    },
    manPage: function(i, path, id) {
        var targetedList = document.getElementsByClassName('targeted');
        for (var j = 0; j < targetedList.length; j++) {
            classie.remove(targetedList[j], 'targeted');
        }
        classie.add(this.refs[i], 'targeted');
        this.setState({
            page: {name : 'Man', path : this.state.path.target.readme}
        });
        document.getElementById(id).scrollIntoView();
    },
    indexPage: function() {
        var targetedList = document.getElementsByClassName('targeted');
        for (var j = 0; j < targetedList.length; j++) {
            classie.remove(targetedList[j], 'targeted');
        }
        this.setState({
            page: {name : 'Index', path : null},
            path: {target : Warm, hist : 'Warm'}
        });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    render: function() {
        that = this;
        var i = 0;
        return (
            <div className="view-container">
                <div className="left-menu">
                    <ul>
                        <li className='menu-title' key={i++}><a onClick={that.indexPage}>WARM</a></li>
                        {that.goBackConstructor()}
                        {
                            Object.keys(that.state.path.target).map (function (layerName) {
                                var layerVal = that.state.path.target[layerName];
                                var boundManPage = that.manPage.bind(that, i, layerVal, layerName.toLowerCase());
                                var boundSubMenu = that.subMenu.bind(that,layerName);
                                if (layerName != 'readme' && layerName != 'loaders'){
                                    if (layerVal.constructor == Object) {
                                        return (<li className='menu-elem' key={i++}><a onClick={boundSubMenu}>{layerName.charAt(0).toUpperCase() + layerName.substring(1).toLowerCase()}</a></li>);
                                    } else {
                                        return (<li className='menu-elem man' ref={i} key={i++}><a onClick={boundManPage}>{layerName.charAt(0).toUpperCase() + layerName.substring(1).toLowerCase()}</a></li>);
                                    }
                                }
                            }, that)
                        }
                    </ul>
                </div>
                {that.pageChanger()}
            </div>
        );
    }
});

module.exports = WarmApp;
