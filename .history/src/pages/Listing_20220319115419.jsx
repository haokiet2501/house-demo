import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(null)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async() => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                console.log(docSnap.data());
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if(loading) {
        return <Spinner />
    }

    return (
        <main>
            <Swiper slidesPerView={1} pagination={{ clickable: true}}>
                {listing.imgUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{background: `url(${listing.imgUrls[index]}) center no-repeat`,
                            backgroundSize: 
                            }}
                            className='swiperSlideDiv'
                        >

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
    
            <div className="shareIconDiv" onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setShareLinkCopied(true)
                setTimeout(() => {
                    setShareLinkCopied(false)
                }, 2000)
            }}>
                <img src={shareIcon} alt="shared" />
            </div>

            {shareLinkCopied && <p className='linkCopied'>Copy Link!</p>}

            <div className="listingDetails">
                <p className="listingName">
                    {listing.name} - $
                    {listing.offer 
                        ? listing.discountedPrice 
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : listing.regularPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                </p>
                <div className="listingLocation">{listing.location}</div>
                <div className="listingType">
                    Loại {listing.type === 'rent' ? 'Nhà cho thuê' : 'Nhà bán'}
                </div>
                {listing.offer && (
                    <p className='discountPrice'>
                        Giảm giá ${listing.regularPrice - listing.discountedPrice}
                    </p>
                )}

                <ul className="listingDetailsList">
                    <li>
                        {
                            listing.bedrooms > 1 
                                ? `${listing.bedrooms} Phòng ngủ`
                                : '1 Phòng ngủ'
                        }
                    </li>
                    <li>
                        {
                            listing.bathrooms > 1 
                                ? `${listing.bathrooms} Nhà vệ sinh`
                                : '1 Nhà vệ sinh'
                        }
                    </li>
                    <li>{listing.parking && 'Bãi đậu xe'}</li>
                    <li>{listing.furnished && 'Nội thất'}</li>
                </ul>

                <p className="listingLocationTitle">Vị trí</p>

                <div className="leafletContainer">
                    <MapContainer
                        style={{ height: '100%', width: '100%' }}
                        center={[listing.geolocation.lat, listing.geolocation.lng]}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/    copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                        />

                        <Marker
                            position={[listing.geolocation.lat, listing.geolocation.lng]}
                        >
                            <Popup>{listing.location}</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                {auth.currentUser?.uid !== listing.userRef && (
                    <Link
                        to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                        className='primaryButton'
                    >
                        Liên hệ
                    </Link>
                )}
            </div>
        </main>
    )
}

export default Listing
