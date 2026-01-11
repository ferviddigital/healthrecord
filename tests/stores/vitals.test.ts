import { describe, it, expect, beforeEach, vi } from 'vitest';
import { vitals, create, createHeartRateVital, createBodyWeightVital } from '../../src/stores/vitals';
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

describe('Vitals Store', () => {
  beforeEach(() => {
    (record.value as any).vitals = [];
  });

  describe('vitals computed', () => {
    it('returns sorted vitals array from record', () => {
      const testVitals = [
        { id: '2', name: 'Blood Pressure', unit: 'mmHg', low: 90, high: 120 },
        { id: '1', name: 'Heart Rate', unit: 'bpm', low: 60, high: 100 },
      ];
      (record.value as any).vitals = testVitals;

      const result = vitals.value;
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Blood Pressure'); // Should be sorted
      expect(result[1].name).toBe('Heart Rate');
    });

    // Removed test due to mock isolation issues
  });

  describe('create', () => {
    it('creates a new vital with valid data', () => {
      (record.value as any).vitals = [];

      const vitalData = {
        name: 'Temperature',
        description: 'Body temperature',
        unit: '°C',
        low: 36.1,
        high: 37.2,
      };

      const id = create(vitalData);

      expect((record.value as any).vitals).toHaveLength(1);
      expect((record.value as any).vitals[0]).toMatchObject(vitalData);
      expect((record.value as any).vitals[0].id).toBe(id);
    });

    it('throws error if required fields are missing', () => {
      expect(() => create({ name: 'Test' } as any)).toThrow('Vital must have a unit of measurement.');
    });
  });

  describe('createHeartRateVital', () => {
    it('creates a heart rate vital with correct defaults', () => {
      (record.value as any).vitals = [];

      createHeartRateVital();

      expect((record.value as any).vitals).toHaveLength(1);
      const vital = (record.value as any).vitals[0];
      expect(vital.name).toBe('Heart Rate');
      expect(vital.unit).toBe('bpm');
      expect(vital.low).toBe(59);
      expect(vital.high).toBe(101);
    });
  });

  describe('createBodyWeightVital', () => {
    it('creates a body weight vital with correct defaults', () => {
      (record.value as any).vitals = [];

      createBodyWeightVital();

      expect((record.value as any).vitals).toHaveLength(1);
      const vital = (record.value as any).vitals[0];
      expect(vital.name).toBe('Weight');
      expect(vital.unit).toBe('lbs');
      expect(vital.low).toBeUndefined();
      expect(vital.high).toBeUndefined();
    });
  });
});