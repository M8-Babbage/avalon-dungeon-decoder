#!/usr/bin/env node
import readline from 'readline';

console.log('Hello world')

const showBanner = () => {
  console.log(`
    ██████╗██╗  ██╗██╗   ██╗███╗   ██╗██╗   ██╗
   ██╔════╝██║  ██║██║   ██║████╗  ██║╚██╗ ██╔╝
   ██║     ███████║██║   ██║██╔██╗ ██║ ╚████╔╝
   ██║     ██╔══██║██║   ██║██║╚██╗██║  ╚██╔╝
   ╚██████╗██║  ██║╚██████╔╝██║ ╚████║   ██║
    ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝
   `);
}

showBanner()

console.log('Parámetros del cheat engine:\nPrimer piso: AVA_TEMPLE_START_First_Level_01\nSegundo piso: AVA_TEMPLE_START\n\n\nPegue el texto codificado aquí:');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line: any) => {
  console.clear();
  showBanner()
  processInput(line);
  console.log('\nHecho con amor, y odio por @chuny-dev');
  console.log('\nPresione enter para salir...');
  rl.question('', () => {
    rl.close();
  });
});

const bosses: Record<string, Record<string | number, string>> = {
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

/**
 * Convierte un string hexadecimal a texto
 * @param {*} hex
 * @returns: Texto
 */
function hexToStr(hex: string): string {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

/**
 * Limpia el texto de caracteres especiales
 * @param {*} text
 * @returns: Texto limpio
 */
function cleanText(text: string): string {
  return text.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Procesa el texto de entrada
 * @param {*} data
 */
function processInput(data: string) {
  const hexData = data.replace(/\s/g, '');
  const stringData = hexToStr(hexData);
  const textoLimpio = cleanText(stringData.toLocaleLowerCase());

  const bossPositions: any[] = [];

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