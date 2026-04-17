import { useState } from "react";
import type { Person } from "../models/Person";

function Signup() {
    const [person, setPerson] = useState<Partial<Person>>({});

    const signup = () => {
        fetch(import.meta.env.VITE_BACK_URL + "/signup", {
            method: "POST",
            body: JSON.stringify(person),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then(json => {
                if (json.message && json.timestamp && json.status) {
                    alert("Juhtus viga: " + json.message);
                    return;
                }
                alert("Registreerusid edukalt ID-ga: " + json.id)
            })
    }

    return (
        <div>
            <label>First name</label> <br />
            <input onChange={(e) => setPerson({ ...person, firstName: e.target.value })} type="text" /> <br />
            <label>Last name</label> <br />
            <input onChange={(e) => setPerson({ ...person, lastName: e.target.value })} type="text" /> <br />
            <label>Email</label> <br />
            <input onChange={(e) => setPerson({ ...person, email: e.target.value })} type="text" /> <br />
            <label>Password</label> <br />
            <input onChange={(e) => setPerson({ ...person, password: e.target.value })} type="password" /> <br />
            <label>Personal code</label> <br />
            <input onChange={(e) => setPerson({ ...person, personalCode: e.target.value })} type="number" /> <br />


            {/*         <br /> <br /> <br />
        <h3>Aadress:</h3>

        <label>Street </label> <br />
        <input onChange={(e) => setPerson({...person, address: {...person.Address, street: e.target.value}})} type="text" /> <br />
        <label>Street number</label> <br />
        <input type="text" /> <br />
        <label>City </label> <br />
        <input type="text" /> <br />
        <label>Country </label> <br />
        <input type="text" /> <br />
        <label>Zip code </label> <br />
        <input type="text" /> <br /> */}
            <button onClick={() => signup()} >Signup</button>
        </div>
    )
}

export default Signup