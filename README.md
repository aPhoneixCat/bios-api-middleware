# BIOS-API-MIDDLEWARE

## Overview

A building's inter-operational system, a.k.a, api middleware/gateway providing interfaces to help external integration with building's intranet systems. 

## Installation

> NodeJS 20 is required.

```
$ npm install
$ npm run dev
```

## API 

Full API documentation: http://localhost:3000/api-docs/#/

## Tests

What tests are included and how to run them.
```
$ npm run test
$ npm run test:watch
$ npm run test:coverage
```

## Contributing

For pull request contribution, recommend the following:

1. Include a clear description of your pull request in the description
   with the basic "what" and "why"s for the request.
2. The tests should pass as best as you can. GitHub will automatically run
   the tests as well, to act as a safety net.
3. The pull request should include tests for the change. A new feature should
   have tests for the new feature and bug fixes should include a test that fails
   without the corresponding code change and passes after they are applied.
   The command `npm run test:coverage` will generate a `coverage/` folder that
   contains HTML pages of the code coverage, to better understand if everything
   you're adding is being tested.
4. If the pull request is a new feature, please include appropriate documentation 
   in the `README.md` file as well.
5. To help ensure that your code is similar in style to the existing code,
   run the command `npm run lint` and fix any displayed issues.