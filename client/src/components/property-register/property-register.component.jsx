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
            bedrooms: 0,
            bathrooms: 0,
            garages: 0,
            price: '',
            address: '',
            year: '',
            displayImage: undefined,
            displayImageKey: Date.now(),
            galleryImagesKey: Date.now(),
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
        formData.append('address', this.state.address);
        formData.append('price', this.state.price);
        formData.append('year', this.state.year);
        formData.append('displayImage', this.state.displayImage);

        for (const key of Object.keys(this.state.galleryImages)) {
            formData.append('galleryImages', this.state.galleryImages[key])
        }

        console.log(this.state);
        console.log(formData);

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
            bedrooms: 0,
            bathrooms: 0,
            garages: 0,
            price: '',
            year: '',
            address: '',
            displayImage: undefined,
            displayImageKey: Date.now(),
            galleryImagesKey: Date.now(),
            galleryImages: []
        })
    }

    render() {
        var value = 0;
        return(
            <div className="container">
                <form onSubmit={this.submit} className='form-section container'>
                    <div className='row'>
                        <div className='col-1 col-md-2 col-lg-3'></div>
                        <input type='text' name='title' value={this.state.title} onChange={this.handleTextChange} className='form-input col-12 col-sm-12 col-md-8 col-lg-5'  placeholder='Enter Property Title' />                    
                    </div>
                        
                    <div className='row'>
                        <div className='col-1 col-md-2 col-lg-3'></div>
                        <textarea type='text' name='description' className='form-input description col-12 col-sm-12 col-md-8 col-lg-5' value={this.state.description} onChange={this.handleTextChange} placeholder='Enter Property Description'/>
                    </div>

                    <div className='row form-group'>
                        <div className='col-md-2 col-lg-3'></div>
                        
                        <select id="type" name="type" value={this.state.type} onChange={this.handleTextChange} className='col-6 col-sm-6 col-md-4 col-lg-2 select-type'>
                            <option value="">Select A Type</option>
                            <option value="rent">For Rent</option>
                            <option value="sale">For Sale</option>
                        </select>

                        <select id="bedrooms" name="bedrooms" value={this.state.bedrooms} onChange={this.handleTextChange} className='col-6 col-sm-6 col-md-4 col-lg-2 offset-lg-1 select-type'>
                            <option value='0'>Bedrooms</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">3</option>
                            <option value="3">4</option>
                        </select>   
                    </div>

                    <div className='row form-group'>
                        <div className='col-md-2 col-lg-3'></div>

                        <select id="bathrooms" name="bathrooms" value={this.state.bathrooms} onChange={this.handleTextChange} className='col-6 col-sm-6 col-md-4 col-lg-2 select-type'>
                            <option value='0'>Bathrooms</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">3</option>
                        </select>  

                        <select id="garages" name="garages" value={this.state.garages} onChange={this.handleTextChange} className='col-6 col-sm-6 col-md-4 col-lg-2 offset-lg-1 select-type'>
                            <option value='0'>Garages</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">3</option>
                        </select> 
                    </div>

                    <div className='row form-group'>
                        <div className='col-md-2 col-lg-3'></div>

                        <input type='text' name='price' value={this.state.price} onChange={this.handleTextChange} className='col-6 col-sm-6 col-md-4 col-lg-2 select-type' placeholder='Property Price'/>

                        <input type='text' name='year' value={this.state.year} onChange={this.handleTextChange} className='col-6 col-sm-6 col-md-4 col-lg-2 offset-lg-1 select-type' placeholder='Year Built' />
                    </div>

                    <div className='row form-group'>
                        <div className='col-2 col-sm-2 col-md-2 col-lg-4'></div>

                        <select id="location" name="location" value={this.state.location} onChange={this.handleTextChange} className='col-8 col-sm-8 col-md-8 col-lg-3 select-type'>
                            <option value='0'>Select a Location</option>
                            <option value="Melbourne">Melbourne</option>
                            <option value="Sydney">Sydney</option>
                            <option value="Brisbane">Brisbane</option>
                            <option value="Perth">Perth</option>
                        </select>

                        <div className='col-1 col-md-2 col-lg-1'></div>

                    </div>

                    <div className='row'>
                        <div className='col-1 col-md-2 col-lg-3'></div>
                        <textarea type='text' name='address' className='form-input address col-12 col-sm-12 col-md-8 col-lg-5' value={this.state.address} onChange={this.handleTextChange} placeholder='Enter Property Address'/>
                    </div>

                    <div className='row images'>
                        <div className='col-md-2 col-lg-3'></div>

                        <label htmlFor='displayImage' className='col-5 col-sm-5 col-md-2 col-lg-2'>Display Image</label>
                        <input type='file' name='displayImage' className='col-7 col-sm-7 col-md-8 col-lg-5' key={this.state.displayImageKey} onChange={this.handleFileChange} />                    
                    </div>

                    <div className='row images'>
                        <div className='col-md-2 col-lg-3'></div>

                        <label htmlFor='galleryImages' className='col-5 col-sm-5 col-md-2 col-lg-2'>Gallery Images</label>
                        <input type='file' name='galleryImages' className='col-7 col-sm-7 col-md-8 col-lg-5' key={this.state.galleryImagesKey} onChange={this.handleFilesChange} multiple/>
                    </div>

                    <div className='row'>
                        <div className='col-1 col-md-2 col-lg-3'></div>
                        <button className='register-button button col-12 col-sm-12 col-md-8 col-lg-5'>Sign In</button>
                    </div>                
                    
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