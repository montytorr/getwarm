var React = require('react')
var classie = require('classie');

var Hello = React.createClass({
    render: function() {
        return (
            <p>HELLO WORLD!</p>
        );
    }
});

var How = React.createClass({
    render: function() {
        return (
            <p>How are you?</p>
        );
    }
});

var Bye = React.createClass({
    render: function() {
        return (
            <p>Bye!</p>
        );
    }
});
var testingMenu = [{name: 'Crawl', target: Hello, img: "https://fbcdn-photos-f-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-0/q82/s526x395/11133790_864536946902981_2945518888862620244_n.jpg?oh=9e6b3e6298d07b5fbf4d56d2d84c0674&oe=56C23B75&__gda__=1454981592_10856d76cb147c2122756e849fe97b95"}, {name: 'Info', target: How, img:"http://jnkj.lo"}, {name: 'Param', target: Bye, img:"http://jnkj.lo"}];

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Test = React.createClass({
    getInitialState: function() {
        return ({
            body: this.props.menu[0].target
        });
    },
    changeBody: function (target, index) {
        var targetedList = document.getElementsByClassName('panel-targeted');
        for (var j = 0; j < targetedList.length; j++) {
            classie.remove(targetedList[j], 'panel-targeted');
        }
        classie.add(this.refs[index], 'panel-targeted');
        this.setState({
            body: target
        })
    },
    render: function() {
        var that = this;
        var i = 0;
        return (
            <div className="warm-component pannel-container">
                <div className="pannel-head">

                </div>
                <div className="pannel-menu">
                    <ul>
                        {
                            that.props.menu.map(function(elem) {
                                var boundedClick = that.changeBody.bind(that, elem.target, i);
                                var style = {
                                    width: 300 / that.props.menu.length
                                }
                                return <li className={(i == 0) ? 'panel-targeted' : ''} style={style} ref={i} key={i++} onClick={boundedClick}><img src={elem.img} alt={elem.name} height="42" width="42"/></li>
                            })
                        }
                    </ul>
                </div>
                <div className="pannel-body">
                    <this.state.body />
                </div>
            </div>
        );
    }
});

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
                        <Test menu={testingMenu}></Test>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Index;
