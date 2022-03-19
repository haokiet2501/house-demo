import { useState } from 'react'

function CreateListing() {
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        
    })

    return (
        <div>
            Create
        </div>
    )
}

export default CreateListing
