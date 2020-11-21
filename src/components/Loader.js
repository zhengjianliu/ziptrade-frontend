import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import React from 'react'

export default class App extends React.Component {
 //other logic
   render() {
    return(
      <div className="loader">
       <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={2000} //3 secs

       />
     </div>
    );
   }
}
