import { record } from '../store/record';
import pluralize from 'pluralize';
import n2w from 'number-to-words';

class Insight {
  /**
   * The analyzed person
   */
  person: Person;

  constructor(person: Person) {
    this.person = person;
  }

  /**
   * Get the text insight for this object
   */
  get description() {
    return '';
  }
}

export class VitalInsight extends Insight {
  /**
   * The analyzed vital
   */
  vital: Vital;

  constructor(object: Vital, person: Person) {
    super(person);
    this.vital = object;
  }

  /**
   * Get person's measurements for this vital
   *
   * @returns {import("../typedefs").Measurement[]}
   */
  get #measurements() {
    if (!record.value) return [];
    if (!this.vital.low && !this.vital.high) return [];
    return record.value.measurements
      .filter(
        measurement =>
          measurement.personId === this.person.id && measurement.vitalId === this.vital.id
      )
      .toSorted((a, b) => b.date - a.date);
  }

  /**
   * Measurements whose recent values are below the low value for this vital
   *
   * @returns {import("../typedefs").Measurement[]}
   */
  get #lowMeasurements() {
    if (!this.vital.low) return [];
    const low = this.vital.low;
    return this.#measurements.slice(0, 5).filter(measurement => measurement.value < low);
  }

  /**
   * Measurements whose recent values are above the high value for this vital
   *
   * @returns {import("../typedefs").Measurement[]}
   */
  get #highMeasurements() {
    if (!this.vital.high) return [];
    const high = this.vital.high;
    return this.#measurements.slice(0, 5).filter(measurement => measurement.value > high);
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
   * Get the trend between the last ten measurements
   */
  get trend() {
    const recent = this.#measurements.slice(0, 10).map(measurement => measurement.value);
    return nonParametricRegressionTrend(recent, 0.01);
  }

  /**
   * Get the text description of this vital's Insight
   *
   * @returns {string}
   */
  get description() {
    if (!this.level) return '';

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

    if (
      (this.level === 'low' && this.trend === 1) ||
      (this.level === 'high' && this.trend === -1)
    ) {
      text += ', but are';
    } else if (
      (this.level === 'low' && this.trend === -1) ||
      (this.level === 'high' && this.trend === 1)
    ) {
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
  person: Person;

  constructor(person: Person) {
    this.person = person;
  }

  get #measurements() {
    if (!record.value) return [];
    return record.value.measurements.filter(measurement => measurement.personId === this.person.id);
  }

  get #vitals() {
    if (!record.value) return [];

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
      vitalLevelsDescriptions.push(
        `${n2w.toWords(this.#normalLevelVitals.length)} ${pluralize(
          'vital',
          this.#normalLevelVitals.length
        )} ${pluralize('has', this.#normalLevelVitals.length)} normal levels`
      );
    }

    if (this.#lowLevelVitals.length > 0) {
      vitalLevelsDescriptions.push(
        `${n2w.toWords(this.#lowLevelVitals.length)} ${pluralize(
          'vital',
          this.#lowLevelVitals.length
        )} ${pluralize('has', this.#lowLevelVitals.length)} low levels`
      );
    }

    if (this.#highLevelVitals.length > 0) {
      vitalLevelsDescriptions.push(
        `${n2w.toWords(this.#highLevelVitals.length)} ${pluralize(
          'vital',
          this.#highLevelVitals.length
        )} ${pluralize('has', this.#highLevelVitals.length)} high levels`
      );
    }

    // Trends
    const levelsDescription = vitalLevelsDescriptions.join(', ');
    text += levelsDescription[0].toLocaleUpperCase() + levelsDescription.slice(1) + '.';

    const vitalTrendsDescriptions = [];

    if (this.#upwardTrendVitals.length > 0) {
      vitalTrendsDescriptions.push(
        `${n2w.toWords(this.#upwardTrendVitals.length)} ${pluralize(
          'vital',
          this.#upwardTrendVitals.length
        )} ${pluralize('is', this.#upwardTrendVitals.length)} trending upward`
      );
    }

    if (this.#downwardTrendVitals.length > 0) {
      vitalTrendsDescriptions.push(
        `${n2w.toWords(this.#downwardTrendVitals.length)} ${pluralize(
          'vital',
          this.#downwardTrendVitals.length
        )} ${pluralize('is', this.#downwardTrendVitals.length)} trending downward`
      );
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
 */
const nonParametricRegression = (values: number[], bandwidth = 0.5) => {
  // Create a kernel function.
  const kernelFunction = (x: number) => Math.exp(-Math.pow(x, 2) / (2 * Math.pow(bandwidth, 2)));

  // Calculate the weighted average of the data points.
  const predictedValues = values.map(yi => {
    const weights = values.map(yj => kernelFunction((yi - yj) / bandwidth));
    return (
      values.reduce((acc, yj, j) => acc + weights[j] * yj, 0) /
      weights.reduce((acc, w) => acc + w, 0)
    );
  });

  // Return the predicted values.
  return predictedValues;
};

/**
 * Calculate trend from values
 */
const nonParametricRegressionTrend = (values: number[], bandwidth = 0.5) => {
  // Calculate the predicted values using the nonParametricRegression function.
  const predictedValues = nonParametricRegression(values, bandwidth);

  // Calculate the slope of the predicted values.
  const slope =
    (predictedValues[predictedValues.length - 1] - predictedValues[0]) / predictedValues.length;

  // Return 1 if the trend is up, 0 if the trend is flat, and -1 if the trend is down.
  if (slope > 0) {
    return 1;
  } else if (slope < 0) {
    return -1;
  } else {
    return 0;
  }
};
