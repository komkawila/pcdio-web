// import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import {
    Card,
    CardHeader,
    CardTitle,
    CardText,
    CardLink,
    CardBody,
    Form,
    Label,
    Input,
    Button,
    Row,
    Col
  } from "reactstrap"
  
  import Swal from "sweetalert2"
  import Cleave from "cleave.js/react"
  import { useState } from "react"
  import axios from 'axios'
  import { useHistory} from "react-router-dom"

  const Deviceadd = () => {
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
    const params = new URLSearchParams(history.location.search)
    if (!params.get('groupid')) {
        history.push('/')
    }
    const groupid = params.get('groupid')
    // const nametext = useRef("")
    // const locationtext = useRef("")
    // const detailstext = useRef("")
    const [device_name, setdevice_name] = useState("")
    // const [locationtext, setlocationtext] = useState("")
    // const [detailstext, setdetailstext] = useState("")
  
    const onclickSubmit = () => {
        if (!device_name) {
          // if (!nametext.current.state.value || !locationtext.current.state.value || !detailstext.current.state.value) {
          Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
        } else {
          Swal.fire({
              title: 'Are you sure?',
              text: "Confirm Adding",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, add it!',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger ms-1'
              },
              buttonsStyling: false
            }).then(function (result) {
              if (result.value) {
                  axios.post(`https://api.phanuwat.info/api/device/device/adddevice/${groupid}`, {
                    device_name
                  }).then(res => {
                      console.log(res.data.data)
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
                                //   window.location.reload(false)
                                history.push(`/device?groupid=${groupid}`)
                                //   window.location.preventDefault()
                              }
                          })                                     
                      }
                  })                
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                  Swal.fire({
                  title: 'Cancelled',
                  icon: 'error',
                  customClass: {
                      confirmButton: 'btn btn-success'
                      }
                  })
              }
            })
        }
      
      // console.log(`nametext = ${nametext.current.state.value}`)
      // console.log(`locationtext = ${locationtext.current.state.value}`)
      // console.log(`detailstext = ${detailstext.current.state.value}`)
    }
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Add Device</CardTitle>
            {/* <CardTitle className="text-primary" tag="h4">
                $455.60
            </CardTitle> */}
          </CardHeader>
          <CardBody>
            <Form className="form">
              <Row>
                <Col sm="12" className="mb-2">
                  <Label className="form-label" for="group-name">
                    Name
                  </Label>
                  <Input type='text' placeholder='Please enter your name' value={device_name} onChange={(e) => { setdevice_name(e.target.value) }}/>
                </Col>             
                <Col className="d-grid" sm="12">
                  <Button color="primary" onClick={onclickSubmit}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    )
  }
  
  export default Deviceadd
  