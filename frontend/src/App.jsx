import { useState, useEffect } from 'react'

async function fetchData() {
  const resp = await fetch('api');
  return await resp.json();
}

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState();

  useEffect(() => {
    fetchData().then((d) => setData(d.data));
  }, []);

  useEffect(() => {
    console.log('data change', data);
  }, [data]);

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
        from api: {data}
      </div>
    </>
  )
}

export default App
