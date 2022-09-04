// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from "react";
import moment from "moment";
import {
  XAxis,
  AxisTicks,
  YAxis,
  LineSeries,
  FlexibleWidthXYPlot
} from "react-vis";
import Candlestick from "./Candlestick";
import "react-vis/dist/style.css";
import data from "./data.json";

// https://github.com/uber/react-vis/blob/master/docs/scales-and-data.md#time-scale-localization
const AXIS_STYLES = {
    line: {stroke: '#16A34A'},
    ticks: {stroke: '#ADDDE1'},
    text: {stroke: '1', fill: '#16A34A', fontWeight: 500}
};

const DEFAULT_AXIS_PROPS = {
  style: AXIS_STYLES,
  tickSize: 0
};

// const ShowJson = data => (
//   <div style={{ height: 300, background: "#efefef", overflowY: "scroll" }}>
//     <pre>{JSON.stringify(data, null, 2)}</pre>
//   </div>
// );

// https://github.com/uber/react-vis/blob/master/docs/scales-and-data.md#time-scale-localization
class Candle extends React.Component {
  state = {
    data: data.map(item => {
      return {
        ...item,
        x: moment(item.x).valueOf() // need these to be timestamps for some reason
      };
    })
  };

  getMaxAndMin = data => {
    let mins = data.map(item => item.yLow);
    let maxs = data.map(item => item.yHigh);
    let min = Math.min(...mins);
    let max = Math.max(...maxs);
    return {
      max,
      min
    };
  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log({ title: this.props.title, error, info });
  }

  render() {
    const { data } = this.state;
    const { max, min } = this.getMaxAndMin(data);

    if (this.state.hasError) {
      return null;
    }

    return (
      <div>
        <div>
          <FlexibleWidthXYPlot
            xType="linear"
            animation
            yDomain={[min, max]}
            height={500}
            width={700}
          >
            <XAxis {...DEFAULT_AXIS_PROPS} tickFormat={() => null} />
            <YAxis {...DEFAULT_AXIS_PROPS} />
            <LineSeries color="#16A34A" data={data} />
            <Candlestick
              colorType="literal"
              opacityType="literal"
              stroke="#16A34A"
              data={data}
            />
          </FlexibleWidthXYPlot>
        </div>
        {/* <ShowJson data={data} />{" "} */}
      </div>
    );
  }
}

export default Candle;
