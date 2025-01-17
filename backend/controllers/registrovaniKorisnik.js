// const router = require("express").Router();
// const bcrypt = require("bcrypt");
//const User = require("../models/RegistrovaniKorisnik.js");

import express from "express";
const router = express.Router();
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js";

//update your acc
export const azurirajNalogRegKor = async (req, res, next) => {

    if (req.body.registrovaniKorisnikId == req.params.id) {
        const regKor = await RegistrovaniKorisnik.findById(req.params.id);
        if (req.body.password == regKor.password) 
        {
            try 
            {
                const user = await RegistrovaniKorisnik.findByIdAndUpdate(req.params.id, {
                                                                        $set: { ime: req.body. ime,
                                                                                prezime: req.body.prezime }});
                                                                                
                return next();
            }
            catch (err) 
            {
                return res.status(500).json(err);
            }
        }
        else{
            return res.status(400).json("Netačna lozinka!")
        }
    }
    else {
      return res.status(403).json("Možete da izmenite samo svoj nalog");
    }
  };

  export default router;