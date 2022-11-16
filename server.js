
// -----------------------------------------------
// Import Dependencies
// -----------------------------------------------

require("dotenv").config() 
const express = require('express'); 
const pokemons = require("./models/pokemon")
const morgan = require("morgan")
const methodOverride = require("method-override")


// -----------------------------------------------
// Express app object
// -----------------------------------------------

const app = express();


// -----------------------------------------------
// Middleware
// -----------------------------------------------

app.use(express.urlencoded({extended: true}))
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static", express.static("public"))
app.use('/public', express.static('public'));

// -----------------------------------------------
// Index Route
// -----------------------------------------------

// Make /pokemon the index page
app.get("/", (req, res) => res.redirect("/pokemon"))

// Return all budget data

app.get('/pokemon/', (req, res) => {
    res.render(
        'index.ejs',
        {
            allPokemon:pokemon
        }
    );
});

// -----------------------------------------------
// Show Route
// -----------------------------------------------

app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', {
        pokemon: pokemons[req.params.id],
        i: req.params.id
    });
});


// -----------------------------------------------
// New Route
// -----------------------------------------------

app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs")
})


// -----------------------------------------------
// Edit Route
// -----------------------------------------------

app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs", {
        pokemon: pokemons[req.params.id],
        index: req.params.id
    })
})


// -----------------------------------------------
// Create Route
// -----------------------------------------------

app.post("/pokemon", (req, res) => {
    pokemon.push(req.body)
    res.redirect("/pokemon")
})


// -----------------------------------------------
// Update Route
// -----------------------------------------------

app.put("/pokemon/:id", (req, res) => {
    pokemon[req.params.id] = req.body
    res.redirect("/pokemon")
  })


// -----------------------------------------------
// Destroy Route
// -----------------------------------------------

app.delete("/pokemon/:id", (req, res) => {
    // splice the item out of the array
    pokemon.splice(req.params.id, 1)
    // redirect user back to index
    res.redirect("/pokemon")
})


// -----------------------------------------------
// Server Listener
// -----------------------------------------------

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
