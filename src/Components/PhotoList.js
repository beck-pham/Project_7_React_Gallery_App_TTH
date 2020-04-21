//PhotoList component contains the wrapping ul element that will display the list of photos via the photos component
import React , { Component }from 'react';
import Photos from './Photos';
import NotFound from './NotFound';

export default class PhotoList extends Component {
    render() {
        //write if/else statement to fetch photo using map
        const results = this.props.data;
        let photos = '';
        if(results.length > 0) {
            photos = results.map(photo => 
                //using url format sample from Flickr photo source URLs https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
                <Photos url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />)
        } else {
            photos = <NotFound />;
        }
            
        return (
            <div className="photo-container">
                <ul>
                {photos}
                </ul>
            </div>
        );
    }
}



