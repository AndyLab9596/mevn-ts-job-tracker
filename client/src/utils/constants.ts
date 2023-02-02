const searchJobTypeOptions = [
  'all',
  'full-time',
  'part-time',
  'remote',
  'internship',
] as const;

const stats = ['pending', 'interview', 'declined'] as const;

const searchStatusOptions = [
  'all',
  'pending',
  'interview',
  'declined',
] as const;

const sortOptions = ['latest', 'oldest', 'a-z', 'z-a'] as const;

export { searchJobTypeOptions, searchStatusOptions, sortOptions, stats };
