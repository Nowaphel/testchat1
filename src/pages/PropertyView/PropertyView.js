import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function PropertyView() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(collection(db, "Alojamentos")); // Atualizado para "Alojamentos"
        if (data.docs.length > 0) {
          setProperties(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        } else {
          console.log("Nenhuma propriedade encontrada na coleção.");
        }
      } catch (err) {
        console.error("Erro ao buscar dados: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Visualização de Propriedades</h1>
      <div>
        {properties.length > 0 ? properties.map(property => (
          <div key={property.id}>
            <img src={property.imagemUrl} alt={property.nome} style={{ width: '100px', height: '100px' }} />
            <h3>{property.nome}</h3>
            <p>{property.localizacao}</p>
            <p>Preço: {property.preco}</p>
            <Link to={`/app/properties/${property.id}`}>Ver Detalhes</Link>
          </div>
        )) : <p>Nenhuma propriedade encontrada.</p>}
      </div>
    </div>
  );
}

export default PropertyView;
