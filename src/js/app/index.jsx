var React = require('react')
var discoverTest = ['Be', 'Get', 'Have', 'Become', 'Join', 'Feel', 'Steal', '42', 'I\'m', 'Oh my', 'Love', 'Like'];

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
                    <div className="download-container">
                        <h1>WARM</h1>
                        <h3>- We Are React Masters -</h3>
                        <button className="download-button">{that.state.quote} WARM</button>
                    </div>
                </div>
                <div id="about" className="about-component">
                    <div className="down-arrow"></div>
                    <div className="about-container">
                        <h2>' What is WARM? '</h2>
                        <br></br>
                        <div className="about-paragraph">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <br></br>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <br></br>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
                <div id="discover" className="discover-component">
                    <div className="down-arrow"></div>
                    <div className="discover-container">
                        <h2>' Discover WARM '</h2>
                        <div className="discover-box">
                            <ul>
                                {
                                    discoverTest.map(function (listValue) {
                                        return <li><div className="discover-elem-back">{listValue}</div><div className="discover-elem-front"></div></li>;
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Index;
