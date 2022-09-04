import '../../../node_modules/react-vis/dist/style.css';
import './Line.css';
import React, { useEffect, useState } from 'react';

import { 
    XYPlot, 
    LineMarkSeries,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines
} from 'react-vis';


function Line() {
    
    //const [data, setData] = useState([]);

    // useEffect(() => {

    //     socket.on('getData', function(newData) {
    //         setData(currentData => {
    //             if (currentData.length > 10){
    //                 currentData.shift()
    //             }
    //             currentData.push(newData)
    //             return [...currentData]
    //         })
    //     })

    // }, [])
    

    return (
        <div>
           
            <XYPlot height={500} width={700}>
                {/* <VerticalGridLines  />
                <HorizontalGridLines />  */}
                <XAxis animation title="X Axis" style={{
                    line: {stroke: '#16A34A'},
                    ticks: {stroke: '#ADDDE1'},
                    text: {stroke: '1', fill: '#16A34A', fontWeight: 500}
                }}/>

                <YAxis title="Y Axis" style={{
                    line: {stroke: '#16A34A'},
                    ticks: {stroke: '#ADDDE1'},
                    text: {stroke: '1', fill: '#16A34A', fontWeight: 500}
                }}/>
              
                <LineMarkSeries 
                    data={[{x: 1, y: 10}, {x: 2, y: 4}, {x: 3, y: 2}, {x: 4, y: 15}]} 
                    color="#16A34A"
                    animation
                    curve={'curveMonotoneX'}
                />
                    
            </XYPlot>
        </div>
    )

}


export default Line;