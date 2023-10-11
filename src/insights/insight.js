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
    return this.#measurements.slice(-1, -5).filter(measurement => measurement.value < this.vital.low);
  }
  
  /**
   * Measurements whose recent values are above the high value for this vital
   * 
   * @returns {import("../typedefs").Measurement[]}
   */
  get #highMeasurements() {
    return this.#measurements.slice(-1, -5).filter(measurement => measurement.value > this.vital.high);
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
    const recent = this.#measurements.slice(0, 20).map(measurement => measurement.value);
    return nonParametricRegressionTrend(recent, 0.01);
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

    if ( (this.level === 'low' && this.trend === 1) || (this.level === 'high' && this.trend === -1) ) {
      text += ', but are';
    } else if ( (this.level === 'low' && this.trend === -1) || (this.level === 'high' && this.trend === 1) ) {
      text += ' and are';
    } else if (this.trend !== 0) {
      text += ' and are';
    }

    switch (this.trend) {
      case -1:
        text += ' trending downward';
        break;
      case 1:
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
    return this.#insights.filter(insight => insight.trend === -1);
  }

  get #upwardTrendVitals() {
    return this.#insights.filter(insight => insight.trend === 1);
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
    if (trendsDescription.length > 0) {
      text += ' ' + trendsDescription[0].toLocaleUpperCase() + trendsDescription.slice(1) + '.';
    }
    return text;
  }
}

/**
 * Calculate non-parametric regression
 * 
 * @param {Array<Number>} values Values to consider
 * @param {Number} bandwidth Bandwidth
 * @returns {Number[]}
 */
const nonParametricRegression = (values, bandwidth = 0.5) => {
  // Create a kernel function.
  const kernelFunction = (x) => Math.exp(-(Math.pow(x, 2)) / (2 * Math.pow(bandwidth, 2)));

  // Calculate the weighted average of the data points.
  const predictedValues = values.map((yi, i) => {
    const weights = values.map((yj, j) => kernelFunction((yi - yj) / bandwidth));
    return values.reduce((acc, yj, j) => acc + weights[j] * yj, 0) / weights.reduce((acc, w) => acc + w, 0);
  });

  // Return the predicted values.
  return predictedValues;
}

/**
 * Calculate trend from values
 * 
 * @param {Array<Number>} values Values to consider
 * @param {Number} bandwidth Bandwidth
 * @returns {1 | 0 | -1}
 */
const nonParametricRegressionTrend = (values, bandwidth = 0.5) => {
  // Calculate the predicted values using the nonParametricRegression function.
  const predictedValues = nonParametricRegression(values, bandwidth);

  // Calculate the slope of the predicted values.
  const slope = (predictedValues[predictedValues.length - 1] - predictedValues[0]) / predictedValues.length;

  // Return 1 if the trend is up, 0 if the trend is flat, and -1 if the trend is down.
  if (slope > 0) {
    return 1;
  } else if (slope < 0) {
    return -1;
  } else {
    return 0;
  }
}