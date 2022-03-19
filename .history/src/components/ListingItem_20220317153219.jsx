import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'


function ListingItem() {
    return (
        <li className='categoryListing'>
            <Link 
                to={`/category/${listing.type}/${id}`}
                className='categoryListingLink'
            >
                <img 
                    src={listing.imgUrls} alt="" 

                />
            </Link>
        </li>
    )
}

export default ListingItem
