import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateSpot } from '../../store/spots';
import './UpdateSpot.css';

function UpdateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();

  const spot = useSelector(state => state.spots.singleSpot)

  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [description, setDescription] = useState(spot.description);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  const [previewImg, setPreviewImg] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validations = [];
    if (!country.length) validations.push('Country');
    if (!address.length) validations.push('Address');
    if (!city.length) validations.push('City');
    if (!state.length) validations.push('State');
    if (description.length < 30) validations.push('Description');
    if (!name.length) validations.push('Name');
    if (!price || parseInt(price) === 0) validations.push('Price');

    if (!previewImg.length) {
      validations.push('previewImgLength')
    } else if (!previewImg.endsWith('.jpg') && !previewImg.endsWith('.jpeg') && !previewImg.endsWith('.png')) {
      validations.push('previewImgInvalid');
    }

    if (img1.length > 0 && !img1.endsWith('.jpg') && !img1.endsWith('.jpeg') && !img1.endsWith('.png')) {
      validations.push('img1');
    }
    if (img2.length > 0 && !img2.endsWith('.jpg') && !img2.endsWith('.jpeg') && !img2.endsWith('.png')) {
      validations.push('img2');
    }
    if (img3.length > 0 && !img3.endsWith('.jpg') && !img3.endsWith('.jpeg') && !img3.endsWith('.png')) {
      validations.push('img3');
    }
    if (img4.length > 0 && !img4.endsWith('.jpg') && !img4.endsWith('.jpeg') && !img4.endsWith('.png')) {
      validations.push('img4');
    }

    if (validations.length) return setErrors(validations);

    // ! Format the data for a post request to /api/spots
    const newSpot = {
      address, city, state, country,
      name, description, price
    };


    const ImgArray = [
      { url: previewImg, preview: true },
      { url: img1, preview: false },
      { url: img2, preview: false },
      { url: img3, preview: false },
      { url: img4, preview: false }
    ];

    await dispatch(updateSpot(newSpot, spotId, ImgArray));
    history.push(`/spots/${spotId}`);
  };

  return (
    <div className="update-spot-container">
      <form onSubmit={handleSubmit}>
        <div className='form-location-section'>
          <h2>Update your Spot</h2>
          <h3>Where's your place located?</h3>
          <p>Guests will only get your exact address once they booked a reservation.</p>
          <div className='errors'>
            <label htmlFor='country'>Country</label>
            {errors.includes('Country') ? <p style={{ color: 'red' }}>Country is required</p> : null}
          </div>
          <input
            className='input-fields'
            type='text'
            placeholder="Country"
            id='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <div className='errors'>
            <label htmlFor='street-address'>Steet Address </label>
            {errors.includes('Address') ? <p style={{ color: 'red' }}>Address is required</p> : null}
          </div>
          <input
            className='input-fields'
            type='text'
            placeholder='Address'
            id='street-address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className='errors'>
            <label htmlFor='city'>City </label>
            {errors.includes('City') ? <p style={{ color: 'red' }}>City is required</p> : null}
            <input
              className='input-fields'
              type='text'
              placeholder='City'
              id='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <div className='errors'>
              <label htmlFor='state'>State </label>
              {errors.includes('State') ? <p style={{ color: 'red' }}>State is required</p> : null}
            </div>
            <input
              className='input-fields'
              type='text'
              placeholder='STATE'
              id='state'
              value={state}
              onChange={(e) => setState(e.target.value)}
              />
              </div>
              <div className='section-break'></div>
        </div>
        <div className='describe-place'>
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space, any special amentities like fast wifi
            or parking, and what you love about the neighborhood.
          </p>
          <textarea
            className='update-text-area'
            placeholder='Please write at least 30 characters'
            minLength='30'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.includes('Description') ? <p style={{ color: 'red' }}>Description needs a minimum of 30 characters</p> : null}
          <div className='section-break'></div>
        </div>
        <div>
          <h3>Create a title for your spot</h3>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            className='input-fields'
            type='text'
            placeholder='Name of your spot'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.includes('Name') ? <p style={{ color: 'red' }}>Name is required</p> : null}
        <div className='section-break'></div>

        </div>
        <div>
          <h3>Set a base price for your spots</h3>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <label htmlFor='price'>$ </label>
          <input
            className='input-fields'
            type='number'
            placeholder='Price per night (USD)'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.includes('Price') ? <p style={{ color: 'red' }}>Price is required</p> : null}
        <div className='section-break'></div>
        </div>
        <div className='spot-photo-urls'>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            className='input-fields'
            type='text'
            placeholder='Preview Image URL'
            value={previewImg}
            onChange={(e) => setPreviewImg(e.target.value)}
          />
          {errors.includes('previewImgLength') ? <p style={{ color: 'red' }}>Preview image is required</p> : null}
          {errors.includes('previewImgInvalid') ? <p style={{ color: 'red' }}>Image URL must end in .png, .jpg, or .jpeg</p> : null}
          <div>
            <input
              className='input-fields'
              type='text'
              placeholder='Image URL'
              value={img1}
              onChange={(e) => setImg1(e.target.value)}
            />
            {errors.includes('img1') ? <p style={{ color: 'red' }}>Image URL must end in .png, .jpg, or .jpeg</p> : null}
          </div>
          <div>
            <input
              className='input-fields'
              type='text'
              placeholder='Image URL'
              value={img2}
              onChange={(e) => setImg2(e.target.value)}
            />
            {errors.includes('img2') ? <p style={{ color: 'red' }}>Image URL must end in .png, .jpg, or .jpeg</p> : null}
          </div>
          <div>
            <input
              className='input-fields'
              type='text'
              placeholder='Image URL'
              value={img3}
              onChange={(e) => setImg3(e.target.value)}
            />
            {errors.includes('img3') ? <p style={{ color: 'red' }}>Image URL must end in .png, .jpg, or .jpeg</p> : null}
          </div>
          <div>
            <input
              className='input-fields'
              type='text'
              placeholder='Image URL'
              value={img4}
              onChange={(e) => setImg4(e.target.value)}
            />
            {errors.includes('img4') ? <p style={{ color: 'red' }}>Image URL must end in .png, .jpg, or .jpeg</p> : null}
          </div>
        </div>
        <div className='section-break'></div>
        <div className='update-button'>
          <button type="submit" className='submit-button'>Update Your Spot</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateSpotForm;
