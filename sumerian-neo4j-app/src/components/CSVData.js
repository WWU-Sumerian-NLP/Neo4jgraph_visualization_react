import React, {useState} from "react"
import axios from "axios";
//From: https://refine.dev/blog/how-to-import-csv/

const OldCSVData = (props) => {
    const [csvFile, setCsvFile] = useState();
    const formData = new FormData();

    if(csvFile) {
        formData.append('path_to_csv', csvFile);
    }

    const handleChange = (e) => {
        if(e.currentTarget.files){
            setCsvFile(e.currentTarget.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        async function fetchData() {
            console.log("fetching")
            const res = await axios.post(
                'ws://localhost:8080/ws',
                formData,
            );
            console.log(res.data);
        }
        fetchData();
    };
 
    return(
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv" onChange={handleChange}/>
            <button type="submit" className="bg-blue-500 px-4, py-2 rounded-md font-semibold">fetch</button>
        </form>
    );
}

export {CSVData}