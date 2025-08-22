"use strict"
function task2(search, data) {
    // Validation
    if (!data || data.trim() === '') {
        throw new Error("Data not found");
    }
    if (!search || typeof search !== "object") {
        throw new Error("Search object not found");
    }
    for (const criteria of search) {
        if (typeof criteria !== "object" || Object.keys(criteria).length === 0) {
            throw new Error("Invalid search criteria");
        }
    }
    if (data.trim().split('\n')[0].split(',').indexOf('value') === -1) {
        throw new Error("Value column not found");
    }

    // Parsing
    const rows = data.trim().split('\n');
    const header = rows[0].split(',');
    rows.shift();

    // Validation of keys for each criterion
    for (const criteria of search) {
        const searchKeys = Object.keys(criteria);
        for (const key of searchKeys) {
            if (!header.includes(key)) {
                throw new Error('Key mismatch');
            }
        }
    }

    // Finding a value for each criterion
    const foundValues = [];
    const valueIndex = header.indexOf('value');

    for (const criteria of search) {
        const searchKeys = Object.keys(criteria);
        const valuesForThisCriteria = [];

        // Search in every line
        for (const row of rows) {
            const columns = row.split(',');
            let match = true;

            // Check if all keys match
            for (const key of searchKeys) {
                const keyIndex = header.indexOf(key);
                const dataValue = columns[keyIndex];
                const searchValue = criteria[key];

                // ANY in the data or criterion matches any value
                if (dataValue !== 'ANY' && searchValue !== 'ANY' && dataValue !== searchValue) {
                    match = false;
                    break;
                }
            }

            if (match) {
                const value = parseInt(columns[valueIndex]);
                valuesForThisCriteria.push(value);
            }
        }

        // Add all values ​​found for this criterion
        foundValues.push(...valuesForThisCriteria);

        // What to do if we don't find it? (optional)
        if (valuesForThisCriteria.length === 0) {
            console.warn("No match found for criteria:", criteria);
        }
    }

    // Calculating weights
    const weightsAndValues = foundValues.map(value => ({
        value: value,
        weight: value % 2 === 0 ? 20 : 10  // even=20, odd=10
    }));

    // Calculating the weighted average
    let numerator = 0;   // counter: sum (value × weight)
    let denominator = 0; // denominator: sum of weights

    for (const item of weightsAndValues) {
        numerator += item.value * item.weight;
        denominator += item.weight;
    }

    if (denominator === 0) {
        throw new Error("No values found for calculation");
    }

    const weightedAverage = numerator / denominator;

    // Formatting the result
    return weightedAverage.toFixed(1); // round to 1 decimal place as a string
}

// Test
console.log(
    task2(
        [
            { 'side': 'IN', 'currency': 'PLN' },
            { 'side': 'OUT', 'currency': 'EUR' },
        ],
        'side,currency,value\nIN,PLN,1\nIN,EUR,2\nOUT,ANY,3'
    )
);

console.log(
    task2(
        [
            { 'a': 862984, 'b': 29105, 'c': 605280, 'd': 678194, 'e': 302120 },
            { 'a': 20226, 'b': 781899, 'c': 186952, 'd': 506894, 'e': 325696 }
        ],
        'a,b,c,d,e,value\n326959,886178,941970,733168,606687,720615\n951646,716668,149632,633630,64892,569256'
    )
);
