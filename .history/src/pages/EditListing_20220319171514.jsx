import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, updateDoc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {v4 as uuidv4} from 'uuid'
import Spinner from '../components/Spinner'

function EditListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(false)

    const [loading, setLoading] = useState(false)
    const [listing, setListing] = useState(false)

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
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
            )

            const data = await response.json()

            geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
            geolocation.lng = data.results[0]?.geometry.location.lng ?? 0

            location = 
                data.status === 'ZERO_RESULTS' 
                    ? undefined : data.results[0]?.formatted_address

            if(location === undefined || location.includes('undefined')) {
                setLoading(false)
                toast.error('Vui lòng nhập chính xác địa chỉ')
                return
            }
        } else {
            geolocation.lat = latitude
            geolocation.lng = longitude
        }

        // Store image in firebase
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                const storageRef = ref(storage, 'images/' + fileName)

                const uploadTask = uploadBytesResumable(storageRef, image)

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {
                        reject(error)
                    }, 
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                )
            })
        }

        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch(() => {
            setLoading(false)
            toast.error('Tải ảnh lên thất bại')
            return
        })

        const formDataCopy = {
            ...formData,
            imgUrls,
            geolocation,
            timestamp: serverTimestamp()
        }

        formDataCopy.location = address
        delete formDataCopy.images
        delete formDataCopy.address
        !formDataCopy.offer && delete formDataCopy.discountedPrice
        
        const docRef = await addDoc(collection(db, 'listings'), formDataCopy)

        setLoading(false)
        toast.success('Thêm thành công')
        navigate(`/category/${formData.type}/${docRef.id}`)
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
                <p className="pageHeader">Sửa Danh Sách</p>
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
                        Cập Nhật
                    </button>
                </form>
            </main>
        </div>
    )
}

export default EditListing
