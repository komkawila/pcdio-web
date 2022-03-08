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
import Cleave from 'cleave.js/react'
import { useHistory } from "react-router-dom"
// import { useEffect } from "react"

const Home = () => {
  const history = useHistory()
  console.log(history)
  // const getLocal = () => {
  //   const authStorage = localStorage.getItem("auth")
  //   const savedStorage = localStorage.getItem("saved")
  //   if (authStorage === null || savedStorage === null) {
  //     history.push('/login')
  //     // return <Link to="/login"/>
  //     localStorage.clear()
  //   } else if (savedStorage && (new Date().getTime() - savedStorage > 50 * 60 * 1000)) {
  //     history.push('/login')
  //     // return <Link to="/login"/>
  //     localStorage.clear()
  //   } else if (authStorage) {
  //     // return <Link to="/home"/>
  //     // history.push('/home')
  //   }
  // }
  
  // useEffect(() => {
  //   getLocal()
  // }, [])

  
  return (
    <div>
    </div>
  )
}

export default Home
