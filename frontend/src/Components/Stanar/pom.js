

import React from "react";
import useAuth from "../../hooks/useAuth";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

import slika from '../../Assets/IzmeniStanara4.jpg';
export default function IzmeniStanara() {
  const { user, dispatch } = useAuth();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [korisnik, setKorisnik] = useState({
    ime: user.ime,
    prezime: user.prezime,
    username: user.username,
    brStana: user.brStana,
    brojUkucana: user.brojUkucana,
    registrovaniKorisnikId: user.registrovaniKorisnikId,
    password:user.password,
    stanarId: user.stanarId,
    zgrada: user.zgrada,
    refreshToken: user.refreshToken
  });

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKorisnik({ ...korisnik, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(korisnik));
    setIsSubmit(true);

};

useEffect(() => {
  console.log("iz useEffect: ");
  console.log(formErrors);
  if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(korisnik);
      IzmeniStanara();
      console.log("uspešno")
  }
  else {
      console.log("nije uspešno")
  }
}, [formErrors]);
 // useEffect(() => {
 //   console.log(korisnik);
 // }, [korisnik]);

 const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regex2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gmi;
  if (!values.ime) {
      errors.ime = "Obavezno polje!";
  }
  if (!values.prezime) {
      errors.prezime = "Obavezno polje!";
  }
  
  if (!values.brojUkucana) {
      errors.username = "Obavezno polje!";
  }
  
  return errors;
};

  const IzmeniStanara = async (e) => {
    try {
      console.log("usao ", user.registrovaniKorisnikId);
      const response = await axiosPrivate.put(`http://localhost:8080/api/stanar/azurirajNalogStanar/`+user.registrovaniKorisnikId,korisnik);
      dispatch({ tip: "UPDATE_USER", payload: { ...user, ...korisnik } })
      
      //navigate('/Stanar');
    } catch (err) {
      
     // setKorisnik({});
    }
  };

  return (
    <div
      className="Dodaj"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: `url(${slika})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: "fixed",
        backgroundPosition: "center"
      }}
    >
      <form className="" onSubmit={handleSubmit} >
                <h2>Izmeni svoje podatke:</h2>

                <div className="forma" >
                <div className="field">
                        <label className='tekst'>Ime</label>
                        <br>
                        </br>
                        <input className='input'
                            type="text"
                            name="ime"
                            
                            value={korisnik.ime}
                            onChange={handleChange}
                        />
                    </div>
                    < p className="upozorenja">{formErrors.ime}</p>
                    <div className="field">
                        <label className='tekst'>Prezime</label>
                        <br>
                        </br>
                        <input className='input'
                            type="text"
                            name="prezime"
                            
                            value={korisnik.prezime}
                            onChange={handleChange}
                        />
                    </div>
                    < p className="upozorenja">{formErrors.prezime}</p>
                    <div className="field">
                        <label className='tekst'>E-mail</label>
                        <br>
                        </br>
                        <input className='input'
                            type="text"
                            name="username"
                            disabled={true}
                            placeholder="korisničko ime"
                            value={korisnik.username}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="field">
                        <label className='tekst'>Zgrada</label>
                        <br>
                        </br>
                        <input className='input'
                            type="text"
                            name="zgrada"
                            disabled={true}
                            placeholder="adresa"
                            value={korisnik.zgrada}
                            onChange={handleChange}
                        />
                    </div>
                   
                   

                    <div className="field">
                        <label className='tekst'>Broj stana</label>
                        <br></br>
                        <input className='input'
                            type="number"
                            name="brStana"
                            placeholder="broj stana"
                            value={korisnik.brStana}
                            disabled={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <label className='tekst'>Broj ukućana</label>
                        <br></br>
                        <input className='input'
                            type="number"
                            name="brojUkucana"
                            placeholder="broj ukućana"
                            value={korisnik.brojUkucana}
                            
                            onChange={handleChange}
                        />
                    </div>
                    < p className="upozorenja">{formErrors.brojUkucana}</p>

                    <button className="zeleno-dugme" variant="success">Izmeni</button>
                    <button className="zeleno-dugme" variant="success"  onClick={() =>navigate("/Stanar")}>Nazad</button>


                    {Object.keys(formErrors).length === 0 && isSubmit ? (
                        <p className="upozorenja">Izmena podataka je uspešno obavljena!</p>
                    ) : ""}


                </div>
            </form>
    </div>
  );
}
