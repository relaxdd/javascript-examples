interface Schema {
  cases: number[][],
  getLimit: (page: number) => number,
}

type Config = { perRow: number, schemes: Record<string, Schema> }

interface Example {
  device: string,
  schema: string,
  total: number,
  expected: string,
}

const configs: Record<'ultraWide' | 'desktop' | 'tablet', Config> = {
  ultraWide: {
    perRow: 4,
    schemes: {
      first: {
        cases: [[7, 9, 11]],
        getLimit: () => 13,
      },
    },
  },
  desktop: {
    perRow: 3,
    schemes: {
      first: {
        cases: [[4], [5]],
        getLimit: () => 5,
      },
      second: {
        cases: [[2, 6], [5], [1, 7], [4]],
        getLimit: (page: number) => (page % 2 ? 8 : 7),
      },
      third: {
        cases: [[5, 9]],
        getLimit: () => 10,
      },
    },
  },
  tablet: {
    perRow: 2,
    schemes: {
      first: {
        cases: [[1, 4], [3]],
        getLimit: (page: number) => (page % 2 ? 5 : 4),
      },
      second: {
        cases: [[3, 6]],
        getLimit: () => 6,
      },
      third: {
        cases: [[1, 4, 7], [3, 6]],
        getLimit: (page: number) => (page % 2 ? 8 : 7),
      },
    },
  },
}

function renderWideCards(config: Config, schema: string, total: number): string {
  if (!config.schemes.hasOwnProperty(schema)) {
    console.warn('Вы указали не существующую схему в конфиге')
    return ''
  }

  const getLineBreak = (perRow: number, width: number) => {
    return '-'.repeat(perRow * width) + '\n'
  }

  const { schemes, perRow } = config
  const { cases, getLimit } = schemes[schema]
  const cards = ['|-|', '|----|']

  let str = ''
  let weight = 0
  let page = 1
  let counter = 1
  let limit = getLimit(page)

  for (let i = 1; i <= total; i++) {
    const mod = counter % limit
    const pos = mod === 0 ? limit : mod
    const current = cases[page % cases.length]
    const isWide = current.includes(pos)

    weight += isWide ? 2 : 1

    // ******** Отрисовка элементов ******** //

    str += cards[+isWide]!
    str += weight % perRow === 0 ? '\n' : ''
    str += pos % limit === 0 ? getLineBreak(perRow, cards[0].length) : ''

    // ******** Отрисовка элементов ******** //

    if (mod !== 0)
      counter++
    else {
      counter = 1
      limit = getLimit(++page)
    }
  }

  return str
}

const setting = {
  device: 'desktop',
  schema: 'first',
}

const exaples: Example[] = [
  // { device: 'desktop', schema: 'first', total: 23, expect: '' },
  // { device: 'desktop', schema: 'second', total: 48, expect: '' },
  // { device: 'desktop', schema: 'third', total: 61, expect: '' },
  {
    device: 'tablet',
    schema: 'first',
    total: 15,
    expected: '|-||-|\n|----|\n|-||-|\n------\n|----|\n|-||-|\n|----|\n------\n|-||-|\n|----|\n|-||-|\n------\n|----|',
  },
  {
    device: 'tablet',
    schema: 'first',
    total: 29,
    expected: '|-||-|\n|----|\n|-||-|\n------\n|----|\n|-||-|\n|----|\n------\n|-||-|\n|----|\n|-||-|\n------\n|----|\n|-||-|\n|----|\n------\n|-||-|\n|----|\n|-||-|\n------\n|----|\n|-||-|\n|----|\n------\n|-||-|',
  },
]

function runTests(configs: Record<string, Config>, arr: Example[]) {
  for (const [i, it] of arr.entries()) {
    if (!configs.hasOwnProperty(it.device)) {
      console.error('[Test failed]: Выбрано не существующее устройство из конфига')
      continue
    }

    const device = configs[it.device]
    const result = renderWideCards(device, it.schema, it.total)

    if (!result) {
      console.error('[Test failed]: Результат выполнения вернул пустой результат')
      continue
    }

    if (!result.localeCompare(it.expected)) {
      console.error('[Test failed]: Результат выполнения не верный так как он вернул другой результат')
      continue
    }

    console.log(`[Test passed]: Тест ${i + 1} успешно пройдет, результат выполнения верный!`)
  }
}

// runTests(configs, exaples)
console.log(renderWideCards(configs.ultraWide, 'first', 58))