import React, { useEffect, useState } from 'react';
import './App.css';
import EntityBase from './components/EntityBase';
import locationDef from './components/locationDef';
import roleDef from './components/roleDef';
import userDef from './components/userDef';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {

  return (
    <div className='App'>
      <h1>Into The Unknown: Online Interface</h1>

      <Tabs>
        <TabList>
          <Tab>Players</Tab>
          <Tab>Admin</Tab>
        </TabList>

        <TabPanel>
          <h2>Coming Soon!</h2>
        </TabPanel>
        <TabPanel>
          <div>
              <Tabs>
                <TabList>
                  <Tab>Users</Tab>
                  <Tab>Locations</Tab>
                  <Tab>Roles</Tab>
                </TabList>

                <TabPanel>
                    <h3>Registered Players</h3>
                    <EntityBase entityDef={userDef} />
                </TabPanel>
                <TabPanel>
                    <h3>Locations</h3>
                    <EntityBase entityDef={locationDef} includeOps={true} />
                </TabPanel>
                <TabPanel>
                    <h3>Player Role Types</h3>
                    <EntityBase entityDef={roleDef} />
                </TabPanel>
              </Tabs>
          </div>
        </TabPanel>
      </Tabs>

      <footer>
        <div className='footer'>
          Built by Daniel Eastland and Benjamin Bradley, with assistance from Shedrack Akintayo
        </div>
      </footer>
    </div>
  );
}

export default App;
