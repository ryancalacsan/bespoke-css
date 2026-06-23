import { addons } from 'storybook/manager-api';
import theme from './theme';

// Apply the branded theme to the Storybook UI (sidebar, toolbar, panels).
addons.setConfig({ theme });
