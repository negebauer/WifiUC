import 'react-native';
import React from 'react';
import Index from '../index.ios.js';

import {USER, PASS} from 'react-native-dotenv'

// Use USER and PASS for tests

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Index/>);
});
