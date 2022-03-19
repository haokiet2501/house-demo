import { useState } from 'react'

function CreateListing() {
    const [geolocationEnabled, setGeolocation]

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
        lattitude: 0,
        longitude: 0,
    })

    return (
        <div>
            Create
        </div>
    )
}

export default CreateListing
