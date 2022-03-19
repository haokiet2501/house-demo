import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
    collection,
    getDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Category() {
    const [listins, setLi]

    return (
        <div>
            Category
        </div>
    )
}

export default Category
