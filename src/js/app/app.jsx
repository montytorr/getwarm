var React = require('react')
var $ = require('jquery');
var Index = require('./index.jsx');
var Man = require('./man.jsx');
var ulList = ['WARM', 'Header', 'Login', 'Tile', 'Another', 'Element', 'Last'];

var WarmApp = React.createClass({
    getInitialState: function() {
        return ({
            listing: [],
            quote: 'Be',
            page: Index
        });
    },
    changePage: function(i) {
        if(i == 1) {
            this.setState({
                page: Index
            });
        } else {
            this.setState({
                page: Man
            });
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    componentDidMount: function() {
        var index = ['WARM'];
        var component = null;
        $.get("https://github.com/maestro-tech/warm/tree/master/src/components", function(result) {
            result = result.replace(/(\r\n|\n|\r)/gm," ").split("js-directory-link");
            for (var i = 1; i < result.length; i++) {
                component = /title=.*>(.*)<\/a></.exec(result[i])[1];
                index.push(component.charAt(0).toUpperCase() + component.substring(1).toLowerCase());
            }
            if (this.isMounted()) {
                this.setState({
                    listing: index
                });
            }
        }.bind(this));
    },
    render: function() {
        var i = 0;
        that = this;
        return (
            <div className="view-container">
                <div className="left-menu">
                    <ul>
                        {
                            this.state.listing.map(function (listValue) {
                                i++;
                                var boundClick = that.changePage.bind(that, i);
                                return <li className={(i == 1) ? 'menu-title' : 'menu-elem'}><a onClick={boundClick}>{listValue}</a></li>;
                            })
                        }
                    </ul>
                </div>
                <this.state.page />
            </div>
        );
    }
});

module.exports = WarmApp;
