# Manual Test Results

## Scope

- Target page: `public/index.html`
- Manual checks requested:
  - Add user with valid/invalid data
  - Add post with valid/invalid data
  - Check validation messages visibility
  - Check equal form layout and button behavior
  - Compare behavior in Chrome, Firefox, Edge

## Environment and Constraints

- Executed in this workspace: integrated browser (Chromium engine).
- Direct execution in native Chrome, Firefox, and Edge is not available in current environment.

## Results

### 1) User form validation

- Invalid data (`name` empty, invalid `email`, short `password`):
  - Expected: validation error shown
  - Actual: `Kļūda: vārds ir obligāts (min 2 simboli).`
  - Status: **OK**

- Valid data (`name=John Doe`, `email=john@example.com`, `password=password123`):
  - Expected: success message
  - Actual: `OK: lietotājs ir derīgs.`
  - Status: **OK**

### 2) Post form validation

- Invalid data (`title` too short, `content` too short):
  - Expected: validation error shown
  - Actual: `Kļūda: virsrakstam jābūt vismaz 3 simboli.`
  - Status: **OK**

- Valid data (`title=Valid title`, content length >= 10):
  - Expected: success message
  - Actual: `OK: ziņa ir derīga.`
  - Status: **OK**

### 3) Layout and CSS consistency

- Both forms rendered in same visual style (card layout, equal spacing, same controls style): **OK**
- Buttons are clickable and trigger validation: **OK**
- Validation messages are visible and updated after submit: **OK**

## Browser Matrix

- Chrome: **Not executed in current environment**
- Firefox: **Not executed in current environment**
- Edge: **Not executed in current environment**
- Chromium (integrated): **Executed, PASS**

## Defects and Differences

- No functional defects found in executed browser.
- Cross-browser comparison (Chrome/Firefox/Edge) remains pending due environment limitation.
