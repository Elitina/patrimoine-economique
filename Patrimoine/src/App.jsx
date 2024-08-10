import { useState, useEffect } from 'react';
import './App.css';
import { Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Possession from './models/possessions/Possession';
import Flux from './models/possessions/Flux';

function Tableau() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalValeur, setTotalValeur] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/data/data.json');
        if (!response.ok) throw new Error('Erreur de réseau');
        const result = await response.json();
        const possessions = result[1].data.possessions.map(item => ({
          ...item,
          dateDebut: new Date(item.dateDebut),
          dateFin: item.dateFin ? new Date(item.dateFin) : null,
        }));
        setData(possessions);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateTotalValue = () => {
      const total = data.reduce((acc, possession) => {
        const isFlux = possession.jour !== undefined;
        const Component = isFlux ? Flux : Possession;
        const instance = new Component(
          possession.possesseur,
          possession.libelle,
          possession.valeur,
          possession.dateDebut,
          possession.dateFin,
          possession.tauxAmortissement,
          possession.jour
        );
        return acc + (instance.getValeur ? parseFloat(instance.getValeur(selectedDate)) : 0);
      }, 0);
      setTotalValeur(total);
    };

    calculateTotalValue();
  }, [data, selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Sélectionnez une date :</Form.Label>
          <Form.Control
            type="date"
            value={selectedDate.toISOString().slice(0, 10)}
            onChange={handleDateChange}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Valeur initiale</th>
            <th>Date acquisition</th>
            <th>Date de fin</th>
            <th>Taux d'amortissement</th>
            <th>Valeur actuelle</th>
          </tr>
        </thead>
        <tbody>
          {data.map((possession, index) => {
            const isFlux = possession.jour !== undefined;
            const Component = isFlux ? Flux : Possession;
            const instance = new Component(
              possession.possesseur,
              possession.libelle,
              possession.valeur,
              possession.dateDebut,
              possession.dateFin,
              possession.tauxAmortissement,
              possession.jour
            );

            return (
              <tr key={index}>
                <td>{possession.libelle}</td>
                <td>{possession.valeur}</td>
                <td>{possession.dateDebut.toLocaleDateString()}</td>
                <td>{possession.dateFin ? possession.dateFin.toLocaleDateString() : 'Undefined'}</td>
                <td>{possession.tauxAmortissement}</td>
                <td>{instance.getValeur(selectedDate)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p>Valeur totale au {selectedDate.toLocaleDateString()} : {totalValeur.toFixed(3)}</p>
    </div>
  );
}

export default Tableau;
