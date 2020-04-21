//photos component is the presentational component containing the template that displays each photo.

import React from 'react';

const Photos = (props) => (
    <li className="photos-wrap">
        <img src={props.url} alt=""/>
    </li>
);

export default Photos;
