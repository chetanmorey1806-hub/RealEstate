// Points of interest per locality. Coordinates are stored as small offsets
// from the locality centre; distances shown in the UI are computed from these
// with the haversine formula rather than hard-coded.

export const placeTypes = {
  school: { label: 'Schools & colleges', icon: 'school' },
  hospital: { label: 'Hospitals', icon: 'hospital' },
  restaurant: { label: 'Restaurants & cafés', icon: 'restaurant' },
  mall: { label: 'Shopping malls', icon: 'mall' },
  metro: { label: 'Metro stations', icon: 'metro' },
  bus: { label: 'Bus stops', icon: 'bus' },
  airport: { label: 'Airports', icon: 'airport' },
  park: { label: 'Parks', icon: 'park' },
}

/** name, type, latitude offset, longitude offset (degrees from the centre) */
const p = (name, type, dLat, dLng) => ({ name, type, dLat, dLng })

const raw = {
  baner: {
    centre: [18.559, 73.7868],
    places: [
      p('The Orchid School', 'school', 0.015, -0.017),
      p('Symbiosis Institute, Baner', 'school', -0.012, 0.008),
      p('Jupiter Hospital, Baner', 'hospital', 0.006, 0.011),
      p('Sahyadri Hospital, Hinjawadi Road', 'hospital', -0.017, -0.014),
      p('Balewadi High Street', 'restaurant', 0.014, -0.011),
      p('Malaka Spice, Baner Road', 'restaurant', -0.004, 0.005),
      p('Westend Mall, Aundh', 'mall', -0.014, 0.019),
      p('Balewadi Metro Station', 'metro', 0.011, -0.009),
      p('Baner Gaon Bus Stop', 'bus', -0.003, -0.002),
      p('Pune International Airport', 'airport', 0.021, 0.152),
      p('Shri Balaji Garden', 'park', 0.004, 0.003),
    ],
  },
  koramangala: {
    centre: [12.9345, 77.6266],
    places: [
      p('Jyoti Nivas College', 'school', 0.003, 0.002),
      p('National Public School, Koramangala', 'school', -0.008, 0.006),
      p('St. Johns Medical College Hospital', 'hospital', 0.011, -0.004),
      p('Apollo Clinic, 80 Feet Road', 'hospital', -0.005, 0.004),
      p('Toit Brewpub, 100 Feet Road', 'restaurant', 0.006, 0.005),
      p('Third Wave Coffee, 5th Block', 'restaurant', 0.001, 0.003),
      p('Forum Mall, Koramangala', 'mall', -0.007, 0.001),
      p('Jayadeva Metro Station', 'metro', -0.021, 0.008),
      p('Sony World Junction Bus Stop', 'bus', 0.004, -0.002),
      p('Kempegowda International Airport', 'airport', 0.28, -0.05),
      p('Koramangala 3rd Block Park', 'park', 0.005, -0.004),
    ],
  },
  tungarli: {
    centre: [18.7645, 73.4064],
    places: [
      p('Lonavala Public School', 'school', -0.015, 0.012),
      p('Sanjeevani Hospital, Lonavala', 'hospital', -0.018, 0.014),
      p('The Kinara Village Dhaba', 'restaurant', -0.022, 0.019),
      p('Cooper Chikki Market', 'mall', -0.019, 0.016),
      p('Lonavala Railway Station', 'metro', -0.021, 0.017),
      p('Tungarli Bus Stop', 'bus', -0.004, 0.003),
      p('Pune International Airport', 'airport', -0.25, 0.49),
      p('Tungarli Lake & Dam', 'park', 0.006, -0.005),
      p('Rajmachi Point', 'park', -0.011, -0.028),
    ],
  },
  bandra: {
    centre: [19.0606, 72.8207],
    places: [
      p('St. Stanislaus High School', 'school', -0.008, 0.008),
      p('Lilavati Hospital', 'hospital', 0.005, 0.011),
      p('Holy Family Hospital, Bandra', 'hospital', -0.011, 0.009),
      p('Bastian, Linking Road', 'restaurant', -0.004, 0.005),
      p('Candies, Pali Hill', 'restaurant', 0.003, 0.004),
      p('Infiniti Mall, Andheri', 'mall', 0.038, 0.011),
      p('Bandra Railway Station', 'metro', -0.009, 0.019),
      p('Carter Road Bus Stop', 'bus', 0.001, -0.001),
      p('Chhatrapati Shivaji Intl Airport', 'airport', 0.028, 0.045),
      p('Carter Road Promenade', 'park', 0.002, -0.002),
    ],
  },
  assagao: {
    centre: [15.6008, 73.7593],
    places: [
      p('St Xaviers Higher Secondary, Mapusa', 'school', -0.014, -0.012),
      p('Vision Hospital, Mapusa', 'hospital', -0.016, -0.015),
      p('Gunpowder, Assagao', 'restaurant', 0.002, 0.003),
      p('Villa Blanche Bistro', 'restaurant', -0.003, 0.002),
      p('Mapusa Municipal Market', 'mall', -0.017, -0.013),
      p('Thivim Railway Station', 'metro', 0.031, -0.038),
      p('Assagao Junction Bus Stop', 'bus', -0.002, 0.001),
      p('Manohar International Airport, Mopa', 'airport', 0.106, -0.041),
      p('Anjuna Beach', 'park', -0.014, -0.022),
    ],
  },
  wakad: {
    centre: [18.5989, 73.7621],
    places: [
      p('Blossom Public School, Wakad', 'school', 0.005, 0.004),
      p('Indira College of Engineering', 'school', -0.009, -0.007),
      p('Lifepoint Multispeciality Hospital', 'hospital', 0.004, -0.005),
      p('Aditya Birla Memorial Hospital', 'hospital', 0.014, 0.017),
      p('Kalyani Grand, Wakad', 'restaurant', -0.003, 0.004),
      p('Xion Mall, Hinjawadi', 'mall', -0.008, -0.019),
      p('Wakad Metro Station (Line 3)', 'metro', 0.007, 0.005),
      p('Bhumkar Chowk Bus Stop', 'bus', -0.002, -0.002),
      p('Pune International Airport', 'airport', -0.02, 0.166),
      p('Wakad Riverside Park', 'park', 0.008, 0.009),
    ],
  },
  koregaon: {
    centre: [18.5362, 73.8939],
    places: [
      p('Bishops School, Undri Road', 'school', -0.019, 0.014),
      p('Ruby Hall Clinic', 'hospital', 0.004, -0.011),
      p('Sahyadri Hospital, Nagar Road', 'hospital', 0.011, 0.012),
      p('Malaka Spice, Lane 5', 'restaurant', 0.001, 0.001),
      p('German Bakery, North Main Road', 'restaurant', 0.002, -0.001),
      p('Phoenix Marketcity, Viman Nagar', 'mall', 0.022, 0.031),
      p('Pune Railway Station', 'metro', 0.007, -0.026),
      p('Koregaon Park Bus Stop', 'bus', -0.001, 0.002),
      p('Pune International Airport', 'airport', 0.037, 0.05),
      p('Osho Teerth Park', 'park', 0.003, 0.004),
    ],
  },
  mahalunge: {
    centre: [18.5793, 73.7462],
    places: [
      p('Vibgyor High, Balewadi', 'school', -0.011, 0.024),
      p('Jupiter Hospital, Baner', 'hospital', -0.014, 0.038),
      p('Riverside Café, Mahalunge', 'restaurant', 0.003, 0.002),
      p('Balewadi High Street', 'mall', -0.013, 0.028),
      p('Balewadi Metro Station', 'metro', -0.009, 0.026),
      p('Mahalunge Gaon Bus Stop', 'bus', -0.002, 0.001),
      p('Pune International Airport', 'airport', 0.008, 0.192),
      p('Mula Riverfront Park', 'park', 0.004, 0.005),
    ],
  },
  hinjawadi: {
    centre: [18.5913, 73.7389],
    places: [
      p('Mercedes-Benz International School', 'school', -0.012, -0.014),
      p('Ruby Hall Clinic, Hinjawadi', 'hospital', 0.006, -0.008),
      p('Silver Oak Restaurant, Phase 1', 'restaurant', 0.004, 0.006),
      p('Xion Mall, Hinjawadi', 'mall', 0.003, 0.009),
      p('Hinjawadi Phase 3 Metro Station', 'metro', -0.006, -0.009),
      p('Rajiv Gandhi Infotech Park Bus Stop', 'bus', 0.002, -0.003),
      p('Pune International Airport', 'airport', -0.012, 0.19),
      p('Hinjawadi Central Park', 'park', 0.005, -0.004),
    ],
  },
  mulshi: {
    centre: [18.4879, 73.5041],
    places: [
      p('Vidya Valley School, Pirangut', 'school', 0.036, 0.098),
      p('Sahyadri Hospital, Kothrud', 'hospital', 0.042, 0.135),
      p('Malhar Machi Restaurant', 'restaurant', -0.014, -0.021),
      p('Pirangut Market', 'mall', 0.031, 0.092),
      p('Pune Railway Station', 'metro', 0.048, 0.19),
      p('Mulshi Phata Bus Stop', 'bus', 0.004, 0.006),
      p('Pune International Airport', 'airport', 0.09, 0.29),
      p('Mulshi Lake Viewpoint', 'park', -0.006, -0.008),
    ],
  },
  whitefield: {
    centre: [12.9959, 77.7268],
    places: [
      p('Deens Academy, Whitefield', 'school', -0.008, 0.011),
      p('Vydehi Institute of Medical Sciences', 'hospital', -0.004, -0.009),
      p('Manipal Hospital, Whitefield', 'hospital', 0.007, 0.013),
      p('Toit Whitefield', 'restaurant', 0.002, -0.003),
      p('Phoenix Marketcity, Mahadevapura', 'mall', -0.011, -0.028),
      p('Whitefield Metro Station (Purple Line)', 'metro', 0.004, 0.006),
      p('ITPB Main Gate Bus Stop', 'bus', 0.006, 0.008),
      p('Kempegowda International Airport', 'airport', 0.219, -0.113),
      p('Whitefield Memorial Park', 'park', -0.003, 0.004),
    ],
  },
}

/** Resolved absolute coordinates, keyed by locality. */
export const localityPlaces = Object.fromEntries(
  Object.entries(raw).map(([key, { centre, places }]) => [
    key,
    places.map((pl) => ({
      name: pl.name,
      type: pl.type,
      lat: centre[0] + pl.dLat,
      lng: centre[1] + pl.dLng,
    })),
  ]),
)

export const getPlaces = (key) => localityPlaces[key] || []
