import { Mail, Home, FileText, Shield, Pocket, ChevronsRight, User, Users, UserPlus} from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  // {
  //   id: 'group',
  //   title: 'Group',
  //   icon: <Pocket size={20} />,
  //   children:[
  //     {
  //       id: 'groupAdd',
  //       title: 'Group Manager',
  //       icon: <ChevronsRight size={20} />,
  //       navLink: '/group-detail'
  //     },
  //     {
  //       id: 'groupAdd',
  //       title: 'Add Group',
  //       icon: <ChevronsRight size={20} />,
  //       navLink: '/group-add'
  //     }
  //   ]
  // },
  // {
  //   id: 'admin',
  //   title: 'Admin',
  //   icon: <Shield size={20} />,
  //   children:[
  //     {
  //       id: 'admin',
  //       title: 'Admin Manager',
  //       icon: <ChevronsRight size={20} />,
  //       navLink: '/admin'
  //     },
  //     {
  //       id: 'adminAdd',
  //       title: 'Add Admin',
  //       icon: <ChevronsRight size={20} />,
  //       navLink: '/admin-add'
  //     }
  //   ]
  // },
  {
    id: 'user',
    title: 'User',
    icon: <Users size={20} />,
    children:[
      {
        id: 'user',
        title: 'User Manager',
        icon: <User size={20} />,
        navLink: '/user'
      }
    ]
  }
]

// export default [
//   {
//     id: 'home',
//     title: 'Home',
//     icon: <Home size={20} />,
//     navLink: '/home'
//   },
//   {
//     id: 'group',
//     title: 'Group',
//     icon: <Pocket size={20} />,
//     children:[
//       {
//         id: 'groupAdd',
//         title: 'Group Manager',
//         icon: <ChevronsRight size={20} />,
//         navLink: '/group-detail'
//       },
//       {
//         id: 'groupAdd',
//         title: 'Add Group',
//         icon: <ChevronsRight size={20} />,
//         navLink: '/group-add'
//       }
//     ]
//   },
//   {
//     id: 'admin',
//     title: 'Admin',
//     icon: <Shield size={20} />,
//     children:[
//       {
//         id: 'admin',
//         title: 'Admin Manager',
//         icon: <ChevronsRight size={20} />,
//         navLink: '/admin'
//       },
//       {
//         id: 'adminAdd',
//         title: 'Add Admin',
//         icon: <ChevronsRight size={20} />,
//         navLink: '/admin-add'
//       }
//     ]
//   },
//   {
//     id: 'user',
//     title: 'User',
//     icon: <Users size={20} />,
//     children:[
//       {
//         id: 'user',
//         title: 'User Manager',
//         icon: <User size={20} />,
//         navLink: '/user'
//       }
//     ]
//   }
// ]