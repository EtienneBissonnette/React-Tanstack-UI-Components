export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  status: 'active' | 'inactive' | 'pending';
  verified: boolean;
  role: string;
  department: string;
}

export const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

export const roleOptions = [
  { value: 'Developer', label: 'Developer' },
  { value: 'Designer', label: 'Designer' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Analyst', label: 'Analyst' },
  { value: 'QA Engineer', label: 'QA Engineer' },
];

export const departmentOptions = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Design', label: 'Design' },
  { value: 'Product', label: 'Product' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
];

const firstNames = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
  'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia',
  'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander', 'Abigail', 'Michael',
  'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Sofia', 'Jackson', 'Avery',
  'Sebastian', 'Ella', 'David', 'Scarlett', 'Joseph', 'Grace', 'Samuel',
  'Chloe', 'Carter', 'Victoria', 'Owen', 'Riley', 'Wyatt', 'Aria', 'John',
  'Luna', 'Jack', 'Zoey', 'Luke', 'Penelope', 'Gabriel',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark',
  'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
  'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
  'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts',
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePerson(index: number): Person {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const roles = roleOptions.map((r) => r.value);
  const departments = departmentOptions.map((d) => d.value);
  const statuses: Person['status'][] = ['active', 'inactive', 'pending'];

  return {
    id: `person-${index + 1}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    age: Math.floor(Math.random() * 40) + 22,
    status: randomItem(statuses),
    verified: Math.random() > 0.3,
    role: randomItem(roles),
    department: randomItem(departments),
  };
}

export function generateMockPeople(count: number): Person[] {
  return Array.from({ length: count }, (_, i) => generatePerson(i));
}

export const mockPeople: Person[] = generateMockPeople(50);
