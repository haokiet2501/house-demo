import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function CreateListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true)

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0,
    })

    const {
        type, 
        name, 
        bedrooms, 
        bathrooms, 
        parking, 
        furnished, 
        address, 
        offer, 
        regularPrice, 
        discountedPrice, 
        images, 
        latitude, 
        longitude
    } = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if(isMounted) {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setFormData({...formData, userRef: user.uid})
                } else {
                    navigate('/sign-in')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    const onSubmit = async (e) => {
        e.preventDefault()
        
        setLoading(true)

        if(discountedPrice >= regularPrice) {
            setLoading(false)
            toast.error('Giá ưu đãi phải nhỏ hơn giá ban đầu')
            return
        }

        if(images.length > 6) {
            setLoading(false)
            toast.error('Tối đa 6 ảnh')
            return
        }

        let geolocation = {}
        let location

        if(geolocationEnabled) {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAj1lg0Thhg1wWSABx9pe`
            )

            const data = await response.json()

            console.log(data);
        } else {
            geolocation.lat = latitude
            geolocation.lng = longitude
            location = address
        }

        setLoading(false)
    }

    const onMutate = (e) => {
        let boolean = null

        if(e.target.value === 'true') {
            boolean = true
        }
        if(e.target.value === 'false') {
            boolean = false
        }
        // Files
        if(e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }
        // Text/Boolean/Numbers
        if(!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }))
        }
    }

    if(loading) {
        return <Spinner />
    }

    return (
        <div className='profile'>
            <header>
                <p className="pageHeader">Tạo Danh Sách</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <label className='formLabel'>Nhà bán / Nhà cho thuê</label>
                    <div className='formButtons'>
                        <button 
                            type='button'
                            className={type === 'sale' ? 'formButtonActive' : 'formButton'}
                            id='type'
                            value='sale'
                            onClick={onMutate}
                        >
                            Nhà bán
                        </button>

                        <button 
                            type='button'
                            className={type === 'rent' ? 'formButtonActive' : 'formButton'}
                            id='type'
                            value='rent'
                            onClick={onMutate}
                        >
                            Nhà cho thuê
                        </button>
                    </div>

                    <label className="formLabel">Tên</label>
                    <input 
                        type="text" 
                        className='formInputName'
                        id='name'
                        value={name}
                        onChange={onMutate}
                        maxLength='32'
                        minLength='10'
                        required
                    />

                    <div className="formRooms flex">
                        <div>
                            <label className="formLabel">Phòng ngủ</label>
                            <input 
                            type="number" 
                            className='formInputSmall'
                            id='bedrooms'
                            value={bedrooms}
                            onChange={onMutate}
                            min='1'
                            max='50'
                            required
                            />
                        </div>
                        <div>
                            <label className="formLabel">Nhà vệ sinh</label>
                            <input 
                            type="number" 
                            className='formInputSmall'
                            id='bathrooms'
                            value={bathrooms}
                            onChange={onMutate}
                            min='1'
                            max='50'
                            required
                            />
                        </div>
                    </div>

                    <label className="formLabel">Bãi đậu xe</label>
                    <div className="formButtons">
                        <button
                            className={parking ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='parking'
                            value={true}
                            onClick={onMutate}
                        >
                            Có
                        </button>

                        <button
                            className={
                                !parking && parking !== null ? 'formButtonActive'
                                : 'formButton'
                            }
                            type='button'
                            id='parking'
                            value={false}
                            onClick={onMutate}
                        >
                            Không
                        </button>
                    </div>

                    <label className="formLabel">Nội thất</label>
                    <div className="formButtons">
                        <button
                            className={furnished ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='furnished'
                            value={true}
                            onClick={onMutate}
                        >
                            Có
                        </button>

                        <button
                            className={
                                !furnished && furnished !== null ? 'formButtonActive'
                                : 'formButton'
                            }
                            type='button'
                            id='furnished'
                            value={false}
                            onClick={onMutate}
                        >
                            Không
                        </button>
                    </div>

                    <label className="formLabel">Địa chỉ</label>
                    <textarea 
                        className='formInputAddress'
                        type='text'
                        id='address'
                        value={address}
                        onChange={onMutate}
                        required
                    />

                    {!geolocationEnabled && (
                        <div className="formLatLng flex">
                            <div>
                                <label className="formLabel">Vĩ độ</label>
                                <input 
                                    type="number" 
                                    className='formInputSmall'
                                    id='latitude'
                                    value={latitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>

                            <div>
                                <label className="formLabel">Kinh độ</label>
                                <input 
                                    type="number" 
                                    className='formInputSmall'
                                    id='longitude'
                                    value={longitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <label className="formLabel">Giảm giá</label>
                    <div className="formButtons">
                        <button
                            className={offer ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='offer'
                            value={true}
                            onClick={onMutate}
                        >
                            Có
                        </button>

                        <button
                            className={
                                !offer && offer !== null ? 'formButtonActive'
                                : 'formButton'
                            }
                            type='button'
                            id='offer'
                            value={false}
                            onClick={onMutate}
                        >
                            Không
                        </button>
                    </div>

                    <label className="formLabel">Giá khởi điểm</label>
                    <div className="formPriceDiv">
                        <input 
                            type="number" 
                            className='formInputSmall'
                            id='regularPrice'
                            value={regularPrice}
                            onChange={onMutate}
                            min='50'
                            max='750000000'
                            required
                        />
                        {type === 'rent' && <p className="formPriceText">$ / Tháng</p>}
                    </div>
                    {offer && (
                        <>
                            <label className="formLabel">Giá sale</label>
                            <input 
                                type="number" 
                                className='formInputSmall'
                                id='discountedPrice'
                                value={discountedPrice}
                                onChange={onMutate}
                                min='50'
                                max='750000000'
                                required={offer}
                            />
                        </>
                    )}

                    <label className="formLabel">Hình ảnh</label>
                    <p className="imagesInfo">Hình ảnh trang bìa</p>
                    <input 
                        type="file" 
                        className='formInputFile'
                        id='images'
                        onChange={onMutate}
                        max='6'
                        accept='.jpg,.png,.jpeg'
                        multiple
                        required
                    />
                    <button type='submit' className='primaryButton createListingButton'>
                        Tạo Danh Sách
                    </button>
                </form>
            </main>
        </div>
    )
}

export default CreateListing
