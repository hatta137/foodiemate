import { useNavigate } from "react-router-dom";
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';

import Burger from '../assets/Burger.jpg'
import Tappas from '../assets/Tappas.jpg'
import Chicken from '../assets/Chicken.jpg'

const Home = () => {


    return (
        <div>
            <MDBCarousel showControls showIndicators>

                <MDBCarouselItem
                    className='w-100 d-block'
                    itemId={1}
                    src={Burger}
                    alt='...'
                    style={{ objectFit: 'cover', height: '900px' }}
                />
                <div className='mask'>
                    <div className='bottom-0 d-flex align-items-center h-100 text-center justify-content-center'>
                        <div>
                            <h2 className='fw-bold text-white mb-4'>Willkommen bei FoodieMate</h2>
                        </div>
                    </div>
                </div>
                <MDBCarouselItem
                    className='w-100 d-block'
                    itemId={2}
                    src={Tappas}
                    alt='...'
                    style={{ objectFit: 'cover', height: '900px' }}
                />
                <div className='mask'>
                    <div className='bottom-0 d-flex align-items-center h-100 text-center justify-content-center'>
                        <div>
                            <h2 className='fw-bold text-white mb-4'>Willkommen bei FoodieMate</h2>
                        </div>
                    </div>
                </div>
                <MDBCarouselItem
                    className='w-100 d-block'
                    itemId={3}
                    src={Chicken}
                    alt='...'
                    style={{ objectFit: 'cover', height: '900px' }}
                />
                <div className='mask'>
                    <div className='bottom-0 d-flex align-items-center h-100 text-center justify-content-center'>
                        <div>
                            <h2 className='fw-bold text-white mb-4'>Willkommen bei FoodieMate</h2>
                        </div>
                    </div>
                </div>
            </MDBCarousel>
        </div>
    );
};

export default Home;
