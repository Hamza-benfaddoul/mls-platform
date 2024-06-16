import SidebarRoutes from './SidebarRoutes'

const Sidebar = () => {
  return (
    <div className='h-full bg-gray-100 border-r  flex flex-col overflow-y-auto  shadow-sm'>
      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  )
}

export default Sidebar
