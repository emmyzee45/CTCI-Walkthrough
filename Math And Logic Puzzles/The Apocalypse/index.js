function runOneFamily() {
  let boys = 0;
  let girls = 0;

  // Until we have one girl...
  while (girls === 0) {
    if (Math.random() < 0.5) {
      girls += 1;
    } else {
      boys += 1;
    }
  }

  return { girls, boys };
}

function runNFamilies(n) {
  let boys = 0;
  let girls = 0;

  for (let i = 0; i < n; i++) {
    const family = runOneFamily();
    girls += family.girls;
    boys += family.boys;
  }

  return girls / (boys + girls);
}

console.log(runNFamilies(10000000));
