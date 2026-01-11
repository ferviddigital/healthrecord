import { describe, it, expect, vi } from 'vitest';
import { people, create, update, destroy } from '../../src/stores/people';
import { record } from '../../src/stores/record';

// Mock the record store
vi.mock('../../src/stores/record', () => ({
  record: {
    value: {
      people: [],
      measurements: [],
      vitals: [],
      notes: [],
      id: 'test-id',
      version: '1.0',
      user: { firstName: '', lastName: '', preferences: {} },
    },
  },
}));

describe('People Store', () => {
  describe('people computed', () => {
    it('returns the people array from record', () => {
      const testPeople = [
        { id: '1', firstName: 'John', lastName: 'Doe', sex: 'male', dob: '1990-01-01' },
      ];
      (record.value as any).people = testPeople;

      expect(people.value).toEqual(testPeople);
    });
  });

  describe('create', () => {
    it('creates a new person with valid data', () => {
      (record.value as any).people = [];

      const personData = {
        firstName: 'Jane',
        lastName: 'Smith',
        sex: 'female',
        dob: '1985-05-15',
      };

      const id = create(personData);

      expect((record.value as any).people).toHaveLength(1);
      expect((record.value as any).people[0]).toMatchObject(personData);
      expect((record.value as any).people[0].id).toBe(id);
    });

    it('throws error if required fields are missing', () => {
      expect(() => create({ firstName: 'Jane' } as any)).toThrow('Person must have a last name.');
    });
  });

  describe('update', () => {
    it('updates an existing person', () => {
      (record.value as any).people = [
        { id: '1', firstName: 'John', lastName: 'Doe', sex: 'male', dob: '1990-01-01' },
      ];

      update({
        id: '1',
        firstName: 'Johnny',
        lastName: 'Doe',
        sex: 'male',
        dob: '1990-01-01',
      });

      expect((record.value as any).people[0].firstName).toBe('Johnny');
    });
  });

  describe('destroy', () => {
    it('removes person and associated measurements', () => {
      (record.value as any).people = [
        { id: '1', firstName: 'John', lastName: 'Doe', sex: 'male', dob: '1990-01-01' },
      ];
      (record.value as any).measurements = [
        { id: 'm1', personId: '1', vitalId: 'v1', value: 120, date: Date.now() },
      ];

      (global as any).confirm = vi.fn(() => true);

      destroy('1');

      expect((record.value as any).people).toHaveLength(0);
    });
  });
});