import React, {Component} from 'react';

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="header">
                    <img src="https://getqor.com/source/images/qor-logo.svg" alt="QOR Logo" />
                    <h2>QOR microsite develop demo</h2>
                </div>
                <h2 className="intro">
                    <p>
                        The src folder is for microsite demo,<br /> please replace this folder with your real microsite files.
                    </p>
                    <p>
                        More about the <a href="https://github.com/theplant/qor-microsite-develop/blob/master/README.md">develop environment setup details</a>
                    </p>
                </h2>
            </div>
        );
    }
}

export default App;
