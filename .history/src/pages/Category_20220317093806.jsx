import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
    collection,
    getDocs,
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
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get reference
                const listingsRef = collection(db, 'listings')

                // Create a query
                const q = query(
                    listingsRef, 
                    where('type', '==', params.categoryName),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                )

                // Execute query
                const querySnap = await getDocs(q)

                const listings = []

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                
                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('Không tìm thấy dữ liệu nào')
            }
        }

        fetchListings()
    }, [])

    return (
        <div className='category'>
            <header>
                <p className="pageHeader">
                    {params.categoryName === 'rent'
                        ? 'Nhà cho thuê'
                        : 'Nhà bán'
                    }
                </p>
            </header>

            {loading ? (
                <Spinner />
            ) : listings && listings.length > 0 ? (
                <></>
            ) : (
                <p>Không có danh sách nào cho {params.categoryName }</p>
            )}
        </div>
    )
}

export default Category
