import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Typography, List, ListItem, CircularProgress } from '@material-ui/core';

function PropertyDetail() {
  const [property, setProperty] = useState({});
  const [stayStats, setStayStats] = useState({});
  const [loading, setLoading] = useState(true);
  const { propertyId } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      const docRef = doc(db, "Alojamentos", propertyId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const propertyData = docSnap.data();
        setProperty({ id: docSnap.id, ...propertyData });
        fetchStayStatistics(propertyData.nome);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchProperty();
  }, [propertyId]);

  const fetchStayStatistics = async (propertyName) => {
    const staysQuery = query(collection(db, "Reservas"), where("alojamentoId", "==", propertyName));
    const querySnapshot = await getDocs(staysQuery);
    const stats = {};

    querySnapshot.forEach((doc) => {
      const reserva = doc.data();
      const startDate = reserva.inicio ? new Date(reserva.inicio.split(' at ')[0]) : null;
      const year = startDate ? startDate.getFullYear() : null;
      if (year) {
        stats[year] = (stats[year] || 0) + 1;
      }
    });

    setStayStats(stats);
  };

  const hasStays = Object.keys(stayStats).length > 0;

  return (
    <div>
      {loading ? <CircularProgress /> : (
        <div>
          <Typography variant="h4">Detalhes da Propriedade</Typography>
          <div>
            <img src={property.imagemUrl} alt={property.nome} style={{ width: '200px', height: '200px' }} />
            <Typography variant="h5">{property.nome}</Typography>
            <p>{property.descricao}</p>
            <p>Localização: {property.localizacao}</p>
            <p>Preço: {property.preco}</p>
            <Typography variant="h6">Estatísticas de Estadias por Ano</Typography>
            {hasStays ? (
              <List>
                {Object.entries(stayStats).map(([year, count]) => (
                  <ListItem key={year}>{year}: {count} estadias</ListItem>
                ))}
              </List>
            ) : (
              <Typography>Nenhuma estadia encontrada para esta propriedade.</Typography>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetail;
