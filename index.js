const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

// Parts store
const parts = [
    {id: 100, name: 'Belt', colour: 'brown'},
    {id: 101, name: 'Clip', colour: 'brown'},
    {id: 102, name: 'Belt', colour: 'red'},
    {id: 103, name: 'Hat', colour: 'purple'}
];

// Setup serving front-end code
app.use('/', express.static('static'));

//Setup middleware to do logging (generic log method)
app.use((req, res, next) => { //for all routes
    console.log(`${req.method} request for ${req.url}`);
    next(); //keep going
});


// Get list of parts
router.get('/', (req, res) => {
    res.send(parts);
});

//Get details for a given part
router.get('/:parts_id', (req, res) => {
    const id = req.params.parts_id;
    const part = parts.find(p => p.id === parseInt(id));
    if(part){
        res.send(part);
    }
    else{
        res.status(404).send(`Part ${id} was not found!`);
    }   
});

// Instal the router at /api/parts
app.use('/api/parts', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
