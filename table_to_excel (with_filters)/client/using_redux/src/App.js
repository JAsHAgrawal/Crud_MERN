import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {useState,useEffect} from 'react';
import axios from 'axios'
// import ex from `'
function App(){
    const workSheetColumnName = [
        "id",
        "email",
    ]
    const [no_of_cols,setno_of_cols] = useState(1)
    const [data,setdata] = useState('');
    const [name,setname] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:8080/get_data')
        .then((res)=>{
            setdata(res.data)
           
        })
        .catch((err)=>{
            console.log(err)
        })
        console.log(data)
    },[])
    
    const handleInputChange=(e)=>{
        setno_of_cols(Number(e.target.value) - 1);
        console.log(no_of_cols)
    }

    const postdata =()=>{
        axios.post('http://localhost:8080/post_data',{data,workSheetColumnName,no_of_cols })
        .then(response => {
            setname(response.data.name)
            console.log(name)
        })
        .catch((err)=>{console.log(err)})
    }

    return(
        <>
        <div>
            <input type="number" id='cols' name='cols' onChange={handleInputChange} />      
        </div>
        <table id="emp" className="table">  
            <thead>  
                <tr>
                <th>Id</th>
                <th>email </th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((datas,index)=>{
                   return <tr>
                            <td>{datas._id}</td>
                            <td>{datas.email}</td>
                        </tr>
                })}
                {/* <tr>
                    <td>id</td>
                    <td>jash</td>
                    <td>7028450686</td>
                </tr> */}
                {/* <tr>
                    <td>1</td>
                    <td>jasha</td>
                    <td>7777777786</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>jashs</td>
                    <td>708888886</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>jashd</td>
                    <td>70284555586</td>
                </tr> */}
            </tbody>
        </table>
        
        <div>  
            <button onClick={postdata} >save</button>
            <a href={`./outputFiles/${name}`} download> download</a>
            {/* <ReactHTMLTableToExcel  
                className="btn btn-info"  
                table="emp"  
                filename="ReportExcel"  
                sheet="Sheet"  
                buttonText="Export excel" />  */}

        </div> 
        </>
    )
}

export default App;