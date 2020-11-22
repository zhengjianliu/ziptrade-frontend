import React from 'react'
import Loader from '../components/Loader'

class Homepage extends React.Component{


    renderData = () =>{
    return this.props.items.map((item,index)=>
        <div className="item">
            <img className="itemimage" src={item.images[0]}/>
            <h1>${item.price}</h1>
        </div>
        )
    }

    locator = () =>{
        fetch('https://freegeoip.app/json/')
        .then(resp => resp.json())
        .then(result => console.log(result))
    }

    newLocator = () =>{
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
          function success(pos) {
            var crd = pos.coords;
            console.log(crd)
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          return navigator.geolocation.getCurrentPosition(success, error, options);
    }

    render(){
        return(
            <div className="homepage">
                <Loader/>
                {/* {this.newLocator()} */}
                {this.locator()}
                {/* <ImageUploader/> */}
                {/* <h1>HomePage</h1> */}
                {this.renderData()}
            </div>
        )
    }
}

export default Homepage