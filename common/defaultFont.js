// Slightly modified Commodore 64 system font

const fontSource = [
  '7cfe82b2f274', '042e2a2a3e1e', '7e7e12121e0c', '1c3e222222',
  '0c1e12127e7e', '1c3e2a2a3a18', '103e7e5050', '193d25253f3e',
  '7e7e10101e0e', '125e5e02', '0101015f5e', 'fefe081c3622',
  '82fefe0200', '3e3e181c383e1e', '3e3e20203e1e', '1c3e22223e1c',
  '3f3f24243c18', '183c24243f3f', '3e3e20203010', '123a2a2a2e24',
  '20207c7e2222', '3c3e02023e3e', '383c06063c38', '383e0e1c0e3e38',
  '22361c1c3622', '393d05073e3c', '22262e3a3222', 'fefe8282',
  '02163e7a929244', '8282fefe', '10307f7f3010', '183c7e18181818',
  '0000000000000000', 'f2f2', 'e0e00000e0e0', '28fefe2828fefe28',
  '2474d6d65c48', 'c6cc183066c6', '4cfeb2b2ee4e0a', '2060c080',
  '387cc682', '82c67c38', '10547c38387c5410', '10107c7c1010',
  '010706', '101010101010', '0606', '02060c18306040',
  '7cfe92a2fe7c', '0222fefe0202', '46ce8a92f262', '44c69292fe6c',
  '18182868fefe08', 'e4e6a2a2be9c', '7cfe9292de4c', 'c0c09ebee0c0',
  '6cfe9292fe6c', '64f69292fe7c', '2424', '012726',
  '10386cc68282', '282828282828', '8282c66c3810', '40c08a9af060',
  '1818181818181818', '3e7ed0d07e3e', 'fefe9292fe6c', '7cfe8282c644',
  'fefe82c67c38', 'fefe92928282', 'fefe90908080', '7cfe8292de5c',
  'fefe1010fefe', '82fefe82', '040682fefc80', 'fefe386cc682',
  'fefe02020202', 'fefe603060fefe', 'fefe7038fefe', '7cfe8282fe7c',
  'fefe9090f060', '78fc8486fe7a', 'fefe989cf662', '64f69292de4c',
  '8080fefe8080', 'fcfe0202fefc', 'f8fc0606fcf8', 'fefe0c180cfefe',
  'c6ee3838eec6', 'e0f01e1ef0e0', '868e9ab2e2c2', '181818ffff181818',
  'cccc333300000000', '000000ffff000000', '3333cccc3333cccc', '663399cc663399cc',
  '0000000000000000', 'ffffffff00000000', '0f0f0f0f0f0f0f0f', '8080808080808080',
  '0101010101010101', 'ffff000000000000', 'cccc3333cccc3333', '000000000000ffff',
  '0c0c03030c0c0303', 'cc993366cc993366', '000000000000ffff', '000000ffff181818',
  '000000000f0f0f0f', '000000f8f8181818', '1818181f1f000000', '0303030303030303',
  '0000001f1f181818', '181818f8f8181818', '1818181f1f181818', '181818ffff000000',
  'ffff000000000000', 'ffffff0000000000', '0000000000ffffff', 'c0c0c0c0c0c0c0c0',
  'e0e0e0e0e0e0e0e0', '0707070707070707', '001e1e0c183060c0', '0f0f0f0f00000000',
  '00000000f0f0f0f0', '181818f8f8000000', 'f0f0f0f000000000', 'f0f0f0f00f0f0f0f',
]

export const font = fontSource.map(char => {
  const res = [];

  for (let i = 0; i < char.length; i += 2) {
    res.push(parseInt(char.substr(i, 2), 16));
  }

  return res;
});

// | is a placeholder for a non-ascii character
const mapping = '@abcdefghijklmnopqrstuvwxyz[£]|| !"#$%&\'()*+,-./0123456789:;<=>?|ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function getIndex(character) {
  let index = mapping.indexOf(character);

  // If found return the index, otherwise return the index of question mark character
  return (character === '|' || index === -1) ? 63 : index;
}
