import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'

function Explore() {
    return (
        <div className='explore'>
            <header>
                <p className="pageHeader">Khám Phá</p>
            </header>

            <main>
                {/* Slider */}

                <p className="exploreCategoryHeading">Danh Mục</p>
                <div className="exploreCategories">
                    <Link to='/category/rent'>
                        <img 
                            src={rentCategoryImage} 
                            alt="rent" 
                            className='exploreCategoryImg' 
                        />
                        <p className="exploreCategoryName">Nhà Cho Thuê</p>
                    </Link>

                    <Link to='/category/sale'>
                        <img 
                            src={sellCategoryImage} 
                            alt="rent" 
                            className='exploreCategoryImg' 
                        />
                        <p className="exploreCategoryName">Nhà Bán</p>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Explore
