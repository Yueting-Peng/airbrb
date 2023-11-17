import React, { useEffect, useState } from 'react';
import { Chart, LineAdvance } from 'bizcharts';

const ProfitGraph = () => {
  const [data, setData] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // Fetch or calculate your data here
    // This is dummy data
    const fetchedData = Array.from({ length: 30 }, (_, i) => ({
      day: i,
      profit: Math.round(Math.random() * 1000), // Random profit for demonstration
    }));
    setData(fetchedData);
  }, []);

  const scale = {
    day: { alias: 'Days Ago', range: [0, 1] },
    profit: { alias: 'Profit ($)' },
  };

  return (
    <Chart height={400} autoFit data={data} scale={scale}>
      <LineAdvance shape="smooth" point area position="day*profit" />
    </Chart>
  );
};

export default ProfitGraph;
