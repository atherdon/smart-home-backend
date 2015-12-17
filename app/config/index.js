import addresses from './group-address-list';

let config = {};

config.server = {
  port: process.env.PORT || 3005
};

config.knxd = {
  host: 'zircon', /* like 'localhost'  */
  port: '6720',
  isAvailable: true
};

config.knx = {
  addresses: addresses,
  readableAddr: [
    '1/1/5', /* UG Keller-1-2 + Hobby1 via Tasterrückmeldung */
    '1/1/6', /* UG Keller-2 Deckenleuchte via Präsenzmelder 1.1.42 Ausg. 0  */
    '1/1/7', /* UG Keller-3 Deckenleuchte via Tasterrückmeldung */
    '1/2/1', /* EG Küche Deckenleuchten via Schaltaktor 1.1.2 Ausg. 3 */
    '1/2/6', /* EG WC Deckenleuchte via Schaltaktor 1.1.2 Ausg. 1 */
    '10/0/10', /* UG Fenster Keller-2 Kontakt via Binäreingang 1.1.39 Ausg. A-1  */
    '1/2/3', /* EG Büro/Emma Deckenleuchte via Schaltaktor 1.1.1 Ausg. 12 */
    '1/2/4', /* EG Esszimmer Deckenleuchte via Schaltaktor 1.1.2 Ausg. 3 */
    '1/2/12', /* EG Büro/Emma Hängeleuchte via Schaltaktor 1.1.45 Ausg. 5 */
    '1/2/2', /* EG/OG Treppenlicht LED via Schaltaktor 1.1.1 Ausg. 10 */
    '1/2/10', /* EG Wohnzimmer Erker Deckenleuchte via Schaltaktor 1.1.45 Ausg. 4 */
    '1/3/4', /* DG Flur Wandleuchte via Schaltaktor 1.1.2 Ausg. 8 */
    '1/3/12', /* DG Kind-1 / Schlafzimmer Deckenleuchte Nord via Dimmaktor 1.1.6 Ausg. 4 */
    '11/2/0', /* DG Kind-2 / Daniel Steckdose Ost 1/5 via Schaltaktor 1.1.45 Ausg. 7 */
    '1/2/5', /* EG Flur Deckenleuchte via Schaltaktor 1.1.2 Ausg. 9 */
    '1/2/7', /* EG Küche Deckenleuchten Nord+Ost via Schaltaktor 1.1.5 Ausg. 1 */
    '1/3/2', /* OG Kind-3 Deckenleuchte via Schaltaktor 1.1.1 Ausg. 13 */
    '1/3/10', /* OG Bad Wand-/Waschtisch-Leuchten via Schaltaktor 1.1.1 Ausg. 7 */
    '9/0/1', /* EG Wohnzimmer/Esszimmer/Küche Szene "Abendessen" via Schaltaktor 1.1.24 Ausg. 20 (Rückmeldeobjekt Taste 7) */
  ]
};

export default config;
