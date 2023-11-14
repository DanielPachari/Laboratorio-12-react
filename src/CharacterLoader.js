import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function CharacterLoader() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm === '') {
      // Si el término de búsqueda está vacío, cargar todos los personajes
      loadCharacters();
    } else {
      // Si hay un término de búsqueda, realizar una búsqueda filtrada
      searchCharacters();
    }
  }, [searchTerm]);

  const loadCharacters = () => {
    setLoading(true);

    // Simulamos una petición Ajax para obtener todos los personajes de Star Wars
    axios
      .get('https://swapi.dev/api/people/')
      .then((response) => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const searchCharacters = () => {
    setLoading(true);

    // Realizar una petición Ajax para buscar personajes que coincidan con el término de búsqueda
    axios
      .get(`https://swapi.dev/api/people/?search=${searchTerm}`)
      .then((response) => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Personajes de Star Wars</h1>
      <Form className="mb-4">
        <Form.Group controlId="formSearch">
          <Form.Label>Buscar Personajes:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del personaje"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={loadCharacters} disabled={loading} className="mb-4">
        {loading ? 'Cargando Personajes...' : 'Cargar Todos los Personajes'}
      </Button>
      <Row>
        {characters.map((character, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>
                  <strong>Género:</strong> {character.gender}<br />
                  <strong>Año de nacimiento:</strong> {character.birth_year}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CharacterLoader;



