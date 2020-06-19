import React, {Component} from 'react';
import axios from 'axios';

import './property-register.styles.scss';

class PropertyRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            type: '',
            status: '',
            location: '',
            bedrooms: 1,
            bathrooms: 1,
            garages: 1,
            price: 0,
            area: '',
            year: '',
            displayImage: undefined,
            galleryImages: [],
            property: null
        }
    }

    handleTextChange = ({target}) => {
        const {name, value} = target;
        this.setState({[name]: value});
    }

    handleFileChange = (event) => {
        this.setState({displayImage: event.target.files[0]});
    }

    handleFilesChange = (event) => {
        this.setState({galleryImages: event.target.files});
    }

    submit = (event) => {
        event.preventDefault();

        var formData = new FormData();

        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('type', this.state.type);
        formData.append('status', this.state.status);
        formData.append('location', this.state.location);
        formData.append('bedrooms', this.state.bedrooms);
        formData.append('bathrooms', this.state.bathrooms);
        formData.append('garages', this.state.garages);

        formData.append('price', this.state.price);
        formData.append('area', this.state.area);
        formData.append('year', this.state.year);
        formData.append('displayImage', this.state.displayImage);
        //formData.append('galleryImages', this.state.galleryImages);
        for (const key of Object.keys(this.state.galleryImages)) {
            formData.append('galleryImages', this.state.galleryImages[key])
        }

        axios({
            headers: {'Content-Type':'multipart/form-data'},
            url: '/property/register',
            data: formData,
            method: 'POST'
        })
        .then(response => {
            console.log('Sucess ', response);
            this.setState({property: response.data.property})
            this.restoreState();
        })
        .catch(error => {
            console.log(error);
        })
    }

    restoreState = () => {
        this.setState({
            title: '',
            description: '',
            type: '',
            status: '',
            location: '',
            bedrooms: 1,
            bathrooms: 1,
            garages: 1,
            price: 0,
            area: '',
            year: '',
            displayImage: undefined,
            displayImageKey: Date.now(),
            galleryImagesKey: Date.now(),
            galleryImages: []
        })
    }

    render() {
        var value = 0;
        return(
            <div className="property-register">
                <form onSubmit={this.submit}>
                    <div>
                        <label htmlFor='title'>Title</label>
                        <br />
                        <input type='text' name='title' value={this.state.title} onChange={this.handleTextChange}/>
                        <br /><br />

                        <label htmlFor='description'>Description</label>
                        <br />
                        <input type='text' name='description' value={this.state.description} onChange={this.handleTextChange} />
                        <br /><br />

                        <label htmlFor='type'>Type</label>
                        <select id="type" name="type" value={this.state.type} onChange={this.handleTextChange}>
                            <option value="rent">Rent</option>
                            <option value="sale">Sale</option>
                        </select>
                        <br /><br />

                        <label htmlFor='status'>Status</label>
                        <br />
                        <input type='text' name='status' value={this.state.status} onChange={this.handleTextChange} />
                        <br /><br />

                        <label htmlFor='location'>Main Location</label>
                        <br />
                        <input type='text' name='location' value={this.state.location} onChange={this.handleTextChange} />
                        <br /><br />

                        <label htmlFor='bedrooms'>Bedrooms</label>
                        <br />
                        <select id="bedrooms" name="bedrooms" value={this.state.bedrooms} onChange={this.handleTextChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">3</option>
                            <option value="3">4</option>
                        </select>                    
                        <br /><br />

                        <label htmlFor='bathrooms'>Bathrooms</label>
                        <br />
                        <select id="bathrooms" name="bathrooms" value={this.state.bathrooms} onChange={this.handleTextChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">3</option>
                        </select>                    
                        <br /><br />

                        <label htmlFor='garages'>Garages</label>
                        <br />
                        <select id="garages" name="garages" value={this.state.garages} onChange={this.handleTextChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">3</option>
                        </select>                    
                        <br /><br />
                    </div>
                    
                    <div>
                        <label htmlFor='price'>Price</label>
                        <br />
                        <input type='text' name='price' value={this.state.price} onChange={this.handleTextChange} />
                        <br /><br />

                        <label htmlFor='area'>Area</label>
                        <br />
                        <input type='text' name='area' value={this.state.area} onChange={this.handleTextChange} />
                        <br /><br />

                        <label htmlFor='year'>Year Built</label>
                        <br />
                        <input type='text' name='year' value={this.state.year} onChange={this.handleTextChange} />
                        <br /><br />

                        <label htmlFor='displayImage'>Display Picture</label>
                        <br />
                        <input type='file' name='displayImage' key={this.state.displayImageKey} onChange={this.handleFileChange}/>
                        <br /> <br />

                        <label htmlFor='galleryImages'>Gallery Pictures</label>
                        <br />
                        <input type='file' name='galleryImages' key={this.state.galleryImagesKey} onChange={this.handleFilesChange} multiple/>
                        <br /> <br />
                    </div>

                    <button>Register</button>
                </form>

                {this.state.property? 
                    <div> 
                        <img src={`${this.state.property.displayImage.slice(6)}`} alt={this.state.property.title}/>

                        {this.state.property.galleryImages.map(image => 
                            <img src={`${image.slice(6)}`} key={value++} alt={this.state.property.title}/>
                        )}                        
                    </div>

                    : <div></div>}
            </div>
        );
    };
};

export default PropertyRegister;