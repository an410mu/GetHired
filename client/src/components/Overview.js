import React, {useState} from 'react';
import demo from '../assets/demo.png';







const Overview = () => {

  const [add, setAdd] = useState(false);



  return (
    <div>
      <img src={demo} alt='demo' className='demo' />

    </div>
  )
}

export default Overview;