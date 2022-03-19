import { useState } from 'react'

function CreateListing() {
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
        discounted
    })

    return (
        <div>
            Create
        </div>
    )
}

export default CreateListing
