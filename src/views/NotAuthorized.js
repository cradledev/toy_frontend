// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

import themeConfig from '@configs/themeConfig'

// ** Styles
import '@styles/base/pages/page-misc.scss'

const NotAuthorized = () => {
  // ** Hooks
  const { skin } = useSkin()

  const illustration = skin === 'dark' ? 'not-authorized-dark.png' : 'not-authorized.png',
    source = require(`@src/assets/images/pages/${illustration}`).default
  return (
    <div className='misc-wrapper'>
      <Link className='brand-logo' to='/'>
        <img src={themeConfig.app.appLogoImage} height="30" alt='logo' />
        <h2 className='brand-text text-primary ms-1'>Toy Ecommerce</h2>
      </Link>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>You are not authorized! 🔐</h2>
          <p className='mb-2'>
            You must have a credential and permission to access this sit.
          </p>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-1'>
            Back to Home
          </Button>
          <img className='img-fluid' src={source} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
