import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'


function ListingItem({ listing, id }) {
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
                        <img src={bedIcon} alt="" />
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default ListingItem
