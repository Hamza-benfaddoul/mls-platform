import MobileSidebar from './MobileSidebar'
import NavbarRoutes from '@/components/NavbarRoutes'

const Navbar = () => {
  return (
    <div className='p-4  h-full flex items-center bg-white  shadow-sm '>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}

export default Navbar
