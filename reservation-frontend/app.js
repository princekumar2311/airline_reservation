function searchFlights() {
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;

  fetch(`http://localhost:9090/api/flights?from=${from}&to=${to}`)
    .then(res => res.json())
    .then(data => {
      let table = '<table><tr><th>ID</th><th>Airline</th><th>Departure</th><th>Arrival</th><th>Seats</th><th>Fare</th></tr>';
      data.forEach(flight => {
        table += `<tr>
          <td>${flight.id}</td>
          <td>${flight.airline}</td>
          <td>${flight.departureTime}</td>
          <td>${flight.arrivalTime}</td>
          <td>${flight.availableSeats}</td>
          <td>₹${flight.fare}</td>
        </tr>`;
      });
      table += '</table>';
      document.getElementById('flight-results').innerHTML = table;
    })
    .catch(err => {
      document.getElementById('flight-results').innerHTML = 'Error fetching flights.';
      console.error(err);
    });
}

function bookFlight() {
  const flightId = document.getElementById('flightId').value;
  const passengerName = document.getElementById('passengerName').value;

  fetch(`http://localhost:9090/api/book?flightId=${flightId}&passengerName=${passengerName}`, {
    method: 'POST'
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('booking-status').innerText = `Booking confirmed for ${data.passengerName} (Flight ID: ${data.flight.id})`;
  })
  .catch(err => {
    document.getElementById('booking-status').innerText = 'Booking failed.';
    console.error(err);
  });
}

function adminLogin() {
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;

  fetch(`http://localhost:9090/admin/login?username=${username}&password=${password}`, {
    method: 'POST'
  })
  .then(res => res.json())
  .then(success => {
    if (success) {
      document.getElementById('admin-login-status').innerText = 'Login successful.';
      document.getElementById('add-flight-section').style.display = 'block';
    } else {
      document.getElementById('admin-login-status').innerText = 'Invalid credentials.';
    }
  })
  .catch(err => {
    document.getElementById('admin-login-status').innerText = 'Login error.';
    console.error(err);
  });
}

function addFlight() {
  const flight = {
    airline: document.getElementById('airline').value,
    from: document.getElementById('fromInput').value,
    to: document.getElementById('toInput').value,
    departureTime: document.getElementById('departureTime').value,
    arrivalTime: document.getElementById('arrivalTime').value,
    availableSeats: parseInt(document.getElementById('availableSeats').value),
    fare: parseFloat(document.getElementById('fare').value)
  };

  fetch('http://localhost:9090/admin/add-flight', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(flight)
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('flight-add-status').innerText = `Flight added: ${data.airline} (${data.from} → ${data.to})`;
  })
  .catch(err => {
    document.getElementById('flight-add-status').innerText = 'Failed to add flight.';
    console.error(err);
  });
}
