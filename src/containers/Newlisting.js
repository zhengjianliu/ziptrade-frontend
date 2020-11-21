import React, {Component} from 'react'
import ImageUploader from '../components/ImageUploader'

class Newlisting extends Component{
    render(){
        return(
            <div className="accountpage">
                <div className="accountleftside">
                    <h1>Image Uploader:</h1>
                    <small>Maxmium image size: 2MB</small>
                    <br/>
                    <br/>
                    <ImageUploader/>
                </div>

                <div className="accountrightside">
                    <form>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default Newlisting