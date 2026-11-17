// --- ROUTES POUR LES SÉANCES ---

// 1. GET /seances : Lister toutes les séances (avec option de filtrage par date : /seances?date=2026-06-15)
app.get("/seances", (req, res) => {
  let result = [...seances];
  const { date } = req.query;

  if (date) {
    result = result.filter(s => s.date === date);
  }

  res.json(result);
});


app.get("/seances/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const seance = seances.find(s => s.id === id);

  if (!seance) {
    return res.status(404).json({ message: "Séance non trouvée" });
  }
  res.json(seance);
});


app.delete("/seances/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const seanceIndex = seances.findIndex(s => s.id === id);

  if (seanceIndex === -1) {
    return res.status(404).json({ message: "Séance non trouvée" });
  }

  seances.splice(seanceIndex, 1);
  res.status(200).json({ message: "Séance supprimée avec succès" });
});