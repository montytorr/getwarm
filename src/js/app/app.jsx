var React = require('react')
var $ = require('jquery');
var Index = require('./index.jsx');
var Man = require('./man.jsx');
var ulList = ['WARM', 'Header', 'Login', 'Tile', 'Another', 'Element', 'Last'];

var WarmApp = React.createClass({
    getInitialState: function() {
        return ({
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
        // $.get("https://raw.githubusercontent.com/maestro-tech/MaestroForm/master/README.md", function(result) {
        //     if (this.isMounted()) {
        //         this.setState({
        //             readme: marked(result, {sanitize: true})
        //         });
        //     }
        // }.bind(this));
    },
    render: function() {
        var i = 0;
        that = this;
        return (
            <div className="view-container">
                <div className="left-menu">
                    <ul>
                        {
                            ulList.map(function (listValue) {
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
