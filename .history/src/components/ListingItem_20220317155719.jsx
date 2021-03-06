import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'


function ListingItem({ listing, id, onDelete }) {
    return (
        <li className='categoryListing'>
            <Link 
                to={`/category/${listing.type}/${id}`}
                className='categoryListingLink'
            >
                <img 
                    src={listing.imgUrls} alt={listing.name} 
                    className='categoryListingImg'
                />
                <div className="categoryListingDetails">
                    <p className="categoryListingLocation">{listing.location}</p>
                    <p className="categoryListingName">{listing.name}</p>

                    <p className="categoryListingPrice">
                        ${listing.offer 
                            ? listing.discountedPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : listing.regularPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        {listing.type === 'rent' && ' / Tháng'}
                    </p>
                    
                    <div className='categoryListingInfoDiv'>
                        <img src={bedIcon} alt="bed" />
                        <p className="categoryListingInfoText">
                            {listing.bedrooms > 1 
                                ? `${listing.bedrooms} Phòng ngủ` 
                                : '1 Phòng ngủ'}
                        </p>
                        <img src={bathtubIcon} alt="bath" />
                        <p className="categoryListingInfoText">
                            {listing.bathrooms > 1 
                                ? `${listing.bathrooms} Phòng tắm` 
                                : '1 Phòng tắm'}
                        </p>
                    </div>
                </div>
            </Link>

            {onDelete;}
        </li>
    )
}

export default ListingItem
