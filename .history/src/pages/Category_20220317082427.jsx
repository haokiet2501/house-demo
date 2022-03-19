import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
    collection,
    getDoc,
    query,
    where,
    orderBy,
    limit,
    
} from 'firebase/firestore'

function Category() {
    return (
        <div>
            Category
        </div>
    )
}

export default Category
