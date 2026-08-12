// Canonical amenity list used by both the filter panel and the detail page,
// so a filter selection always matches what a listing actually advertises.

export const amenityGroups = [
  {
    group: 'Lifestyle',
    items: [
      'Swimming pool',
      'Clubhouse',
      'Gymnasium',
      'Kids play area',
      'Landscaped garden',
      'Jogging track',
      'Indoor games',
      'Amphitheatre',
    ],
  },
  {
    group: 'Convenience',
    items: [
      'Lift',
      'Covered parking',
      'Visitor parking',
      'EV charging',
      'Power backup',
      'Piped gas',
      'Modular kitchen',
      'Air conditioned',
    ],
  },
  {
    group: 'Safety',
    items: ['24x7 security', 'CCTV surveillance', 'Intercom', 'Fire safety', 'Gated community'],
  },
  {
    group: 'Sustainability',
    items: ['Rainwater harvesting', 'Solar panels', 'Sewage treatment', 'Waste management'],
  },
]

export const allAmenities = amenityGroups.flatMap((g) => g.items)
