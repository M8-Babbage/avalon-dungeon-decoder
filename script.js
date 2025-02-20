#!/usr/bin/env node
const readline = require('readline');

console.log(`
 ██████╗██╗  ██╗██╗   ██╗███╗   ██╗██╗   ██╗ 
██╔════╝██║  ██║██║   ██║████╗  ██║╚██╗ ██╔╝ 
██║     ███████║██║   ██║██╔██╗ ██║ ╚████╔╝ 
██║     ██╔══██║██║   ██║██║╚██╗██║  ╚██╔╝   
╚██████╗██║  ██║╚██████╔╝██║ ╚████║   ██║   
 ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝
`);

console.log('Parámetros del cheat engine:\nPrimer piso: AVA_TEMPLE_START_First_Level_01\nSegundo piso: AVA_TEMPLE_START\n\n\nPegue el texto codificado aquí:');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    // Clear console and show banner
    console.clear();
    console.log(`
 ██████╗██╗  ██╗██╗   ██╗███╗   ██╗██╗   ██╗ 
██╔════╝██║  ██║██║   ██║████╗  ██║╚██╗ ██╔╝ 
██║     ███████║██║   ██║██╔██╗ ██║ ╚████╔╝ 
██║     ██╔══██║██║   ██║██║╚██╗██║  ╚██╔╝   
╚██████╗██║  ██║╚██████╔╝██║ ╚████║   ██║   
 ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝
`);
    
    // Process input and show results
    processInput(line);
    console.log('\nHecho con amor, y odio por @chuny-dev');
    console.log('\nPresione enter para salir...');
    rl.question('', () => {
        rl.close();
    });
});

const bosses = {
  construct: {
    name: 'Constructor',
    6: 'Doble dorado',
    7: 'Morado',
    9: 'Azul',
    8: 'Verde',
  },
  knightcaptain: {
    name: 'Caballero',
    8: 'Doble dorado',
    9: 'Morado',
    11: 'Azul',
    10: 'Verde',
  },
  archmage: {
    name: 'Bailarina',
    8: 'Doble dorado',
    9: 'Morado',
    10: 'Verde',
    11: 'Azul',
  },
  priest: {
    name: 'Suicida',
    8: 'Doble dorado',
    9: 'Morado',
    10: 'Verde',
    11: 'Azul',
  },
  basiliskrider: {
    name: 'Basilisco',
    8: 'Doble dorado',
    9: 'Morado',
    10: 'Verde',
    11: 'Azul',
  },
  legendarybossgrail: {
    name: 'Jefe final',
    2: 'Doble dorado',
    4: 'Morado',
    5: 'Azul',
  },
};

// Función para convertir un string hexadecimal a texto
function hexToStr(hex) {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

// Only keep letters and numbers, delete special characters
function cleanText(text) {
  return text.replace(/[^a-zA-Z0-9]/g, '');
}

function processInput(data) {
  const hexData = data.replace(/\s/g, '');
  const stringData = hexToStr(hexData);
  const textoLimpio = cleanText(stringData.toLocaleLowerCase());

  const bossPositions = [];

  Object.keys(bosses).forEach((boss) => {
    const regex = new RegExp(`${boss}.*?layer(\\d{1,2})`, 'gi');
    let match;

    while ((match = regex.exec(textoLimpio)) !== null) {
      bossPositions.push({
        name: bosses[boss].name,
        position: match.index,
        layer: parseInt(match[1], 10),
        color: bosses[boss][parseInt(match[1], 10)]
      });
    }
  });

  bossPositions.sort((a, b) => a.position - b.position);

  console.log('\nJefes en orden:');
  bossPositions.forEach((boss, index) => {
    console.log(`${index + 1}. ${boss.name} (Position: ${boss.position}): ${boss.color}`);
  });
}
