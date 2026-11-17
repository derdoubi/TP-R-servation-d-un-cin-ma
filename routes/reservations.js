import { seances, reservations, prochainId, placesRestantes } from "./data.js";


app.post("/seances/:id/reservations", (req, res) => {
  const seanceId = parseInt(req.params.id);
  const seance = seances.find(s => s.id === seanceId);

  
  if (!seance) {
    return res.status(404).json({ message: "Séance non trouvée" });
  }

  const { nom, nbPlaces } = req.body;

  
  if (!nom || typeof nbPlaces !== "number" || !Number.isInteger(nbPlaces) || nbPlaces < 1 || nbPlaces > 10) {
    return res.status(400).json({ 
      message: "Requête invalide : le nom est obligatoire et nbPlaces doit être un entier entre 1 et 10." 
    });
  }

  
  const restants = placesRestantes(seance);
  if (nbPlaces > restants) {
    return res.status(409).json({ 
      message: `Pas assez de places restantes. Places disponibles : ${restants}` 
    });
  }

  
  const nouvelleReservation = {
    id: prochainId(reservations),
    seanceId: seance.id,
    nom,
    places: nbPlaces
  };

  reservations.push(nouvelleReservation);
  
  
  res.status(201).json(nouvelleReservation);
});

s
app.get("/seances/:id/reservations", (req, res) => {
  const seanceId = parseInt(req.params.id);
  const seance = seances.find(s => s.id === seanceId);


  if (!seance) {
    return res.status(404).json({ message: "Séance non trouvée" });
  }

 
  const reservationsSeance = reservations.filter(r => r.seanceId === seance.id);
  
  res.json(reservationsSeance);
});


app.delete("/reservations/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = reservations.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Réservation non trouvée" });
  }


  reservations.splice(index, 1);


  res.status(204).send();
});