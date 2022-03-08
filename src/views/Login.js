// import { useSkin } from '@hooks/useSkin'
import { Link, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
// import axios from 'axios'
import { useState } from 'react'
import axios from 'axios'
import apiConfig from '../configs/apiConfig'
import Swal from "sweetalert2"

const LoginCover = () => {
  const history = useHistory()
  // const { skin } = useSkin()
  const url = apiConfig.mainurl.url
  console.log(`url = ${url}`)
  // const [data, setData] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // skin =`login-v2-dark.svg`
  // const source = require(`soss-logo2.jpg`).default
    // source = require(`@src/assets/images/pages/${illustration}`).default
  const loginFunc = async () => {
    await axios.post(`${url}/api/login/admin`, {
        admin_username : username,
        admin_password : password
    }).then(res => {
      console.log(res.data.data)
      if (!res.data.data.login) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Login error',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login success',
          showConfirmButton: false,
          timer: 500
        }).then(() => {
          localStorage.setItem('saved', new Date().getTime())
          localStorage.setItem("auth", JSON.stringify(res.data))
           
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })

          setTimeout(() => {
            history.push('/home')
          }, 1000)
          
        })
      }
    })
    // console.log(`username = ${username}`)
    // console.log(`password = ${password}`)
  }
  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img src="soss-logo.png" width='100px' height='60px'/>          
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src='soss-logo.png' alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to PCDIO ! 👋
            </CardTitle>
            <Form className='auth-login-form mt-2' onSubmit={loginFunc}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Username
                </Label>
                <Input type='text' id='login-email' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} autoFocus />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <InputPasswordToggle className='input-group-merge' id='login-password' value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <Button color='primary' onClick={loginFunc}>
                Sign in
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default LoginCover
