import films from "../data.js";



app.get("/films", (req, res) => {
  let result = [...films]; 
  const { genre, tri } = req.query;

 
  if (genre) {
    result = result.filter(film => film.genre.toLowerCase() === genre.toLowerCase());
  }


  if (tri === "duree") {
    result.sort((a, b) => a.duree - b.duree);
  }

  res.json(result);
});

app.get("/films/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const film = films.find(f => f.id === id);
  
  if (!film) {
    return res.status(404).json({ message: "Film non trouvé" });
  }
  res.json(film);
});


app.get("/films/:id/seances", (req, res) => {
  const id = parseInt(req.params.id);
  const film = films.find(f => f.id === id);
  
  if (!film) {
    return res.status(404).json({ message: "Film non trouvé" });
  }
  
  const filmSeances = seances.filter(s => s.filmId === film.id);
  res.json(filmSeances);
});


app.post("/films", (req, res) => {
  const { titre, duree, genre } = req.body;

  
  if (!titre || !genre || typeof duree !== "number" || duree <= 0) {
    return res.status(400).json({ 
      message: "Champs obligatoires manquants ou durée invalide (doit être un nombre > 0)." 
    });
  }

  
  const filmExiste = films.find(f => f.titre.toLowerCase() === titre.toLowerCase());
  if (filmExiste) {
    return res.status(409).json({ message: "Un film avec ce titre existe déjà." });
  }

  
  const newId = films.length > 0 ? films[films.length - 1].id + 1 : 1;
  const newFilm = { id: newId, titre, duree, genre };
  
  films.push(newFilm);
  res.status(201).json(newFilm);
});


app.delete("/films/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filmIndex = films.findIndex(f => f.id === id);
  
  if (filmIndex === -1) {
    return res.status(404).json({ message: "Film non trouvé" });
  }
  
  films.splice(filmIndex, 1);
  res.status(200).json({ message: "Film supprimé avec succès" });
});