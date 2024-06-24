import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";

const Chart2 = () => {
    const [data, setData] = useState('');

    const callAPI = async() => {
        const res=await axios.get('/avg/scode');
        console.log(res.data);
        let array=[];
        array.push(['학생명','점수']);
        res.data.forEach(row=>
            array.push([`${row.sname}(${row.scode}/${row.dept})`, parseFloat(row.avg)])
        )
        setData(array);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    // const data = [
    //     ["Year", "Sales", "Expenses", "Profit"],
    //     ["2014", 1000, 400, 200],
    //     ["2015", 1170, 460, 250],
    //     ["2016", 660, 1120, 300],
    //     ["2017", 1030, 540, 350],
    //   ];
    
    const options = {
        chart: {
          title: "학생별 평균성적",
        },
      };

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  )
}

export default Chart2