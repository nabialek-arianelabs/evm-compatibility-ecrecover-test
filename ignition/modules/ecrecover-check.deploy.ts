import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const EcrecoverCheckModule = buildModule('EcrecoverCheckModule', (m) => {
  const ecrecoverCheck = m.contract('EcrecoverCheck', []);

  return { ecrecoverCheck };
});

export default EcrecoverCheckModule;
