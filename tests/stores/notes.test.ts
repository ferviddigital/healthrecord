import { describe, it, expect, beforeEach, vi } from 'vitest';
import { notes, create, update, destroy } from '../../src/stores/notes';
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

describe('Notes Store', () => {
  beforeEach(() => {
    (record.value as any).notes = [];
  });

  describe('notes computed', () => {
    it('returns the notes array from record', () => {
      const testNotes = [
        { id: '1', date: Date.now(), text: 'Test note', personId: 'p1' },
      ];
      (record.value as any).notes = testNotes;

      expect(notes.value).toEqual(testNotes);
    });
  });



  describe('create', () => {
    it('creates a new note with valid data', () => {
      (record.value as any).notes = [];

      const noteData = {
        date: Date.now(),
        text: 'This is a test note',
        personId: 'person-1',
        measurementId: 'measurement-1',
      };

      const id = create(noteData);

      expect((record.value as any).notes).toHaveLength(1);
      const note = (record.value as any).notes[0];
      expect(note).toMatchObject(noteData);
      expect(note.id).toBe(id);
      expect(note.created).toBeDefined();
    });

    it('throws error if required fields are missing', () => {
      expect(() => create({ text: 'Note', personId: 'p1' } as any)).toThrow('Note must have a date.');
      expect(() => create({ date: Date.now(), personId: 'p1' } as any)).toThrow('Note must have text.');
      expect(() => create({ date: Date.now(), text: 'Note' } as any)).toThrow('Note must have an associated person.');
    });
  });

  describe('update', () => {
    it('updates an existing note', () => {
      const originalDate = Date.now() - 1000;
      (record.value as any).notes = [
        { id: '1', date: originalDate, text: 'Original note', personId: 'p1', measurementId: 'm1' },
      ];

      update({
        id: '1',
        text: 'Updated note',
        date: originalDate,
        measurementId: 'm2',
      });

      const note = (record.value as any).notes[0];
      expect(note.text).toBe('Updated note');
      expect(note.measurementId).toBe('m2');
      expect(note.updated).toBeDefined();
    });
  });

  describe('destroy', () => {
    it('removes a note', () => {
      (record.value as any).notes = [
        { id: '1', date: Date.now(), text: 'Test note', personId: 'p1', measurementId: 'm1' },
      ];

      (global as any).confirm = vi.fn(() => true);

      destroy('1');

      expect((record.value as any).notes).toHaveLength(0);
    });

    it('does not remove if user cancels confirmation', () => {
      (record.value as any).notes = [
        { id: '1', date: Date.now(), text: 'Test note', personId: 'p1' },
      ];

      (global as any).confirm = vi.fn(() => false);

      destroy('1');

      expect((record.value as any).notes).toHaveLength(1);
    });
  });
});