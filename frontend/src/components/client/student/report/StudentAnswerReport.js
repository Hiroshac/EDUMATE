import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import AdminNav from '../../../common/Navigation/AdminNav'
import Navigation from '../../../common/Navigation/Navigation'

export const StudentAnswersReports = () => {
  
  const [paper, setPaper] = useState([])
  const [count, setCount] = useState([])
   ChartJS.register(
     CategoryScale,
     LinearScale,
     BarElement,
     ArcElement,
     Title,
     Tooltip,
     Legend
   )
    

  const loadData = () => {
    axios.get('/studentanswers/subject').then((res) => {
      setPaper(res.data)
      console.log(res.data)
    })
  }
  useEffect(() => {
    loadData()
  }, [])

  const output = Object.entries(
    paper.reduce((prev, { subject }) => {
      prev[subject] = prev[subject] ? prev[subject] + 1 : 1
      return prev
    }, {})
  )
    .map(([subject, count]) => ({ subject, count }))
    .sort((a, b) => b.count - a.count)
 
  console.log(output)
 
       const options = {
         responsive: true,
         plugins: {
           legend: {
             display: false,
             position: 'top',
           },
           title: {
             display: true,
             text: 'Uploaded Answer Count',
           },
         },
       }
       const labels = output.map((sub) => sub.subject)

       const data = {
         labels,
         datasets: [
           {
             label:output.map((sub)=>(sub.subject)),
             data:output.map((sub)=>(sub.count)),
             backgroundColor:
             output.map((sub)=>( 'rgba(255, 99, 132, 0.2)'))  
              ,
               
             
             borderColor: [
               'rgb(255, 99, 132)',
               'rgb(255, 159, 64)',
               'rgb(255, 205, 86)',
               'rgb(75, 192, 192)',
               'rgb(54, 162, 235)',
               'rgb(153, 102, 255)',
               'rgb(201, 203, 207)',
             ],
             borderWidth: 1,
           },
         ],
       }


  
  return (
    <div>
        {/* <AdminNav/> */}
        <Navigation/>
      <br />
      <br />
      <br />
      <br />
      <br/><br/>
      <div className='container text-center' >
        <div className='col-xl-8'>
          <div className='card shadow'>
            <div className='card-header bg-light font-weight-bold text-gray-800 text-center'>
              Answer Summary
            </div>

            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
      <br/>
    </div>
  )
}
