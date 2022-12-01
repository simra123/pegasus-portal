import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const PagesRoutes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/pages/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/pages/authentication/ForgotPasswordBasic')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
    {
    path: '/reset-password',
    component: lazy(() => import('../../views/pages/authentication/ResetPasswordBasic')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
    }
]

export default PagesRoutes
