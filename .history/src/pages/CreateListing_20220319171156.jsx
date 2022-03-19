// Pagination / Load More
const onFetchMoreListings = async () => {
    try {
        // Get reference
        const listingsRef = collection(db, 'listings')

        // Create a query
        const q = query(
            listingsRef, 
            where('type', '==', params.categoryName),
            orderBy('timestamp', 'desc'),
            startAfter(lastFetchedListing),
            limit(5)
        )

        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length-1]
        setLastFetchedListing(lastVisible)

        const listings = []

        querySnap.forEach((doc) => {
            return listings.push({
                id: doc.id,
                data: doc.data()
            })
        })
        
        setListings((prevState) => [...prevState, ...listings])
        setLoading(false)
    } catch (error) {
        toast.error('Không tìm thấy dữ liệu nào')
    }
}// Pagination / Load More
const onFetchMoreListings = async () => {
    try {
        // Get reference
        const listingsRef = collection(db, 'listings')

        // Create a query
        const q = query(
            listingsRef, 
            where('type', '==', params.categoryName),
            orderBy('timestamp', 'desc'),
            startAfter(lastFetchedListing),
            limit(5)
        )

        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length-1]
        setLastFetchedListing(lastVisible)

        const listings = []

        querySnap.forEach((doc) => {
            return listings.push({
                id: doc.id,
                data: doc.data()
            })
        })
        
        setListings((prevState) => [...prevState, ...listings])
        setLoading(false)
    } catch (error) {
        toast.error('Không tìm thấy dữ liệu nào')
    }
}