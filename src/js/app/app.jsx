var React = require('react');

var WarmApp = React.createClass({
    render: function() {
        return (
            <div>
                <div className="head-component">
                    <div className="head-home-button">
                        <h3>WARM</h3>
                    </div>
                    <div className="head-anchor-list">
                        <ul>
                            <li><a href="#about">About</a></li>
                            <li><a href="#discover">Discover</a></li>
                        </ul>
                    </div>
                </div>
                <div className="download-component">
                    <div className="download-container">
                        <h1>WARM</h1>
                        <h3>- We Are React Masters -</h3>
                        <button className="download-button">Be WARM</button>
                    </div>
                </div>
                <div id="about" className="about-component">
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
                    <div className="discover-container">
                        <h2>' Discover WARM '</h2>
                        <div className="discover-box">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = WarmApp;
