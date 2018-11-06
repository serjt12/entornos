import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const logger = createLogger();
const middleware = [ ReduxThunk, logger ];

const initialState = {

  devices: [

    { _id: 1, name: 'electrovalvula', description: 'control electronico del agua', wifi: 'si tengo' },
    { _id: 2, name: 'sensor humedad', description: 'sensado de la humedad en el suelo', wifi: 'si tengo' },
    { _id: 3, name: 'sensor humedad y temperatura', description: 'sensado de temperatura y humedad en el aire', wifi: 'si tengo' },
  ],
  entornos: [
  
    { _id: 1, name: 'Flores', description: 'Flores para escencias' },
    { _id: 2, name: 'Vegetales', description: 'Para el consumo de la casa' },
    { _id: 3, name: 'Hierbas', description: 'para remedios medicinales caseros' },
  ]
}

export default createStore(rootReducer, initialState, applyMiddleware(...middleware));
