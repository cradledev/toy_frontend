import { useState, useEffect} from 'react'
import Layout from '@layouts/VerticalLayout'
import { useSkin } from '@hooks/useSkin'
import { useLocation } from 'react-router-dom'
import NavbarComponent from './custom/Navbar'
// ** Menu Items Array
import navigation from '@src/navigation/vertical'

const VerticalLayout = props => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])
  const { skin, setSkin } = useSkin()
  const [menuVisibility, setMenuVisibility] = useState(false)
  const location = useLocation()
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false)
    }
  }, [location])
  return (
    <Layout menuData={navigation} navbar={<NavbarComponent setMenuVisibility={setMenuVisibility} skin={skin} setSkin={setSkin} />} {...props}>
      {props.children}
    </Layout>
  )
}

export default VerticalLayout
