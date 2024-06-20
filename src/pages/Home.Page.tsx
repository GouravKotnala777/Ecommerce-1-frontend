import { useEffect } from "react";

const Home = () => {


    const aaGET = async() => {
        console.log({SERVER_URL:import.meta.env.VITE_SERVER_URL});
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/aa`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        });

        const data = await res.json();

        console.log("----- Home.Page  aaGET");
        console.log(data);
        console.log("----- Home.Page  aaGET");
        
    };
    const aaPOST = async() => {
        console.log(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/aa`);
        
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/aa`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        });

        const data = await res.json();

        console.log("----- Home.Page  aaGET");
        console.log(data);
        console.log("----- Home.Page  aaGET");
        
    };


    useEffect(() => {
        aaGET();
    }, []);

    return(
        <>
            <h1>Home</h1>
            <button onClick={aaPOST}>Fetch</button>
        </>
    )
};

export default Home;