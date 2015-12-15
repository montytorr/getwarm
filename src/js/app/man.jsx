var React = require('react')
var $ = require('jquery');
var Warm  = require('warm-react');
var showdown  = require('showdown'),
converter = new showdown.Converter();
var Async = require('async');

var ManPage = React.createClass({
    getInitialState: function() {
        return ({
            readmes: []
        });
    },
    manGet: function(path, cb) {
        $.get(path, function(result) {
            var man = [];
            result = result.split("!!");
            result.map(function (value, index) {
                var Example = Warm;
                if (value.charAt(0) != '$' && value.charAt(0) != '£') {
                    value = converter.makeHtml(value);
                }
                if (value.charAt(0) == '$') {
                    value = value.replace(/\$/g, '').split('.');
                    value.splice(0,1);
                    value.map(function (layer) {
                        Example = Example[layer];
                    })
                    var Example = React.createFactory(Example);
                    man.push(
                        <div className='sandbox' key={"sandbox"+index}>
                            <div className="sand-container">
                                <Example key={"sandbox-example"+index} demo={true} className="gw-example"/>
                            </div>
                        </div>
                    );
                } else {
                    man.push(<div className="man-content" key={"man"+index} dangerouslySetInnerHTML={{__html: value}} />);
                }
            })
            if (this.isMounted()) {
                var temp = this.state.readmes;
                temp.push(man);
                this.setState({
                    readmes: temp
                });
                cb();
            }
        }.bind(this));
    },
    componentDidMount: function() {
        Async.eachSeries(Object.keys(Warm), function (component, asyncCB) {
            this.manGet("https://raw.githubusercontent.com/maestro-tech/warm/master/src/components/"+component.toLowerCase()+"/readme.md",
            // this.manGet("js/app/readme.md",
            function () {
                asyncCB();
            });
        }.bind(this))
    },
    render: function() {
        return (
            <div>
                <div className="man-container">
                    {
                        this.state.readmes.map(function (readme) {
                            return readme;
                        })
                    }
                </div>
            </div>
        );
    }
});

module.exports = ManPage;
