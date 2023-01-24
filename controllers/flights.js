const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    create,
    index,
    show,
    delete: deleteFlight,
    addDestinations
}

function newFlight(req, res) {
    res.render('flights/new', { err: '', title: 'New Flight' })
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    const flight = new Flight(req.body)
    flight.save(function (err) {
        if (err) { return res.redirect('/flights/new') }
        res.redirect(`/flights/${flight._id}`)
    })
}

function index(req, res) {
    Flight.find({}, (err, flights) => {
        res.render('flights/index', { flights: flights, title: 'All Flights' })
    })
}

function show(req, res) {
    Flight.findById(req.params.id)
        .populate('destination').exec( (err, flight) => {
            Destination.find({ _id: { $nin: flight.destinations } },
                (err, destinations) => {
                    res.render('flights/show', { title: 'Flight Details', flight, destinations })
                })
        })
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id, (err, flight) => {
        res.redirect('/flights')
    })
}

function addDestinations(req, res) {
    Flight.findById(req.params.id, (err, flight) => {
        flight.destination.push(req.body.destination)
        flight.save((err) => {
            res.redirect(`/flights/${flight._id}`)
        }) 
    })
}