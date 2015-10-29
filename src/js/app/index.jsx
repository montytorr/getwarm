var React = require('react')
var classie = require('classie');

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Index = React.createClass({
    getInitialState: function() {
        return ({
            readme: '',
            quote: 'Be'
        });
    },
    changeQuote: function () {
        that = this;
        var quotes = ['Be', 'Get', 'Have', 'Become', 'Join', 'Feel', 'Steal', '42', 'I\'m', 'Oh my', 'Love', 'Like'];
        setTimeout(function(){
            that.setState({
                quote: quotes[getRandomIntInclusive(0, quotes.length - 1)]
            });
        },5000);
    },
    render: function() {
        var that = this;
        this.changeQuote();
        return (
            <div className="main-container">
                <div className="download-component">
                    <div className="sub-container title">
                        <div className="download-container">
                            <div className="desc-container">
                                <h1><i>W</i>ARM</h1>
                                <h3>- A new and simple way to create web-applications</h3>
                                <h3>using react Js -</h3>
                            </div>
                        </div>
                    </div>
                    <div className="npm-container">
                        <p>$ npm install warm --save</p>
                    </div>
                    <div className="sub-container download">
                        <div className="download-container">
                            <div className="button-container">
                                <div className="front">
                                    <h3 className="use">Download</h3>
                                    <button className="download-button"><i>{that.state.quote} WARM</i></button>
                                </div>
                                <div className="back down">
                                    <img src="http://i.imgur.com/duox2qy.png" alt="Down" height="50" width="50"/>
                                </div>
                            </div>
                            <div className="button-container">
                                <div className="front">
                                    <button className="git-button"><i>Github</i></button>
                                    <h3 className="contribute">Contribute</h3>
                                </div>
                                <div className="back up">
                                    <img src="http://i.imgur.com/BCniysX.png" alt="Up" height="50" width="50"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="about" className="about-component">
                    <div className="about-container">
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Index;
