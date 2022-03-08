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

  const Group = () => {
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
  
    const fetchApi = () => {
      axios.get(`${url}/api/group`).then((res) => setData(res.data.data.message))
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
    
    const dashboardFunc = (data) => {
      console.log(data)
      history.push(`/device?groupid=${data.group_id}`)
      // setModaldata(data)
      // setShow(true)
      // setEdit(true)
    }

    
    const deleteFunc = (id) => {
      console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: `Confirm Delete '${id.group_name}'`,
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
              axios.delete(`${url}/api/group/${id.group_id}`).then((res) => {
                if (res.data.data.err) {
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
        // console.log(modaldata)
          Swal.fire({
              title: 'Are you sure?',
              text: `Confirm Update '${modaldata.group_name}'`,
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
                axios.put(`${url}/api/group/${modaldata.group_id}`, {
                  group_name: modaldata.group_name,
                  group_location: modaldata.group_location,
                  group_detail: modaldata.group_detail,
                  group_token: modaldata.group_token,
                  group_password: modaldata.group_password,
                  group_ads: modaldata.group_ads
                }).then((res) => {
                  if (res.data.data.err) {
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
        name: 'Actions',
        allowOverflow: true,
        cell: (data) => {
          return (
            <div className='d-flex'>
              <Box size={15} onClick={() => dashboardFunc(data)} style={{cursor:'pointer'}}/>
              <span className='align-middle ms-1'/>
              <FileText size={15} onClick={() => detailsFunc(data)} style={{cursor:'pointer'}}/>
              <span className='align-middle ms-1'/>
              <Edit size={15} onClick={() => editFunc(data)} style={{cursor:'pointer'}}/>
              <span className='align-middle ms-1'/>
              <Trash size={15} onClick={() => deleteFunc(data)} style={{cursor:'pointer'}}/>
            </div>
          )
        }
      },
      {
        name: 'Name',
        sortable: true,
        // minWidth:'50px',
        selector: row => row.group_name
      },
      {
        name: 'Location',
        sortable: true,
        // minWidth: '50px',
        selector: row => row.group_location
      },
      {
        name: 'Detail',
        sortable: true,
        // minWidth: '50px',
        selector: row => row.group_detail
      },
      {
        name: 'Token',
        sortable: true,
        // minWidth: '50px',
        selector: row => row.group_token
      },
      {
        name: 'Password',
        sortable: true,
        // minWidth: '50px',
        selector: row => row.group_password
      },
      {
        name: 'Ads',
        sortable: true,
        // minWidth: '50px',
        selector: row => row.group_ads
      }
    ]
    
    return (
      <div>        
        <Card className='card-statistics'>
          <CardHeader>
            <CardTitle tag='h4'>Device Statistics</CardTitle>
            {/* <CardText className='card-text font-small-2 me-25 mb-0'>Updated 1 month ago</CardText> */}
          </CardHeader>
          <CardBody className='statistics-body'>
            <Row>
              <Col>
                <div className='d-flex align-items-center'>
                  <Avatar color='light-primary' icon={<TrendingUp size={24} />} className='me-2' />
                  <div className='my-auto'>
                    <h4 className='fw-bolder mb-0'>{data.length}</h4>
                    <CardText className='font-small-3 mb-0'>Group</CardText>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Button color="primary" onClick={() => history.push('/group-add')}>+ Add Group</Button>
        <span className='align-middle ms-1'/>
        <Button color="warning" onClick={() => fetchApi()}>Refresh</Button>
        <span className='align-middle ms-1'/>
        
        <br/>
        <br/>
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
              <h1 className='mb-1'>Group Information</h1>
              {/* <p>Updating user details will receive a privacy audit.</p> */}
            </div>
            <Row tag='form' className='gy-1 pt-75'>
              <Col md={12} xs={12}>
                <Label className='form-label' for='Name'>
                  Name
                </Label>
                <Input type='text' placeholder='Name' defaultValue={modaldata.group_name} value={modaldata.group_name} onChange={(e) => setModaldata({...modaldata, group_name:e.target.value})} disabled={!edit}/>
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='Location'>
                  Location
                </Label>
                <Input type='text' placeholder='Location' defaultValue={modaldata.group_location} value={modaldata.group_location} onChange={(e) => setModaldata({...modaldata, group_location:e.target.value})} disabled={!edit}/>
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='Detail'>
                  Detail
                </Label>
                <Input type='text' placeholder='Detail' defaultValue={modaldata.group_detail} value={modaldata.group_detail} onChange={(e) => setModaldata({...modaldata, group_detail:e.target.value})} disabled={!edit}/>
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='Token'>
                  Token
                </Label>
                <Input type='text' placeholder='Token' defaultValue={modaldata.group_token} value={modaldata.group_token} onChange={(e) => setModaldata({...modaldata, group_token:e.target.value})} disabled/>
                {/* <Input type='text' placeholder='Token' defaultValue={modaldata.group_token} value={modaldata.group_token} onChange={(e) => setModaldata({...modaldata, group_token:e.target.value})} disabled={!edit}/> */}
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='Password'>
                  Password
                </Label>
                <Input type='text' placeholder='Password' defaultValue={modaldata.group_password} value={modaldata.group_password} onChange={(e) => setModaldata({...modaldata, group_password:e.target.value})} disabled/>
                {/* <Input type='text' placeholder='Password' defaultValue={modaldata.group_password} value={modaldata.group_password} onChange={(e) => setModaldata({...modaldata, group_password:e.target.value})} disabled={!edit}/> */}
              </Col>
              <Col md={12} xs={12}>
                <Label className='form-label' for='Ads'>
                  Ads
                </Label>
                <Input type='text' placeholder='Ads' defaultValue={modaldata.group_ads} value={modaldata.group_ads} onChange={(e) => setModaldata({...modaldata, group_ads:e.target.value})} disabled={!edit}/>
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
      </div>
    )
  }
  
  export default Group
  