var React = require('react')
var $ = require('jquery');
var Index = require('./index.jsx');
var Man = require('./man.jsx');
var Warm = require('warm');

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
    subNav: function () {
        var previous = this.state.path.hist.split("/");
        previous = previous[previous.length - 1];
        if (this.state.path.hist !== 'Warm') {
            return (<li className='menu-sub-title'><a onClick={this.previousMenu}>{previous.charAt(0).toUpperCase() + previous.substring(1).toLowerCase()}</a></li>);
        }
    },
    previousMenu: function () {
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
            path : {target : this.state.path.target[target], hist : this.state.path.hist + '/' + target}
        });
    },
    manPage: function(event, path) {
        console.log(event);
        this.setState({
            page: {name : 'Man', path : this.state.path.target.readme}
        });
    },
    index: function() {
        this.setState({
            page: {name : 'Index', path : null}
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
                        <li className='menu-title' key={i++}><a onClick={that.index}>WARM</a></li>
                        {that.subNav()}
                        {
                            Object.keys(that.state.path.target).map (function (layerName) {
                                var layerVal = that.state.path.target[layerName];
                                var boundManPage = that.manPage.bind(that, event, layerVal);
                                var boundSubMenu = that.subMenu.bind(that,layerName);
                                if (layerName != 'readme'){
                                    if (layerVal.constructor == Object) {
                                        return (<li className='menu-elem' key={i++}><a onClick={boundSubMenu}>{layerName.charAt(0).toUpperCase() + layerName.substring(1).toLowerCase()}</a></li>);
                                    } else {
                                        return (<li className='menu-elem' key={i++}><a href={'#'+layerName.toLowerCase()} onClick={boundManPage}>{layerName.charAt(0).toUpperCase() + layerName.substring(1).toLowerCase()}</a></li>);
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
