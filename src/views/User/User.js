// import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import {
    Card,
    CardHeader,
    CardTitle,
    CardText,
    CardLink,
    CardBody,
    Form,
    Modal,
    ModalBody,
    ModalHeader,
    Label,
    Input,
    Button,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge
  } from "reactstrap"
  import { Controller } from 'react-hook-form'
  
  import Avatar from '@components/avatar'
  import Select from 'react-select'
  import { MoreVertical, Edit, User, Check, X, FileText, Archive, Trash, ChevronDown, Delete, TrendingUp, Box, DollarSign } from 'react-feather'
  import axios from 'axios'
  import {useEffect, useState} from 'react'
  import { useHistory } from "react-router-dom"
  import Swal from "sweetalert2"
  import DataTable from 'react-data-table-component'
  import Cleave from 'cleave.js/react'
  import apiConfig from '../../configs/apiConfig'

  const Users = () => {
    const history = useHistory()
    console.log(history)
    // const getLocal = () => {
    //   const authStorage = localStorage.getItem("auth")
    //   const savedStorage = localStorage.getItem("saved")
    //   if (authStorage === null || savedStorage === null) {
    //     history.push('/login')
    //     localStorage.clear()
    //   } else if (savedStorage && (new Date().getTime() - savedStorage > 50 * 60 * 1000)) {
    //     history.push('/login')
    //     localStorage.clear()
    //   } else if (authStorage) {
    //     // history.push('/home')
    //   }
    // }
    // getLocal()
    const url = apiConfig.mainurl.url
    const [data, setData] = useState([])
    const [modaldata, setModaldata] = useState([])
    const [show, setShow] = useState(false)
    const [edit, setEdit] = useState(false)
    const [showadd, setShowadd] = useState(false)
  
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const fetchApi = () => {
      axios.get(`${url}/web/user`).then((res) => setData(res.data.message))
    }
    useEffect(() => {
      fetchApi()
    }, [])

    const detailsFunc = (data) => {
      setModaldata(data)
      setShow(true)
      setEdit(false)
    }

    const editFunc = (data) => {
      setModaldata(data)
      setShow(true)
      setEdit(true)
    }
    
    // const dashboardFunc = (data) => {
    //   console.log(data)
    //   history.push(`/device?groupid=${data.group_id}`)
    //   // setModaldata(data)
    //   // setShow(true)
    //   // setEdit(true)
    // }
    
    const dashboardFunc = (data) => {
      console.log(data)
      history.push(`/device?username=${data.user_username}`)
      // setModaldata(data)
      // setShow(true)
      // setEdit(true)
    }
    
    const adduserFunc = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: `Confirm Add User`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Add it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger ms-1'
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          axios.post(`${url}/web/user`, {
            user_username : username,
            user_password : password
          }).then((res) => {
            console.log(res.data)
            if (res.data.err) {
              Swal.fire({
                title: 'Error',
                icon: 'error',
                customClass: {
                confirmButton: 'btn btn-danger'
              }
            })
            return 0
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Add Information!',
                text: 'Successfully Delete.',
                customClass: {
                  confirmButton: 'btn btn-success'
                }
              }).then(function (result) {
                if (result.value) {
                  // window.location.reload(false)
                  fetchApi()
                  setUsername("")
                  setPassword("")
                  setShowadd(false)
                }
              })                                     
            }
          })              
        }
      })


    }
    const deleteFunc = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Confirm Delete '${id.user_id}'`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-danger ms-1'
            },
            buttonsStyling: false
          }).then(function (result) {
            if (result.value) {
              axios.delete(`${url}/web/user/${id.user_id}`).then((res) => {
                if (res.data.err) {
                  Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    customClass: {
                    confirmButton: 'btn btn-danger'
                  }
                })
                return 0
                } else {
                  Swal.fire({
                    icon: 'success',
                    title: 'Delete Information!',
                    text: 'Successfully Delete.',
                    customClass: {
                      confirmButton: 'btn btn-success'
                    }
                  }).then(function (result) {
                    if (result.value) {
                      // window.location.reload(false)
                      fetchApi()
                    }
                  })                                     
                }
              })              
            }
          })
      }

      const updateFunc = () => {
        // console.log(modaldata)user_name user_tel user_email
          Swal.fire({
              title: 'Are you sure?',
              text: `Confirm Update '${modaldata.user_id}'`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, update it!',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger ms-1'
              },
              buttonsStyling: false
            }).then(function (result) {
              if (result.value) {
                axios.put(`${url}/web/user/${modaldata.user_id}`, {
                  user_username: modaldata.user_username,
                  user_password: modaldata.user_password
                }).then((res) => {
                  if (res.data.err) {
                    Swal.fire({
                      title: 'Error',
                      icon: 'error',
                      customClass: {
                      confirmButton: 'btn btn-danger'
                    }
                  })
                  return 0
                  } else {
                    Swal.fire({
                      icon: 'success',
                      title: 'Add Information!',
                      text: 'Successfully Added.',
                      customClass: {
                        confirmButton: 'btn btn-success'
                      }
                    }).then(function (result) {
                      if (result.value) {
                        // window.location.reload(false)
                        setShow(false)
                        setEdit(false)
                        fetchApi()
                      }
                    })                                     
                  }
                })              
              }
            })
        }
    const basicColumns = [
      {
        name: 'User ID',
        sortable: true,
        // minWidth:'50px',
        selector: row => row.user_id
      },
      {
        name: 'Username',
        sortable: true,
        // minWidth:'50px',
        selector: row => row.user_username
      },
      {
        name: 'Password',
        sortable: true,
        // minWidth: '50px',
        selector: row => row.user_password
      },
      {
        name: 'Actions',
        allowOverflow: true,
        cell: (data) => {
          return (
            <div className='d-flex'>
              {/* <Box size={15} onClick={() => dashboardFunc(data)} style={{cursor:'pointer'}}/>
              <span className='align-middle ms-1'/> */}
              {/* <FileText size={15} onClick={() => detailsFunc(data)} style={{cursor:'pointer'}}/> */}
              {data.user_permission === 1 ? <FileText size={15} onClick={() => detailsFunc(data)} style={{cursor:'pointer'}}/> : null}
              <span className='align-middle ms-1'/>
              {/* <Edit size={15} onClick={() => editFunc(data)} style={{cursor:'pointer'}}/> */}
              {data.user_permission === 1 ? <Edit size={15} onClick={() => editFunc(data)} style={{cursor:'pointer'}}/> : null}
              <span className='align-middle ms-1'/>
              {/* <Trash size={15} onClick={() => deleteFunc(data)} style={{cursor:'pointer'}}/> */}
              {data.user_permission === 1 ? <Trash size={15} onClick={() => deleteFunc(data)} style={{cursor:'pointer'}}/> : null}
              <span className='align-middle ms-1'/>
              {data.user_permission === 1 ? <Box size={15} onClick={() => dashboardFunc(data)} style={{cursor:'pointer'}}/> : null}
              

            </div>
          )
        }
      }
    ]
    
    return (
      <div>        
        <Card className='card-statistics'>
          <CardHeader>
            <CardTitle tag='h4'>User Statistics</CardTitle>
            {/* <CardText className='card-text font-small-2 me-25 mb-0'>Updated 1 month ago</CardText> */}
          </CardHeader>
          <CardBody className='statistics-body'>
            <Row>
              <Col>
                <div className='d-flex align-items-center'>
                  <Avatar color='light-primary' icon={<User size={24} />} className='me-2' />
                  <div className='my-auto'>
                    <h4 className='fw-bolder mb-0'>{data.length}</h4>
                    <CardText className='font-small-3 mb-0'>User</CardText>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <span className='align-middle ms-1'/>
        <Button color="success" onClick={() => setShowadd(true)}>+ Add User</Button>
        <span className='align-middle ms-1'/>
        <Button color="warning" onClick={() => fetchApi()}>Refresh</Button>
        <span className='align-middle ms-1'/>
        <br/>
        <br/>
        {/* <Button color="primary" onClick={() => history.push('/group-add')}>+ Add Group</Button>
        <br/>
        <br/> */}
        <DataTable
          noHeader
          pagination
          data={data}
          columns={basicColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
        <Modal isOpen={show} className='modal-dialog-centered modal-lg'>
          <ModalHeader className='bg-transparent'></ModalHeader>
          <ModalBody className='px-sm-5 mx-50 pb-5'>
            <div className='text-center mb-2'>
              <h1 className='mb-1'>User Information</h1>
              {/* <p>Updating user details will receive a privacy audit.</p> */}
            </div>
            <Row tag='form' className='gy-1 pt-75'>
              <Col md={12} xs={12}>
                <Label className='form-label' for='Name'>
                Username
                </Label>
                <Input type='text' placeholder='Name' defaultValue={modaldata.user_username} value={modaldata.user_username} onChange={(e) => setModaldata({...modaldata, user_username:e.target.value})} disabled={!edit}/>
              </Col>
              <Col md={12} xs={12}>
                <Label className='form-label' for='Tel'>
                Password
                </Label>
                <Input type='text' placeholder='Tel' defaultValue={modaldata.user_password} value={modaldata.user_password} onChange={(e) => setModaldata({...modaldata, user_password:e.target.value})} disabled={!edit}/>
              </Col>
              
              <Col xs={12} className='text-center mt-2 pt-50'>
              {edit ? <Button className='me-1' color='primary' onClick={updateFunc}>
                  Submit
                </Button> : null}
                
                <Button type='reset' color='danger' outline onClick={() => setShow(false)}>
                  Close
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>


        <Modal isOpen={showadd} className='modal-dialog-centered modal-lg'>
          <ModalHeader className='bg-transparent'></ModalHeader>
          <ModalBody className='px-sm-5 mx-50 pb-5'>
            <div className='text-center mb-2'>
              <h1 className='mb-1'>Add User</h1>
              {/* <p>Updating user details will receive a privacy audit.</p> */}
            </div>
            <Row tag='form' className='gy-1 pt-75'>
              <Col md={12} xs={12}>
                <Label className='form-label' for='Name'>
                Username
                </Label>
                <Input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
              </Col>
              <Col md={12} xs={12}>
                <Label className='form-label' for='Tel'>
                Password
                </Label>
                <Input type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Col>
              
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button className='me-1' color='success' onClick={adduserFunc}>
                  Add
                </Button>
                
                <Button type='reset' color='danger' outline onClick={() => setShowadd(false)}>
                  Close
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>

        
      </div>
    )
  }
  
  export default Users
  