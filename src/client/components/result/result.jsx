import React from 'react';
import PropTypes from 'prop-types';

import Entity from '../entity/entity';

import styles from './styles.scss'

class Result extends React.Component {
    render() {
        if (this.props.result.length !== 0) {
            const webEntitiesElements = this.props.result[0].webEntities
                .filter((item) => {
                    return item.description !== "";
                })
                .map((item, index) => {
                    return (
                        <tr key={ index + 1 }>
                            <Entity webEntity={ item }/>
                        </tr>
                    );
                });

            const visuallySimilarImagesElements = this.props.result[0].visuallySimilarImages.map((item, index) => {
                    return (
                        <img key={ index + 1 } src={ item.url } height="100px" alt=" Similar image..."/>
                    );
            });

            return (
              <div>
                <p className={ styles.desc }>Entities identified within the uploaded image</p>
                <table className={ styles.result + " table" }>
                    <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Description</th>
                          <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        { webEntitiesElements }
                    </tbody>
                </table>

                <br/>

                <p className={ styles.desc }>Visually similiar images with the uploaded image</p>
                <div className={ styles.visuallySimilarImages }>
                    { visuallySimilarImagesElements }
                </div>
              </div>
            );
        } else {
            return (
              <div>
              </div>
            );
        }
    }
}

Result.propTypes = {
    result: PropTypes.array.isRequired
};

export default Result;