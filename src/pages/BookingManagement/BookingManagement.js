import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';



function BookingManagement() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const data = await getDocs(collection(db, "reservas"));
        setBookings(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Gestão de Reservas</h1>
      {bookings.map(booking => (
        <div key={booking.id}>
          <p>Cliente: {booking.clienteId}</p>
          <p>Alojamento: {booking.alojamentoId}</p>
          <p>Inicio: {booking.inicio}</p>
          <p>Fim: {booking.fim}</p>
          <p>Status: {booking.status}</p>
        </div>
      ))}
    </div>
  );
}

export default BookingManagement;
