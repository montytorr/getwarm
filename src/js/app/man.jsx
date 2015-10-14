var React = require('react')
var $ = require('jquery');

var ManPage = React.createClass({
    getInitialState: function() {
        return ({
            readme: ''
        });
    },
    componentDidMount: function() {
        $.get("https://raw.githubusercontent.com/maestro-tech/MaestroForm/master/README.md", function(result) {
            if (this.isMounted()) {
                this.setState({
                    readme: marked(result, {sanitize: true})
                });
            }
        }.bind(this));
    },
    render: function() {
        return (
            <div className="main-container">
                <div className="man-container" dangerouslySetInnerHTML={{__html: this.state.readme}} />
            </div>
        );
    }
});

module.exports = ManPage;
