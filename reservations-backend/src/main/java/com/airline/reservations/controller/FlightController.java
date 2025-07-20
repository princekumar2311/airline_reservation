package com.airline.reservations.controller;

import com.airline.reservations.model.Booking;
import com.airline.reservations.model.Flight;
import com.airline.reservations.repository.BookingRepository;
import com.airline.reservations.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class FlightController {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/flights")
    public List<Flight> searchFlights(@RequestParam String from, @RequestParam String to) {
        return flightRepository.findBySourceAndDestination(from, to);
    }

    @PostMapping("/book")
    public Booking bookFlight(@RequestParam Long flightId, @RequestParam String passengerName) {
        Flight flight = flightRepository.findById(flightId).orElseThrow();
        Booking booking = new Booking();
        booking.setFlight(flight);
        booking.setPassengerName(passengerName);

        // Decrease available seats
        flight.setAvailableSeats(flight.getAvailableSeats() - 1);
        flightRepository.save(flight);

        return bookingRepository.save(booking);
    }
}