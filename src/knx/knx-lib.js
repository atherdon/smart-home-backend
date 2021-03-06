/* Guess correct KNX-datatype / format from address-properties */
function deriveAddrFormat(addr) {
  if (addr.type !== 'switch') {
    return null;
  }

  /* For reference, see https://www.domotiga.nl/projects/selfbus-knx-eib/wiki/Datatypes */
  switch (addr.func) {
    case 'light':
      /* DPT1 - 1 bit (0,1) */
      return 'DPT1';

    case 'outlet':
      /* DPT1 - 1 bit (0,1) */
      return 'DPT1';

    case 'shut':
      /* DPT1 - 1 bit (0,1) */
      return 'DPT1';

    case 'scene':
      /* DPT17 or DPT5 - 1 byte unsigned (0-255) */
      return 'DPT5';

    case 'dim':
      /* DPT 3 - (Position, Control, Value)	1 Bit, 4 Bit, 8 Bit [0,0]...[1,7] */
      /* PENDING: 1 byte is used for (physical) knx-switches?! */
      break;

    case 'heat':
      /* DPT1 - 1 bit (0,1) */
      break;

    default:
      return undefined;
  }
  return undefined;
}

export {deriveAddrFormat};
