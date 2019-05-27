import React from 'react';
import { hot } from 'react-hot-loader';

import Search from './components/search/search';
import Upload from './components/upload/upload';
import Result from './components/result/result';

import styles from './styles.scss'

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            imageSrc: "",
            result: [],
            loading: false,
            valid: true,
            imageFileName: ""
        };
    }

    uploadImageHandler(e) {
        if (e.target.value !== "") {
            const reactState = this;
            const fileReader = new FileReader();

            fileReader.addEventListener("load", function () {
                reactState.setState({ "imageSrc": fileReader.result });
            }, false);

            this.setState({ "valid": true , imageFileName: e.target.value.replace('C:\\fakepath\\','') });
            fileReader.readAsDataURL(e.target.files[0]);

            this.setState({ "result": [] });
        }
    }

    async searchHandler(e) {
        e.preventDefault();

        if (e.target.image.files.length === 0) {
            this.setState({ "valid": false });
        } else {
            this.setState({ "loading": true });

            let formData = new FormData();
            formData.append("file", e.target.image.files[0]);

            const response = await fetch("/products", {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                referrer: 'no-referrer',
                body: formData
            });

            const data = await response.json();
            console.log([data]);

            this.setState({ "result": [data], "loading": false  });
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-5">
                            <Search
                                valid={ this.state.valid }
                                loading={ this.state.loading }
                                imageFileName={ this.state.imageFileName }
                                searchHandler={ (e) => { this.searchHandler(e); } }
                                uploadImageHandler={ (e) => { this.uploadImageHandler(e); } }
                            />
                            <br/>
                            <Upload
                                imageSrc={ this.state.imageSrc }
                            />
                        </div>
                        <div className="col">
                            <Result
                                result={ this.state.result }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(App);