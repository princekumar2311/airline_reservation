// AdminController.java
package com.airline.reservations.controller;

import com.airline.reservations.model.Admin;
import com.airline.reservations.model.Flight;
import com.airline.reservations.repository.AdminRepository;
import com.airline.reservations.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private FlightRepository flightRepository;

    @PostMapping("/login")
    public boolean login(@RequestParam String username, @RequestParam String password) {
        Admin admin = adminRepository.findByUsernameAndPassword(username, password);
        return admin != null;
    }

    @PostMapping("/add-flight")
    public Flight addFlight(@RequestBody Flight flight) {
        return flightRepository.save(flight);
    }
}