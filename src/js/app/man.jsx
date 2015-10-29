var React = require('react')
var $ = require('jquery');
var Warm  = require('warm');
var showdown  = require('showdown'),
converter = new showdown.Converter();

var ManPage = React.createClass({
    getInitialState: function() {
        return ({
            readme: []
        });
    },
    manSet: function() {
        $.get(this.props.path, function(result) {
            // console.log(this.props.path);
        // $.get("/js/app/test.md", function(result) {
            result = result.split("!!");
            for (var i = 0; i < result.length; i++) {
                if (result[i].charAt(0) != '$' && result[i].charAt(0) != '£') {
                    result[i] = converter.makeHtml(result[i]);
                }
            }
            if (this.isMounted()) {
                this.setState({
                    readme: result
                });
            }
        }.bind(this));
    },
    componentDidMount: function() {
        this.manSet();
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (prevProps.path != this.props.path) {
            this.manSet();
            return (true);
        } else {
            return (false);
        }
    },
    render: function() {
        return (
            <div className="main-container">
                <div className="man-container">
                    {
                        this.state.readme.map(function (value) {
                            var Example = Warm;
                            if (value.charAt(0) == '$') {
                                value = value.replace(/\$/g, '').split('.');
                                value.splice(0,1);
                                value.map(function (layer) {
                                    Example = Example[layer];
                                })
                                var Example = React.createFactory(Example);
                                return (<div className='sandbox'> <Example className="example"/> </div>);
                            } else if (value.charAt(0) == '£') {
                                value = value.replace(/\£/g, '').trim().toLowerCase();
                                return <div id={value}></div>
                            } else {
                                return <div className="man-content" dangerouslySetInnerHTML={{__html: value}} />;
                            }
                        })
                    }
                </div>
            </div>
        );
    }
});

module.exports = ManPage;
