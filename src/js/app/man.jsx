var React = require('react')
var $ = require('jquery');

var ManPage = React.createClass({
    getInitialState: function() {
        return ({
            readme: []
        });
    },
    componentDidMount: function() {
        $.get("https://raw.githubusercontent.com/maestro-tech/MaestroForm/master/README.md", function(result) {
        // $.get("/js/app/test.md", function(result) {
            result = result.split("!!!");
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                result[i] = marked(result[i], {sanitize: true});
            }
            if (this.isMounted()) {
                this.setState({
                    readme: result
                });
            }
        }.bind(this));
    },
    render: function() {
        return (
            <div className="main-container">
                <div className="man-container">
                    {
                        this.state.readme.map(function (value) {
                            return <div dangerouslySetInnerHTML={{__html: value}} />;
                        })
                    }
                </div>
            </div>
        );
    }
});

module.exports = ManPage;
