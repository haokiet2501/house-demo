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

                    <div className="categoryListingPrice">
                        ${listing.offer 
                            ? listing.discountedPrice
                                .toString()
                                .replace(/\)
                            : listing.regularPrice}
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default ListingItem
