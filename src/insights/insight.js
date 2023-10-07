import { record } from "../store/record";
import pluralize from "pluralize";
import n2w from 'number-to-words';

class Insight {

  /**
   * The analyzed object
   */
  #object;

  /**
   * The analyzed person
   */
  person;

  /**
   * @param {import("../typedefs").Vital | import("../typedefs").Measurement} object Object to analyze
   * @param {import("../typedefs").Person} person Person to analyze
   */
  constructor(object, person) {
    this.#object = object
    this.person = person
  }

  /**
   * Get the text insight for this object
   * 
   * @returns {string}
   */
  get description() {
    return '';
  }
}

export class VitalInsight extends Insight {

  /**
   * The analyzed vital
   */
  vital;

  /**
   * @param {import("../typedefs").Vital} object Vital to be analyzed
   * @param {import("../typedefs").Person} person Person to analyze
   */
  constructor(object, person) {
    super(object, person);
    this.vital = object;
  }

  /**
   * Get person's measurements for this vital
   * 
   * @returns {import("../typedefs").Measurement[]}
   */
  get #measurements() {
    if (!this.vital.low && !this.vital.high) return [];
    return record.value.measurements.filter(measurement => measurement.personId === this.person.id && measurement.vitalId === this.vital.id);
  }

  /**
   * Measurements whose recent values are below the low value for this vital
   * 
   * @returns {import("../typedefs").Measurement[]}
   */
  get #lowMeasurements() {
    return this.#measurements.slice(0, 5).filter(measurement => measurement.value < this.vital.low);
  }
  
  /**
   * Measurements whose recent values are above the high value for this vital
   * 
   * @returns {import("../typedefs").Measurement[]}
   */
  get #highMeasurements() {
    return this.#measurements.slice(0, 5).filter(measurement => measurement.value > this.vital.high);
  }

  /**
   * Get the level for this person's vital measurements
   */
  get level() {

    if (this.#lowMeasurements.length > 0) {
      return 'low';
    } else if (this.#highMeasurements.length > 0) {
      return 'high';
    } else if (this.vital.high !== null || this.vital.low !== null) {
      return 'normal';
    } else {
      return undefined;
    }
  }

  /**
   * Get the trend between the last two measurements
   */
  get trend() {
    const recent = this.#measurements.slice(0, 2);

    if (recent.length < 2) {
      return 'none';
    } else if (recent[0].value > recent[1].value) {
      return 'upward';
    } else {
      return 'downward'
    }
  }

  /**
   * Get the text description of this vital's Insight
   * 
   * @returns {string}
   */
  get description() {
    if (!this.level) return null;

    let text = `Recent ${this.vital.name} measurements`;

    switch (this.level) {
      case 'low':
        text += ' appear to be below normal levels';
        break;
      case 'high':
        text += ' appear to be above normal levels';
        break;
      case 'normal':
        text += ' appear to be at normal levels';
        break;
    }

    if ( (this.level === 'low' && this.trend === 'upward') || (this.level === 'high' && this.trend === 'downward') ) {
      text += ', but are';
    } else if ( (this.level === 'low' && this.trend === 'downward') || (this.level === 'high' && this.trend === 'upward') ) {
      text += ' and are';
    } else if (this.trend !== 'none') {
      text += ' and are';
    }

    switch (this.trend) {
      case 'downward':
        text += ' trending downward';
        break;
      case 'upward':
        text += ' trending upward';
        break;
    }

    return text + '.';
  }
}

export class VitalInsightsSummary {

  /**
   * @param {import("../typedefs").Person} person Person whose vitals are being analyzed
   */
  constructor(person) {
    this.person = person
  }

  get #measurements() {
    return record.value.measurements.filter(measurement => measurement.personId === this.person.id);
  }

  get #vitals() {
    let vitalIds = this.#measurements.map(measurement => measurement.vitalId);
    vitalIds = [...new Set(vitalIds)];
    return record.value.vitals.filter(vital => vitalIds.includes(vital.id));
  }

  get #insights() {
    return this.#vitals.map(vital => new VitalInsight(vital, this.person));
  }

  get #normalLevelVitals() {
    return this.#insights.filter(insight => insight.level === 'normal');
  }

  get #lowLevelVitals() {
    return this.#insights.filter(insight => insight.level === 'low');
  }

  get #highLevelVitals() {
    return this.#insights.filter(insight => insight.level === 'high');
  }

  get #downwardTrendVitals() {
    return this.#insights.filter(insight => insight.trend === 'downward');
  }

  get #upwardTrendVitals() {
    return this.#insights.filter(insight => insight.trend === 'upward');
  }

  get description() {
    let text = '';

    // Levels
    const vitalLevelsDescriptions = [];

    if (this.#normalLevelVitals.length > 0) {
      vitalLevelsDescriptions.push(`${n2w.toWords(this.#normalLevelVitals.length)} ${pluralize('vital', this.#normalLevelVitals.length)} ${pluralize('has', this.#normalLevelVitals.length)} normal levels`);
    }

    if (this.#lowLevelVitals.length > 0) {
      vitalLevelsDescriptions.push(`${n2w.toWords(this.#lowLevelVitals.length)} ${pluralize('vital', this.#lowLevelVitals.length)} ${pluralize('has', this.#lowLevelVitals.length)} low levels`);
    }

    if (this.#highLevelVitals.length > 0) {
      vitalLevelsDescriptions.push(`${n2w.toWords(this.#highLevelVitals.length)} ${pluralize('vital', this.#highLevelVitals.length)} ${pluralize('has', this.#highLevelVitals.length)} high levels`);
    }

    // Trends
    const levelsDescription = vitalLevelsDescriptions.join(', ');
    text += levelsDescription[0].toLocaleUpperCase() + levelsDescription.slice(1) + '.';

    const vitalTrendsDescriptions = [];

    if (this.#upwardTrendVitals.length > 0) {
      vitalTrendsDescriptions.push(`${n2w.toWords(this.#upwardTrendVitals.length)} ${pluralize('vital', this.#upwardTrendVitals.length)} ${pluralize('is', this.#upwardTrendVitals.length)} trending upward`);
    }

    if (this.#downwardTrendVitals.length > 0) {
      vitalTrendsDescriptions.push(`${n2w.toWords(this.#downwardTrendVitals.length)} ${pluralize('vital', this.#downwardTrendVitals.length)} ${pluralize('is', this.#downwardTrendVitals.length)} trending downward`);
    }

    const trendsDescription = vitalTrendsDescriptions.join(', ');
    text += ' ' + trendsDescription[0].toLocaleUpperCase() + trendsDescription.slice(1) + '.';

    return text;
  }
}