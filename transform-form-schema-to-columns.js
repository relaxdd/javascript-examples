var str = `full_name, full_name, grid_spacer, prefer_fns, grid_spacer, foo
user_phone, user_email, grid_spacer, description, grid_spacer, bar
user_post, user_url, grid_spacer, description, grid_spacer, too
user_company, user_company, grid_spacer, description, grid_spacer, too`;

/**
 * @param {string} source
 * @param {string} spacer
 * @returns {string[][]}
 */
var transform_form_schema_to_columns = function (source = '', spacer = 'grid_spacer') {
  const rows = source
    .trim()
    .split('\n')
    .map((line) =>
      line
        .trim()
        .split(',')
        .map((word) => word.trim())
    );

  const { transform, totalCols } = rows.reduce(
    function (acc, row) {
      const qtySpacers = [...row.join(',').matchAll(spacer)].length;

      if (qtySpacers === 0) {
        acc.transform.push([row]);
      } else if (qtySpacers === 1) {
        const index = row.indexOf(spacer);
        const start = row.slice(0, index);
        const finish = row.slice(index + 1);

        acc.transform.push([start, finish]);
      } else {
        const parsed = row
          .join(',')
          .split(spacer)
          .map((it) => {
            if (it.startsWith(',')) it = it.slice(1);
            if (it.endsWith(',')) it = it.slice(0, -1);

            return it
              .trim()
              .split(',')
              .map((it) => it.trim());
          });

        acc.transform.push(parsed);
      }

      acc.totalCols.push(qtySpacers + 1);

      return acc;
    },
    { transform: [], totalCols: [] }
  );

  var result = [];
  var maxCols = Math.max(...totalCols);

  // for (let k = 0; k < maxCols; k++) {
  //   for (let i = 0; i < transform.length; i++) {
  //     result.push(...(transform?.[i]?.[k] || []));
  //   }
  // }

  for (let k = 0; k < maxCols; k++) {
    var column = [];

    for (let i = 0; i < transform.length; i++) {
      column.push(transform?.[i]?.[k] || []);
    }

    result.push(column);
  }

  return [...new Set(result)];
};

console.log(transform_form_schema_to_columns(str));

// var output = [
//   [
//     ['full_name', 'full_name'],
//     ['user_phone', 'user_email'],
//     ['user_post', 'user_url'],
//     ['user_company', 'user_company'],
//   ],
//   [
//     ['prefer_fns'],
//     ['description'],
//     ['description'],
//     ['description']
//   ],
//   [
//     ['foo'],
//     ['bar'],
//     ['too'],
//     ['too']
//   ],
// ];
