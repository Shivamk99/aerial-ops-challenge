import React from 'react';
import axios from 'axios';
import { Container, LoadingOverlay } from '@mantine/core';

import { MantineTable } from './Components';
import './App.css';

function App() {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='john%25'`
      );
      setResults(data.search_player_all.queryResults.row);
      setLoading(false);
    })();
  }, []);

  const dataRows = React.useMemo(() => {
    return results.map(({ name_first, name_last, birth_country, position, team_full }) => {
      return {
        firstName: name_first,
        lastName: name_last,
        birthCountry: birth_country,
        position: position,
        team: team_full
      };
    });
  }, [results]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName' // accessor is the "key" in the data
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Country',
        accessor: 'birthCountry'
      },
      {
        Header: 'Position',
        accessor: 'position'
      },
      {
        Header: 'Team',
        accessor: 'team'
      }
    ],
    []
  );

  return (
    <Container>
      <LoadingOverlay visible={loading} />
      <MantineTable columns={columns} data={dataRows} />
    </Container>
  );
}

export default App;
