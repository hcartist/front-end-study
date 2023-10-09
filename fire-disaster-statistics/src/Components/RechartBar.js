import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
  

export default function RechartBar({ thisAccidents }) {

    const data = thisAccidents.map(thisAccident => {
        return {
          name: thisAccident.시도 + thisAccident.시군구,
          재산피해소계: thisAccident.재산피해소계,
          부상: thisAccident.부상,
          사망: thisAccident.사망
        }
      })
      console.log(data)
    
      return (
        <div className='h-[400px]'>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            layout="vertical"
            height={400}
            data={data}
            margin={{
              top: 50,
              left: 100,
              right: 70
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="재산피해소계" barSize={20} fill="#0088fe" />
            <Bar dataKey="부상" barSize={20} fill="#ffbb28" />
            <Bar dataKey="사망" barSize={20} fill="#ff8042" />
          </ComposedChart>
        </ResponsiveContainer>
        </div>
      );
};
