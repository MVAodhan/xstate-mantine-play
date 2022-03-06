import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { indexStyles } from '../styles';

import { Grid, Button, Box } from '@mantine/core';

const promiseMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7AtgS1mAdMmAHYTbFQDEASgKIDKA8gDIBqtiK6s2ALtumKcQAD0QBGAEwBmfABYAbAHYAnCoAcAVgAMi6euUAaEAE9ECzfiXiF27dLnjVC9Us0Bfd8bRZcBIqTkVHQAUrQAwgAqwsjcfAJCSKISMvLKalq6CvpGpikqVuKaGpKSdi6aCp5eIMToEHAxGDh4hCRkFDFx-ILCYghyksZmCOpy+NLi2goKiipycmpKnt7NfviocOgANgBukF08PYmg-ZK2E+JO0tqS6jIW6sOI6toTmq-l0kraWipVNR8LQImwAVmAAMa8A5JWJHBJ9RDnN6Ta63e7SR7PBDiBbvVSqRwadErEBAvyHeK9JL9cRPPIIAC0SnwdzkdkxcmkKh0RWW1SAA */
  createMachine({
    id: 'promise',
    initial: 'pending',
    states: {
      pending: {
        on: {
          RESOLVE: {
            target: '#promise.resolved',
          },
          REJECT: {
            target: '#promise.rejected',
          },
        },
      },
      resolved: {
        type: 'final',
      },
      rejected: {
        type: 'final',
      },
    },
  });

export default function Home() {
  const [state, send] = useMachine(promiseMachine);
  const { classes } = indexStyles();

  console.log(state.value);

  return (
    <Box
      sx={{
        backgroundColor: 'orange',
        width: '100vw',
        height: '100vh',
      }}
    >
      {/** You can listen to what state the service is in */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'white',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'red',
            width: '60%',
          }}
        >
          {state.matches('pending') && <p>Loading...</p>}
          {state.matches('rejected') && <p>Promise Rejected</p>}
          {state.matches('resolved') && <p>Promise Resolved</p>}
        </Box>
      </Box>
      <Box>
        {/** You can send events to the running service */}
        <Grid justify="center">
          <Grid.Col span={1}>
            <Button onClick={() => send('RESOLVE')}>Resolve</Button>
          </Grid.Col>
          <Grid.Col span={1} className={classes.gridCollumn}>
            <Button onClick={() => send('REJECT')}>Reject</Button>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
}
